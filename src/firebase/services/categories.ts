import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import type { IconKey } from '../../assets/icons';

export type SubCategoryDocType = {
  subCategoryId: string;
  subCategoryName: string;
  icon?: IconKey;
  order?: number;
  active?: boolean;
};

export type CategoryDoc = {
  householdId: string;
  categoryName: string;
  maxAmount: number;
  icon?: IconKey;
  order?: number;
  active?: boolean;
  subCategories: SubCategoryDocType[];
};

export async function fetchCategoriesForHousehold(householdId: string) {
  const ref = firestore()
    .collection('categories')
    .where('householdId', '==', householdId)
    .orderBy('order', 'asc');

  const snap = await ref.get();

  // ממפים ל-CategoryType שלך בדיוק:
  const rows = snap.docs.map(doc => {
    const data = doc.data() as CategoryDoc;
    return {
      categoryId: doc.id,
      categoryName: data.categoryName,
      maxAmount: data.maxAmount,
      isExceed: false, // תמיד מחושב בצד הקליינט
      icon: data.icon,
      subCategories: (data.subCategories ?? []).map(s => ({
        subCategoryId: s.subCategoryId,
        subCategoryName: s.subCategoryName,
        icon: s.icon,
      })),
    };
  });

  return rows;
}

export function subscribeCategoriesForHousehold(
  householdId: string,
  onChange: (rows: ReturnType<typeof mapDocToCategoryType>[]) => void,
  onError?: (e: Error) => void,
) {
  const q = firestore()
    .collection('categories')
    .where('householdId', '==', householdId)
    .orderBy('order', 'asc');

  return q.onSnapshot({
    next: snap => {
      const rows = snap.docs.map(mapDocToCategoryType);
      onChange(rows);
    },
    error: err => onError?.(err as any),
  });
}

// helper קטן כדי לא לשכפל קוד
function mapDocToCategoryType(
  docSnap: FirebaseFirestoreTypes.DocumentSnapshot,
) {
  const data = docSnap.data() as CategoryDoc;
  return {
    categoryId: docSnap.id,
    categoryName: data.categoryName,
    maxAmount: data.maxAmount,
    isExceed: false,
    icon: data.icon,
    subCategories: (data.subCategories ?? []).map(s => ({
      subCategoryId: s.subCategoryId,
      subCategoryName: s.subCategoryName,
      icon: s.icon,
    })),
  };
}

// זריעה ראשונית seed אם אין קטגוריות
export async function seedCategoriesIfEmpty(householdId: string) {
  const col = firestore().collection('categories');
  const exists = await col
    .where('householdId', '==', householdId)
    .limit(1)
    .get();
  if (!exists.empty) return;

  const defaults: Omit<CategoryDoc, 'householdId'>[] = [
    {
      categoryName: 'סופר',
      maxAmount: 1500,
      icon: 'market',
      order: 1,
      active: true,
      subCategories: [
        { subCategoryId: 'veg', subCategoryName: 'ירקות' },
        { subCategoryId: 'milk', subCategoryName: 'מוצרי חלב' },
      ],
    },
    {
      categoryName: 'רכב',
      maxAmount: 1000,
      icon: 'car',
      order: 2,
      active: true,
      subCategories: [
        { subCategoryId: 'fuel', subCategoryName: 'דלק' },
        { subCategoryId: 'service', subCategoryName: 'טיפול' },
      ],
    },
  ];

  const batch = firestore().batch();
  defaults.forEach(cat => {
    const ref = col.doc(); // id אקראי – זה ה-categoryId שלך
    batch.set(ref, { ...cat, householdId });
  });
  await batch.commit();
}
