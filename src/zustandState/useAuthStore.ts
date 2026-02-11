import { create } from 'zustand';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

type AuthState = {
  user: FirebaseAuthTypes.User | null;
  isAuthLoading: boolean;
  setUser: (user: FirebaseAuthTypes.User | null) => void;
  setIsAuthLoading: (value: boolean) => void;
  reset: () => void;
};

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  isAuthLoading: true,
  setUser: user => set({ user }),
  setIsAuthLoading: value => set({ isAuthLoading: value }),
  reset: () => set({ user: null, isAuthLoading: false }),
}));
