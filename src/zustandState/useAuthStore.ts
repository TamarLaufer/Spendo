import { create } from 'zustand';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

type AuthState = {
  user: FirebaseAuthTypes.User | null;
  isAuthChecked: boolean;
  isLoggingIn: boolean;
  setIsLoggingIn: (value: boolean) => void;
  setUser: (user: FirebaseAuthTypes.User | null) => void;
  setIsAuthChecked: (value: boolean) => void;
  reset: () => void;
};

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  isAuthChecked: false,
  isLoggingIn: false,
  setIsLoggingIn: value => set({ isLoggingIn: value }),
  setUser: user => set({ user }),
  setIsAuthChecked: value => set({ isAuthChecked: value }),
  reset: () => set({ user: null, isAuthChecked: false, isLoggingIn: false }),
}));
