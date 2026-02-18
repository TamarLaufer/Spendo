import { getApp } from '@react-native-firebase/app';
import {
  getFirestore,
  collection,
  where,
  orderBy,
  getDocs,
  writeBatch,
  doc,
  limit,
  addDoc,
  serverTimestamp,
  type FirebaseFirestoreTypes as FirestoreTypes,
  setDoc,
  query,
  updateDoc,
} from '@react-native-firebase/firestore';
import type { IconKey } from '../../assets/icons';
import { DEV_HOUSEHOLD_ID } from '../../config/consts';
import { CategoryCreateSchema } from '../../shared/categorySchema';
import { CategoryPatch } from '../../shared/categoryType';

export type CategoryDocRead = {
  householdId: string;
  categoryName: string;
  maxAmount: number;
  icon?: IconKey;
  order?: number;
  active?: boolean;
  createdAt?: FirestoreTypes.Timestamp | null;
  updatedAt?: FirestoreTypes.Timestamp | null;
};

type CategoryDocWrite = {
  householdId: string;
  categoryName: string;
  maxAmount: number;
  icon?: IconKey;
  order?: number;
  active?: boolean;
  createdAt?: FirestoreTypes.FieldValue;
  updatedAt?: FirestoreTypes.FieldValue;
};

export type SubCategoryDocRead = {
  subCategoryName: string;
  icon: IconKey;
  order?: number;
  active?: boolean;
  categoryId?: string;
  createdAt?: FirestoreTypes.Timestamp | null;
  updatedAt?: FirestoreTypes.Timestamp | null;
};

export type SubCategoryDocWrite = {
  subCategoryName: string;
  icon: IconKey;
  order?: number;
  active?: boolean;
  categoryId?: string;
  createdAt?: FirestoreTypes.FieldValue;
  updatedAt?: FirestoreTypes.FieldValue;
};

export type SubCategoryWithId = SubCategoryDocRead & {
  id: string;
  categoryId: string;
};

//----collect all refs----
type CatColRefRead = FirestoreTypes.CollectionReference<CategoryDocRead>;
type CatColRefWrite = FirestoreTypes.CollectionReference<CategoryDocWrite>;
type SubColRefRead = FirestoreTypes.CollectionReference<SubCategoryDocRead>;
type SubColRefWrite = FirestoreTypes.CollectionReference<SubCategoryDocWrite>;
type SubDocRefWrite = FirestoreTypes.DocumentReference<SubCategoryDocWrite>;

// ---- Firestore init ----
const appInstance = getApp();
const firestoreDb = getFirestore(appInstance); //determines which database to use

// ---- Helper types ----
const categoriesColRead = (): CatColRefRead =>
  collection(firestoreDb, 'categories') as CatColRefRead; //create a reference to the categories collection in the database

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

// ---- Mapper/formatter: from Firestore to UI ----
function mapCategoryDocToModel(
  docSnap: FirestoreTypes.QueryDocumentSnapshot<CategoryDocRead>, //Firestore document snapshot
) {
  const data = docSnap.data();
  return {
    id: docSnap.id,
    name: data.categoryName,
    maxAmount: data.maxAmount,
    isExceed: false, //TODO: implement this feature
    icon: data.icon || 'defaultIcon',
    active: data.active ?? true,
  };
}

// ---- Queries ----
export async function fetchCategoriesForHousehold(householdId: string) {
  const categoriesQuery = query(
    //create a query to the categories collection in the database
    categoriesColRead(), //create a reference to the categories collection in the database
    where('householdId', '==', householdId), //filter the categories by the household id
    orderBy('order', 'asc'), //sort (on the DB side) the categories by the order
  );

  const querySnapshot = await getDocs(categoriesQuery); //execute the query and get the documents
  return querySnapshot.docs.map(mapCategoryDocToModel); //map the documents to the UI model
}

// ---- Create a new category ----
export async function addCategory(input: {
  categoryName: string;
  maxAmount: number;
  icon: IconKey;
  order?: number;
  active?: boolean;
  householdId?: string;
}) {
  const parsed = CategoryCreateSchema.parse(input);

  const snap = await getDocs(
    query(
      categoriesColRead(),
      where('householdId', '==', parsed.householdId ?? DEV_HOUSEHOLD_ID),
      where('active', '==', true),
      where('categoryName', '==', parsed.categoryName.trim()),
    ),
  );

  if (!snap.empty) {
    throw new Error('CATEGORY_ALREADY_EXISTS');
  }

  const payload: CategoryDocWrite = {
    householdId: parsed.householdId ?? DEV_HOUSEHOLD_ID,
    categoryName: parsed.categoryName.trim(),
    maxAmount: parsed.maxAmount,
    icon: parsed.icon ?? 'defaultIcon',
    order: parsed.order ?? Date.now(),
    active: parsed.active ?? true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const createdRef = await addDoc(categoriesColWrite(), payload);
  return createdRef.id;
}

// helper for creating an id from a name (or use a random id)
export const toId = (name: string) =>
  name
    .normalize('NFKC')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '')
    .slice(0, 48);

export async function softDeleteCategory(categoryId: string) {
  await setDoc(
    doc(firestoreDb, 'categories', categoryId),
    {
      active: false,
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
}

function mapCategoryPatchToDb(patch: CategoryPatch) {
  const dbPatch: Record<string, any> = {};

  if (patch.name !== undefined) dbPatch.categoryName = patch.name;
  if (patch.maxAmount !== undefined) dbPatch.maxAmount = patch.maxAmount;
  if (patch.icon !== undefined) dbPatch.icon = patch.icon;
  if (patch.active !== undefined) dbPatch.active = patch.active;
  if (patch.order !== undefined) dbPatch.order = patch.order;

  return dbPatch;
}

export async function updateCategory(categoryId: string, patch: CategoryPatch) {
  const ref = doc(firestoreDb, 'categories', categoryId);

  const dbPatch = mapCategoryPatchToDb(patch);

  await updateDoc(ref, {
    ...dbPatch,
    updatedAt: serverTimestamp(),
  });
}

// ---- upsert = Update or Insert a sub category ----
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

export async function fetchSubCategoriesForCategory(
  categoryId: string,
): Promise<SubCategoryWithId[]> {
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

const parseCsv = (raw?: string) =>
  (raw ?? '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

export async function addCategoryWithCsvSubcats(input: {
  categoryName: string;
  maxAmount: number;
  icon?: IconKey;
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
    icon: input.icon || 'defaultIcon',
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
      icon: 'defaultIcon',
      categoryId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  });
  await batch.commit();

  return categoryId;
}

// ---- Seed (when there are no categories) ----
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
