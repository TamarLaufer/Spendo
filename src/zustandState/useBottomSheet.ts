import { create } from 'zustand';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';

type BottomSheetStore = {
  bottomSheetRef: React.RefObject<BottomSheetMethods | null> | null;
  setBottomSheetRef: (ref: React.RefObject<BottomSheetMethods | null>) => void;
  openBottomSheet: () => void;
  closeBottomSheet: () => void;
};

export const useBottomSheet = create<BottomSheetStore>((set, get) => ({
  bottomSheetRef: null,

  setBottomSheetRef: ref => set({ bottomSheetRef: ref }),

  openBottomSheet: () => {
    const { bottomSheetRef } = get();
    bottomSheetRef?.current?.expand();
  },

  closeBottomSheet: () => {
    const { bottomSheetRef } = get();
    bottomSheetRef?.current?.close();
  },
}));
