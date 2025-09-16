// src/firebase/services/categories.ts  (MODULAR, drop-in)

// ---- Imports ----
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
} from '@react-native-firebase/firestore';
import type { FirebaseFirestoreTypes as FirestoreTypes } from '@react-native-firebase/firestore';
import type { IconKey } from '../../assets/icons';

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
};

// ---- Firestore init ----
const appInstance = getApp(); // Inought if there is only one Application
const firestoreDb = getFirestore(appInstance);

// ---- Helper types ----
// סנאפשוט שמגיע מרשימה/שאילתה (מסמך שקיים בוודאות)
type CategoryDocSnap =
  FirestoreTypes.QueryDocumentSnapshot<FirestoreTypes.DocumentData>;

// פונקציית מיפוי למסמך ← מודל שמסך צורך
function mapDocToCategoryType(docSnap: CategoryDocSnap) {
  const data = docSnap.data() as CategoryFirebaseDoc;
  return {
    categoryId: docSnap.id,
    categoryName: data.categoryName,
    maxAmount: data.maxAmount,
    isExceed: false, // מחושב בקליינט
    icon: data.icon,
    subCategories: (data.subCategories ?? []).map(s => ({
      subCategoryId: s.subCategoryId,
      subCategoryName: s.subCategoryName,
      icon: s.icon,
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
  const rows = querySnapshot.docs.map((docSnap: CategoryDocSnap) =>
    mapDocToCategoryType(docSnap),
  );
  return rows;
}

export function subscribeCategoriesForHousehold(
  householdId: string,
  onChange: (rows: ReturnType<typeof mapDocToCategoryType>[]) => void,
  onError?: (e: Error) => void,
) {
  const categoriesRef = collection(firestoreDb, 'categories');
  const categoriesQuery = query(
    categoriesRef,
    where('householdId', '==', householdId),
    orderBy('order', 'asc'),
  );

  // שני ארגומנטים – קריא וברור
  return onSnapshot(
    categoriesQuery,
    snap => {
      const rows = snap.docs.map((docSnap: CategoryDocSnap) =>
        mapDocToCategoryType(docSnap),
      );
      onChange(rows);
    },
    err => onError?.(err as unknown as Error),
  );
}

// ---- Seeding (אם אין קטגוריות) ----
export async function seedCategoriesIfEmpty(householdId: string) {
  const categoriesRef = collection(firestoreDb, 'categories');

  // check if exist
  const existsSnap = await getDocs(
    query(categoriesRef, where('householdId', '==', householdId), limit(1)),
  );
  if (!existsSnap.empty) return;

  // adding a default categories
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
    batch.set(newDocRef, { ...cat, householdId });
  });
  await batch.commit();
}

// const deleteCategory = ()=>{

// }
