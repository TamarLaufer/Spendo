import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useEffect, useRef } from 'react';
import BottomSheetExpenses from '../bottomSheet/bottomSheetExpenses';
import MainTabs from '../navigation/bottom';
import { useCategory } from '../zustandState/useCategory';
import { useBottomSheet } from '../zustandState/useBottomSheet';

const MainTabsWithBottomSheet = () => {
  const bottomSheetRef = useRef<BottomSheetMethods | null>(null);
  const openBottomSheet = useBottomSheet(state => state.openBottomSheet);
  const closeBottomSheet = useBottomSheet(state => state.closeBottomSheet);
  const loadCategories = useCategory(state => state.loadCategories);
  const setBottomSheetRef = useBottomSheet(state => state.setBottomSheetRef);

  useEffect(() => {
    loadCategories();
    setBottomSheetRef(bottomSheetRef);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <MainTabs openBottomSheet={openBottomSheet} />
      <BottomSheetExpenses
        bottomSheetRef={bottomSheetRef}
        onClose={closeBottomSheet}
      />
    </>
  );
};

export default MainTabsWithBottomSheet;
