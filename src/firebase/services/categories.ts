import { getApp } from '@react-native-firebase/app';
import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  getDocs,
  onSnapshot,
  writeBatch,
  doc,
  limit,
  addDoc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
  type FirebaseFirestoreTypes as FirestoreTypes,
} from '@react-native-firebase/firestore';
import type { IconKey } from '../../assets/icons';
import { DEV_HOUSEHOLD_ID } from '../../config/consts';
import { CategoryCreateSchema } from '../../shared/categorySchema';

export type SubCategoryDocType = {
  subCategoryId: string;
  subCategoryName: string;
  icon?: IconKey | null;
  order?: number;
  active?: boolean;
};

export type CategoryFirebaseDoc = {
  householdId: string;
  categoryName: string;
  maxAmount: number;
  icon?: IconKey | null;
  order?: number;
  active?: boolean;
  subCategories: SubCategoryDocType[];
  createdAt?: FirestoreTypes.FieldValue | FirestoreTypes.Timestamp | null;
  updatedAt?: FirestoreTypes.FieldValue | FirestoreTypes.Timestamp | null;
};

// ---- Firestore init ----
const appInstance = getApp();
const firestoreDb = getFirestore(appInstance);

// ---- Helper types ----
type CategoryDocSnap =
  FirestoreTypes.QueryDocumentSnapshot<FirestoreTypes.DocumentData>;

// ---- Mapper: Firestore → UI ----
function mapCategorySnapshotToModel(docSnap: CategoryDocSnap) {
  const data = docSnap.data() as CategoryFirebaseDoc;
  return {
    categoryId: docSnap.id,
    categoryName: data.categoryName,
    maxAmount: data.maxAmount,
    isExceed: false, // מחושב בצד הלקוח
    icon: data.icon,
    subCategories: (data.subCategories ?? []).map(s => ({
      subCategoryId: s.subCategoryId,
      subCategoryName: s.subCategoryName,
      icon: s.icon ?? null,
    })),
  };
}

// ---- Queries ----
export async function fetchCategoriesForHousehold(householdId: string) {
  const categoriesRef = collection(firestoreDb, 'categories');
  const categoriesQuery = query(
    categoriesRef,
    where('householdId', '==', householdId),
    orderBy('order', 'asc'),
  );

  const querySnapshot = await getDocs(categoriesQuery);
  return querySnapshot.docs.map(mapCategorySnapshotToModel as any);
}

export function subscribeCategoriesForHousehold(
  householdId: string,
  onChange: (rows: ReturnType<typeof mapCategorySnapshotToModel>[]) => void,
  onError?: (e: Error) => void,
) {
  const categoriesRef = collection(firestoreDb, 'categories');
  const categoriesQuery = query(
    categoriesRef,
    where('householdId', '==', householdId),
    orderBy('order', 'asc'),
  );

  return onSnapshot(
    categoriesQuery,
    snap => {
      const rows = snap.docs.map(mapCategorySnapshotToModel as any);
      onChange(rows);
    },
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
  const categoriesRef = collection(firestoreDb, 'categories');
  const parsed = CategoryCreateSchema.parse(input);

  const payload: CategoryFirebaseDoc = {
    householdId: parsed.householdId ?? DEV_HOUSEHOLD_ID,
    categoryName: parsed.categoryName.trim(),
    maxAmount: parsed.maxAmount,
    icon: parsed.icon ?? null,
    order: parsed.order ?? Date.now(),
    active: parsed.active ?? true,
    subCategories: parsed.subCategories,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const createdRef = await addDoc(categoriesRef, payload);
  return createdRef.id;
}

export async function addSubCategory(
  categoryId: string,
  subCategory: SubCategoryDocType,
) {
  await updateDoc(doc(firestoreDb, 'categories', categoryId), {
    subCategories: arrayUnion(subCategory),
    updatedAt: serverTimestamp(),
  });
}

// ---- Seed (אם אין קטגוריות) ----
export async function seedCategoriesIfEmpty(householdId: string) {
  const categoriesRef = collection(firestoreDb, 'categories');
  const existsSnap = await getDocs(
    query(categoriesRef, where('householdId', '==', householdId), limit(1)),
  );
  if (!existsSnap.empty) return;

  const defaults: Omit<CategoryFirebaseDoc, 'householdId'>[] = [
    {
      categoryName: 'מזון',
      maxAmount: 2000,
      icon: 'market',
      order: 1,
      active: true,
      subCategories: [
        { subCategoryId: 'mark', subCategoryName: 'סופר' },
        { subCategoryId: 'rest', subCategoryName: 'אוכל בחוץ ומסעדות' },
      ],
    },
    {
      categoryName: 'רכב',
      maxAmount: 3000,
      icon: 'car',
      order: 2,
      active: true,
      subCategories: [
        { subCategoryId: 'fuel', subCategoryName: 'דלק' },
        { subCategoryId: 'service', subCategoryName: 'טיפול' },
        { subCategoryId: 'wash', subCategoryName: 'שטיפה' },
      ],
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
