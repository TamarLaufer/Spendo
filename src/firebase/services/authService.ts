import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  FirebaseAuthTypes,
} from '@react-native-firebase/auth';

import {
  getFirestore,
  collection,
  doc,
  setDoc,
  addDoc,
  serverTimestamp,
} from '@react-native-firebase/firestore';

export const registerWithEmailPassword = async (
  name: string,
  email: string,
  password: string,
): Promise<FirebaseAuthTypes.User> => {
  const auth = getAuth();
  const firestore = getFirestore();

  const normalizedEmail = email.trim().toLowerCase();
  const normalizedName = name.trim().toLowerCase();

  // ---------- Create auth user ----------
  const credential = await createUserWithEmailAndPassword(
    auth,
    normalizedEmail,
    password,
  );

  const user = credential.user;

  // ---------- Update display name ----------
  await updateProfile(user, {
    displayName: normalizedName,
  });

  // ---------- Create household ----------
  const householdRef = await addDoc(collection(firestore, 'households'), {
    name: `${name}'s household`,
    ownerId: user.uid,
    members: [
      {
        userId: user.uid,
        role: 'owner',
      },
    ],
    createdAt: serverTimestamp(),
  });

  // ---------- Create user document ----------
  await setDoc(doc(firestore, 'users', user.uid), {
    name,
    email: normalizedEmail,
    householdId: householdRef.id,
    role: 'owner',
    createdAt: serverTimestamp(),
  });

  return user;
};

// LOGIN
export const signInWithEmailPassword = async (
  email: string,
  password: string,
): Promise<FirebaseAuthTypes.User> => {
  const auth = getAuth();

  const normalizedEmail = email.trim().toLowerCase();

  const credential = await signInWithEmailAndPassword(
    auth,
    normalizedEmail,
    password,
  );

  return credential.user;
};

// LOGOUT
export const logout = async () => {
  const auth = getAuth();
  await signOut(auth);
};

// INVITE USER TO HOUSEHOLD
export const inviteUserToHousehold = async (
  householdId: string,
  email: string,
  role: 'member' | 'admin' = 'member',
  inviterId: string,
) => {
  const firestore = getFirestore();

  await addDoc(collection(firestore, 'householdInvitations'), {
    householdId,
    email: email.trim().toLowerCase(),
    role,
    invitedBy: inviterId,
    status: 'pending',
    createdAt: serverTimestamp(),
  });
};

// CHECK PENDING INVITATIONS
export const checkPendingInvitations = async (email: string) => {
  const firestore = getFirestore();

  const snapshot = await firestore
    .collection('householdInvitations')
    .where('email', '==', email)
    .where('status', '==', 'pending')
    .get();

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};
