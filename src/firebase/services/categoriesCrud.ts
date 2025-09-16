// src/firebase/services/categoriesCrud.ts — Modular RNFirebase v22

import { getApp } from '@react-native-firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
  type FirebaseFirestoreTypes as FirestoreTypes,
} from '@react-native-firebase/firestore';
import type { IconKey } from '../../assets/icons';
import { DEV_HOUSEHOLD_ID } from '../../config/consts';
import type { CategoryDoc, SubCategoryDocType } from './categories';

// ---- Firestore init ----
const appInstance = getApp();
const firestoreDb = getFirestore(appInstance);

// ---- Types ----
export type AddCategoryInput = {
  categoryName: string;
  maxAmount: number;
  icon?: IconKey | null;
};

export async function addCategory(input: AddCategoryInput) {
  const payload: CategoryDoc & {
    createdAt?: FirestoreTypes.FieldValue;
    updatedAt?: FirestoreTypes.FieldValue;
  } = {
    householdId: DEV_HOUSEHOLD_ID,
    categoryName: input.categoryName,
    maxAmount: input.maxAmount,
    icon: input.icon ?? null, // לא שולחים undefined
    order: Date.now(),
    active: true,
    subCategories: [],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const categoriesRef = collection(firestoreDb, 'categories');
  const createdRef = await addDoc(categoriesRef, payload);

  // אופציונלי אבל נוח: לשמור את המזהה גם בשדה במסמך
  await setDoc(
    doc(firestoreDb, 'categories', createdRef.id),
    { categoryId: createdRef.id, updatedAt: serverTimestamp() },
    { merge: true },
  );

  return createdRef.id;
}

export type AddSubCategoryInput = SubCategoryDocType;

export async function addSubCategory(
  categoryId: string,
  subCategory: AddSubCategoryInput,
) {
  const categoryRef = doc(firestoreDb, 'categories', categoryId);
  await updateDoc(categoryRef, {
    subCategories: arrayUnion(subCategory),
    updatedAt: serverTimestamp(),
  });
}
