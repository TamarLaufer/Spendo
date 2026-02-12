import { create } from 'zustand';

type AppBootstrapState = {
  isAppReady: boolean;
  setAppReady: (value: boolean) => void;
};

export const useAppBootstrapStore = create<AppBootstrapState>(set => ({
  isAppReady: false,
  setAppReady: value => set({ isAppReady: value }),
}));
