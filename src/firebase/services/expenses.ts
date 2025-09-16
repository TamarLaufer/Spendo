// src/firebase/services/expenses.ts
import { getApp } from '@react-native-firebase/app';
import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  Timestamp,
  type FirebaseFirestoreTypes as FirestoreTypes,
} from '@react-native-firebase/firestore';

import {
  ExpenseCreateSchema,
  ExpenseUpdateSchema,
  ExpenseRecordSchema,
  type ExpenseCreateInput,
  type ExpenseUpdatePatch,
} from '../../shared/expense';

// ---------- Firestore init ----------
const applicationInstance = getApp();
const firestoreDatabase = getFirestore(applicationInstance);

// ---------- Firestore document shape (DB) ----------
export type ExpenseFirebaseDoc = {
  householdId: string;
  amount: number;
  categoryId: string;
  subCategoryId?: string | null;
  note?: string | null;
  paymentMethod?: string | null;
  createdBy?: string | null;
  createdAt: FirestoreTypes.FieldValue | FirestoreTypes.Timestamp | null;
  updatedAt?: FirestoreTypes.FieldValue | FirestoreTypes.Timestamp | null;
};

// ---------- UI model (what the app uses) ----------
export type ExpenseModel = {
  id: string;
  householdId: string;
  amount: number;
  categoryId: string;
  subCategoryId: string | null;
  paymentMethod: string;
  createdAt: Date | null;
  createdBy?: string;
  note?: string;
};

// ---------- Helpers ----------
function convertUiTimeToFirestoreTimestamp(
  value: Date | string | FirestoreTypes.Timestamp | null | undefined,
): FirestoreTypes.Timestamp | null {
  if (value == null) return null;
  if (value instanceof Date) return Timestamp.fromDate(value);
  if (typeof value === 'string') return Timestamp.fromDate(new Date(value));
  return value;
}

function isFirestoreTimestamp(
  value: unknown,
): value is FirestoreTypes.Timestamp {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as any).toDate === 'function'
  );
}

function isJavaScriptDate(value: unknown): value is Date {
  return value instanceof Date;
}

function convertFirestoreTimeToDate(
  value:
    | FirestoreTypes.FieldValue
    | FirestoreTypes.Timestamp
    | Date
    | null
    | undefined,
): Date | null {
  if (value == null) return null;
  if (isFirestoreTimestamp(value)) return value.toDate();
  if (isJavaScriptDate(value)) return value;
  // כאן זה כנראה FieldValue (serverTimestamp) או משהו אחר לא מוכר – נחזיר null ל-UI
  return null;
}

// ---------- Mapper: Firestore → UI ----------
type ExpenseQueryDocumentSnapshot =
  FirestoreTypes.QueryDocumentSnapshot<ExpenseFirebaseDoc>;

function mapExpenseSnapshotToModel(
  expenseDocumentSnapshot: ExpenseQueryDocumentSnapshot,
): ExpenseModel {
  const documentData = expenseDocumentSnapshot.data();

  const mapped: ExpenseModel = {
    id: expenseDocumentSnapshot.id,
    householdId: documentData.householdId,
    amount: documentData.amount,
    categoryId: documentData.categoryId,
    subCategoryId: documentData.subCategoryId ?? null,
    paymentMethod: documentData.paymentMethod ?? '',
    createdAt: convertFirestoreTimeToDate(documentData.createdAt),
    createdBy: documentData.createdBy ?? undefined,
    note: documentData.note ?? undefined,
  };

  // Optional runtime validation for the UI shape
  ExpenseRecordSchema.parse(mapped);
  return mapped;
}

// ---------- Queries ----------
export async function fetchExpenses(householdId: string) {
  const expensesCollectionReference = collection(firestoreDatabase, 'expenses');
  const expensesQuery = query(
    expensesCollectionReference,
    where('householdId', '==', householdId),
    orderBy('createdAt', 'desc'),
  );

  const expensesQuerySnapshot = await getDocs(expensesQuery);
  const rows = expensesQuerySnapshot.docs.map(
    (expenseSnapshot: ExpenseQueryDocumentSnapshot) =>
      mapExpenseSnapshotToModel(expenseSnapshot),
  );
  return rows;
}

