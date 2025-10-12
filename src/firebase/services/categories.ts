import { getApp } from '@react-native-firebase/app';
import {
  getFirestore,
  collection,
  where,
  orderBy,
  getDocs,
  onSnapshot,
  writeBatch,
  doc,
  limit,
  addDoc,
  serverTimestamp,
  type FirebaseFirestoreTypes as FirestoreTypes,
  setDoc,
  query,
} from '@react-native-firebase/firestore';
import type { IconKey } from '../../assets/icons';
import { DEV_HOUSEHOLD_ID } from '../../config/consts';
import { CategoryCreateSchema } from '../../shared/categorySchema';

export type SubCategoryDocRead = {
  subCategoryName: string;
  icon?: IconKey | null;
  order?: number;
  active?: boolean;
  categoryId?: string;
  createdAt?: FirestoreTypes.Timestamp | null;
  updatedAt?: FirestoreTypes.Timestamp | null;
};

export type SubCategoryDocWrite = {
  subCategoryName: string;
  icon?: IconKey | null;
  order?: number;
  active?: boolean;
  categoryId?: string;
  createdAt?: FirestoreTypes.FieldValue;
  updatedAt?: FirestoreTypes.FieldValue;
};

export type CategoryDocRead = {
  householdId: string;
  categoryName: string;
  maxAmount: number;
  icon?: IconKey | null;
  order?: number;
  active?: boolean;
  createdAt?: FirestoreTypes.Timestamp | null;
  updatedAt?: FirestoreTypes.Timestamp | null;
};

type CategoryDocWrite = {
  householdId: string;
  categoryName: string;
  maxAmount: number;
  icon?: IconKey | null;
  order?: number;
  active?: boolean;
  createdAt?: FirestoreTypes.FieldValue; // בדרך כלל serverTimestamp()
  updatedAt?: FirestoreTypes.FieldValue;
};

type CatColRefRead = FirestoreTypes.CollectionReference<CategoryDocRead>;
type CatColRefWrite = FirestoreTypes.CollectionReference<CategoryDocWrite>;
type SubColRefRead = FirestoreTypes.CollectionReference<SubCategoryDocRead>;
type SubColRefWrite = FirestoreTypes.CollectionReference<SubCategoryDocWrite>;
type SubDocRefWrite = FirestoreTypes.DocumentReference<SubCategoryDocWrite>;

// ---- Firestore init ----
const appInstance = getApp();
const firestoreDb = getFirestore(appInstance);

// ---- Helper types ----

const categoriesColRead = (): CatColRefRead =>
  collection(firestoreDb, 'categories') as CatColRefRead;

const categoriesColWrite = (): CatColRefWrite =>
  collection(firestoreDb, 'categories') as CatColRefWrite;

const subCategoriesColRead = (categoryId: string): SubColRefRead =>
  collection(
    firestoreDb,
    'categories',
    categoryId,
    'subCategories',
  ) as SubColRefRead;

const subCategoriesColWrite = (categoryId: string): SubColRefWrite =>
  collection(
    firestoreDb,
    'categories',
    categoryId,
    'subCategories',
  ) as SubColRefWrite;

// ---- Mapper: Firestore → UI ----
function mapCategorySnapshotToModel(
  docSnap: FirestoreTypes.QueryDocumentSnapshot<CategoryDocRead>,
) {
  const data = docSnap.data();
  return {
    id: docSnap.id,
    name: data.categoryName,
    maxAmount: data.maxAmount,
    isExceed: false,
    icon: data.icon ?? null,
  };
}

// ---- Queries ----
export async function fetchCategoriesForHousehold(householdId: string) {
  const categoriesQuery = query(
    categoriesColRead(),
    where('householdId', '==', householdId),
    orderBy('order', 'asc'),
  );

  const querySnapshot = await getDocs(categoriesQuery);
  return querySnapshot.docs.map(mapCategorySnapshotToModel);
}

export function subscribeCategoriesForHousehold(
  householdId: string,
  onChange: (rows: ReturnType<typeof mapCategorySnapshotToModel>[]) => void,
  onError?: (e: Error) => void,
) {
  const categoriesQuery = query(
    categoriesColRead(),
    where('householdId', '==', householdId),
    orderBy('order', 'asc'),
  );

  return onSnapshot(
    categoriesQuery,
    snap => onChange(snap.docs.map(mapCategorySnapshotToModel)),
    err => onError?.(err as unknown as Error),
  );
}

