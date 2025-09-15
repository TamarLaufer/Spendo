import firestore from '@react-native-firebase/firestore';
import { DEV_HOUSEHOLD_ID } from '../../config/consts';

type Sub = { subCategoryId: string; subCategoryName: string; icon?: string };

export async function addCategory(input: {
  categoryName: string;
  maxAmount: number;
  icon?: string;
}) {
  const ref = firestore().collection('categories').doc();
  await ref.set({
    householdId: DEV_HOUSEHOLD_ID,
    categoryName: input.categoryName,
    maxAmount: input.maxAmount,
    icon: input?.icon ?? input.icon,
    order: Date.now(),
    active: true,
    subCategories: [] as Sub[],
  });
  return ref.id;
}

export async function addSubCategory(categoryId: string, sub: Sub) {
  await firestore()
    .collection('categories')
    .doc(categoryId)
    .update({
      subCategories: firestore.FieldValue.arrayUnion(sub),
    });
}
