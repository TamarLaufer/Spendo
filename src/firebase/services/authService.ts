import auth from '@react-native-firebase/auth';

export const signInWithEmailPassword = async (
  email: string,
  password: string,
) => {
  const normalizedEmail = email.trim().toLowerCase();
  await auth().signInWithEmailAndPassword(normalizedEmail, password);
};