export function subscribeToExpenses(
  householdId: string,
  onChange: (rows: ExpenseModel[]) => void,
  onError?: (error: Error) => void,
) {
  const expensesCollectionReference = collection(firestoreDatabase, 'expenses');
  const expensesQuery = query(
    expensesCollectionReference,
    where('householdId', '==', householdId),
    orderBy('createdAt', 'desc'),
  );

  const unsubscribe = onSnapshot(
    expensesQuery,
    snapshot => {
      const rows = snapshot.docs.map(
        (expenseSnapshot: ExpenseQueryDocumentSnapshot) =>
          mapExpenseSnapshotToModel(expenseSnapshot),
      );
      onChange(rows);
    },
    error => onError?.(error as unknown as Error),
  );

  return unsubscribe;
}

// ---------- Create ----------
export async function addExpense(createInput: ExpenseCreateInput) {
  const validatedCreateInput = ExpenseCreateSchema.parse(createInput);

  const firestorePayload: ExpenseFirebaseDoc = {
    householdId: validatedCreateInput.householdId,
    amount: validatedCreateInput.amount,
    categoryId: validatedCreateInput.categoryId,
    subCategoryId: validatedCreateInput.subCategoryId ?? null,
    note: validatedCreateInput.note ?? null,
    paymentMethod: validatedCreateInput.paymentMethod ?? null,
    createdBy: null,
    createdAt: validatedCreateInput.createdAt
      ? convertUiTimeToFirestoreTimestamp(validatedCreateInput.createdAt)
      : serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const newExpenseReference = await addDoc(
    collection(firestoreDatabase, 'expenses'),
    firestorePayload,
  );
  return newExpenseReference.id;
}

// ---------- Update (partial) ----------
export async function updateExpense(
  expenseId: string,
  updatePatch: ExpenseUpdatePatch,
) {
  const validatedUpdatePatch = ExpenseUpdateSchema.parse(updatePatch);
  const expenseDocumentReference = doc(
    firestoreDatabase,
    'expenses',
    expenseId,
  );

  const updatePayload: Partial<ExpenseFirebaseDoc> = {
    updatedAt: serverTimestamp(),
  };

  if (validatedUpdatePatch.amount !== undefined) {
    updatePayload.amount = validatedUpdatePatch.amount;
  }
  if (validatedUpdatePatch.categoryId !== undefined) {
    updatePayload.categoryId = validatedUpdatePatch.categoryId;
  }
  if (validatedUpdatePatch.subCategoryId !== undefined) {
    updatePayload.subCategoryId = validatedUpdatePatch.subCategoryId ?? null;
  }
  if (validatedUpdatePatch.note !== undefined) {
    updatePayload.note = validatedUpdatePatch.note ?? null;
  }
  if (validatedUpdatePatch.paymentMethod !== undefined) {
    updatePayload.paymentMethod = validatedUpdatePatch.paymentMethod ?? null;
  }
  if (validatedUpdatePatch.createdBy !== undefined) {
    updatePayload.createdBy = validatedUpdatePatch.createdBy ?? null;
  }
  if (validatedUpdatePatch.createdAt !== undefined) {
    updatePayload.createdAt =
      validatedUpdatePatch.createdAt === null
        ? null
        : convertUiTimeToFirestoreTimestamp(validatedUpdatePatch.createdAt);
  }

  await updateDoc(expenseDocumentReference, updatePayload as any);
}

// ---------- Delete ----------
export async function deleteExpense(expenseId: string) {
  const expenseDocumentReference = doc(
    firestoreDatabase,
    'expenses',
    expenseId,
  );
  await deleteDoc(expenseDocumentReference);
}
