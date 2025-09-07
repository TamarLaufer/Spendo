// src/services/expenses.firebase.ts
import auth from '@react-native-firebase/auth';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

// ---- טיפוסים לשימוש נוח ב-TS ----
export type Expense = {
  id: string;
  householdId: string;
  amount: number; // סכום ביחידות שאת בוחרת (מומלץ: אגורות כמספר שלם)
  categoryId: string;
  subCategoryId: string | null;
  paymentMethod: string;
  createdAt: Date | null; // נמיר מ-Timestamp ל-Date לקריאה נוחה
  createdBy?: string;
};

export type NewExpenseInput = {
  householdId: string;
  amount: number;
  categoryId: string;
  subCategoryId: string | null;
  paymentMethod: string;
};

// ---- 1) לדאוג לזהות משתמש (אנונימית לפיתוח / עד שתפעילי Email/Password) ----
export async function ensureSignedIn() {
  if (!auth().currentUser) {
    await auth().signInAnonymously();
  }
  return auth().currentUser!;
}

// ---- 2) כתיבת הוצאה חדשה ----
export async function addExpense(input: NewExpenseInput) {
  await ensureSignedIn();

  // אפשר להוסיף createdBy מה-uid, נוח ל-Audit Log קל
  const createdBy = auth().currentUser?.uid ?? 'unknown';

  const docRef = await firestore()
    .collection('expenses')
    .add({
      ...input,
      createdBy,
      createdAt: firestore.FieldValue.serverTimestamp(), // זמן שרת עקבי
    });

  return docRef.id; // מחזיר מזהה המסמך החדש
}

// ---- 3א) קריאה חד-פעמית (get) ----
export async function getExpensesOnce(householdId: string): Promise<Expense[]> {
  await ensureSignedIn();

  const queryRef = firestore()
    .collection('expenses')
    .where('householdId', '==', householdId)
    .orderBy('createdAt', 'desc');

  const snapshot = await queryRef.get();

  return snapshot.docs.map(docSnap => {
    const raw = docSnap.data();
    // המרה של Timestamp ל-Date, אם קיים
    const createdAtTimestamp = raw.createdAt as
      | FirebaseFirestoreTypes.Timestamp
      | undefined;
    const createdAt = createdAtTimestamp?.toDate?.() ?? null;

    return {
      id: docSnap.id,
      householdId: raw.householdId,
      amount: raw.amount,
      categoryId: raw.categoryId,
      subCategoryId: raw.subCategoryId ?? null,
      paymentMethod: raw.paymentMethod,
      createdAt,
      createdBy: raw.createdBy,
    } as Expense;
  });
}

// ---- 3ב) האזנה בזמן אמת (onSnapshot) ----
export function subscribeToExpenses(
  householdId: string,
  onChange: (rows: Expense[]) => void,
  onError?: (err: Error) => void,
) {
  // הפונקציה מחזירה Unsubscribe של Firestore — צריך לקרוא לה ב-unmount
  const queryRef = firestore()
    .collection('expenses')
    .where('householdId', '==', householdId)
    .orderBy('createdAt', 'desc');

  const unsubscribe = queryRef.onSnapshot({
    next: snapshot => {
      const rows = snapshot.docs.map(docSnap => {
        const raw = docSnap.data();
        const ts = raw.createdAt as
          | FirebaseFirestoreTypes.Timestamp
          | undefined;
        return {
          id: docSnap.id,
          householdId: raw.householdId,
          amount: raw.amount,
          categoryId: raw.categoryId,
          subCategoryId: raw.subCategoryId ?? null,
          paymentMethod: raw.paymentMethod,
          createdAt: ts?.toDate?.() ?? null,
          createdBy: raw.createdBy,
        } as Expense;
      });
      onChange(rows);
    },
    error: error => onError?.(error as any),
  });

  return unsubscribe;
}
