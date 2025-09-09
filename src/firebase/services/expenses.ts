import auth from '@react-native-firebase/auth';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

export type Expense = {
  id: string;
  householdId: string;
  amount: number;
  categoryId: string;
  subCategoryId: string | null;
  paymentMethod: string;
  createdAt: Date | null;
  createdBy?: string;
};

export type NewExpenseInput = {
  householdId: string;
  amount: number;
  categoryId: string;
  subCategoryId: string | null;
  paymentMethod: string;
};

export async function ensureSignedIn() {
  if (!auth().currentUser) {
    await auth().signInAnonymously();
  }
  return auth().currentUser!;
}

export async function addExpense(input: NewExpenseInput) {
  await ensureSignedIn();

  const createdBy = auth().currentUser?.uid ?? 'unknown';

  const docRef = await firestore()
    .collection('expenses')
    .add({
      ...input,
      createdBy,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });

  return docRef.id;
}

export async function getExpensesOnce(householdId: string): Promise<Expense[]> {
  await ensureSignedIn();

  const queryRef = firestore()
    .collection('expenses')
    .where('householdId', '==', householdId)
    .orderBy('createdAt', 'desc');

  const snapshot = await queryRef.get();

  return snapshot.docs.map(docSnap => {
    const raw = docSnap.data();

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

export function subscribeToExpenses(
  householdId: string,
  onChange: (rows: Expense[]) => void,
  onError?: (err: Error) => void,
) {
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
