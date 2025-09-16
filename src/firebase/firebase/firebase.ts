import { getApp } from '@react-native-firebase/app';
import { getFirestore } from '@react-native-firebase/firestore';

export const appInstance = getApp();
export const firestoreDb = getFirestore(appInstance);