// ---- Create category ----
export async function addCategory(input: {
  categoryName: string;
  maxAmount: number;
  icon?: IconKey | null;
  order?: number;
  active?: boolean;
  householdId?: string;
}) {
  const parsed = CategoryCreateSchema.parse(input);

  const payload: CategoryDocWrite = {
    householdId: parsed.householdId ?? DEV_HOUSEHOLD_ID,
    categoryName: parsed.categoryName.trim(),
    maxAmount: parsed.maxAmount,
    icon: parsed.icon ?? null,
    order: parsed.order ?? Date.now(),
    active: parsed.active ?? true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const createdRef = await addDoc(categoriesColWrite(), payload);
  return createdRef.id;
}

// helper ליצירת id מֵשם (או תשתמשי ב-id אקראי)
export const toId = (name: string) =>
  name
    .normalize('NFKC')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '')
    .slice(0, 48);

export async function upsertSubCategory(
  categoryId: string,
  subCategoryId: string,
  data: Omit<SubCategoryDocWrite, 'createdAt' | 'updatedAt'>,
) {
  const ref = doc(
    subCategoriesColWrite(categoryId),
    subCategoryId,
  ) as SubDocRefWrite;

  await setDoc(
    ref,
    { ...data, categoryId, updatedAt: serverTimestamp() },
    { merge: true },
  );
}

export async function fetchSubCategoriesForCategory(categoryId: string) {
  const queryOrder = query(
    subCategoriesColRead(categoryId),
    orderBy('order', 'asc'),
  );
  const getDocsSubCat = await getDocs(queryOrder);
  return getDocsSubCat.docs.map(
    (subDoc: FirestoreTypes.QueryDocumentSnapshot<SubCategoryDocRead>) => ({
      id: subDoc.id,
      categoryId,
      ...subDoc.data(),
    }),
  );
}

export function subscribeSubCategoriesForCategory(
  categoryId: string,
  onChange: (
    rows: Array<{ id: string } & SubCategoryDocRead & { categoryId: string }>,
  ) => void,
  onError?: (e: Error) => void,
) {
  const querySub = query(
    subCategoriesColRead(categoryId),
    orderBy('order', 'asc'),
  );
  return onSnapshot(
    querySub,
    snap => {
      const rows = snap.docs.map(
        (subDoc: FirestoreTypes.QueryDocumentSnapshot<SubCategoryDocRead>) => ({
          id: subDoc.id,
          categoryId,
          ...subDoc.data(),
        }),
      );
      onChange(rows);
    },
    err => onError?.(err as unknown as Error),
  );
}

const parseCsv = (raw?: string) =>
  (raw ?? '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

export async function addCategoryWithCsvSubcats(input: {
  categoryName: string;
  maxAmount: number;
  icon?: IconKey | null;
  order?: number;
  active?: boolean;
  householdId?: string;
  subcatsCsv?: string; // ← מגיע מהטופס
}) {
  const categoriesRef = collection(firestoreDb, 'categories');

  const payload: CategoryDocWrite = {
    householdId: input.householdId ?? DEV_HOUSEHOLD_ID,
    categoryName: input.categoryName.trim(),
    maxAmount: input.maxAmount,
    icon: input.icon ?? null,
    order: input.order ?? Date.now(),
    active: input.active ?? true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  // יצירת הקטגוריה
  const catRef = await addDoc(categoriesRef, payload);
  const categoryId = catRef.id;

  // כתיבת תתי־קטגוריות כ-docs בתת־אוסף (batch אופציונלי)
  const names = parseCsv(input.subcatsCsv);
  const batch = writeBatch(firestoreDb);
  names.forEach((name, idx) => {
    const subId = toId(name) || `${Date.now()}-${idx}`;
    const ref = doc(subCategoriesColWrite(categoryId), subId) as SubDocRefWrite;
    batch.set(ref, {
      subCategoryName: name,
      order: idx,
      active: true,
      categoryId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  });
  await batch.commit();

  return categoryId;
}

// ---- Seed (אם אין קטגוריות) ----
export async function seedCategoriesIfEmpty(householdId: string) {
  const categoriesRef = collection(firestoreDb, 'categories');
  const existsSnap = await getDocs(
    query(categoriesRef, where('householdId', '==', householdId), limit(1)),
  );
  if (!existsSnap.empty) return;

  const defaults: Omit<CategoryDocRead, 'householdId'>[] = [
    {
      categoryName: 'מזון',
      maxAmount: 2000,
      icon: 'market',
      order: 1,
      active: true,
    },
    {
      categoryName: 'רכב',
      maxAmount: 3000,
      icon: 'car',
      order: 2,
      active: true,
    },
  ];

  const batch = writeBatch(firestoreDb);
  defaults.forEach(cat => {
    const newDocRef = doc(categoriesRef); // auto-id
    batch.set(newDocRef, {
      ...cat,
      householdId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  });
  await batch.commit();
}
