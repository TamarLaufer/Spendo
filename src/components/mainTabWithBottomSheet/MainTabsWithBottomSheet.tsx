import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useEffect, useRef } from 'react';
import { useCategory } from '../../zustandState/useCategory';
import { useBottomSheet } from '../../zustandState/useBottomSheet';
import BottomSheetExpenses from '../../bottomSheet/bottomSheetExpenses';
import MainTabs from '../../navigation/bottom';

const MainTabsWithBottomSheet = () => {
  const bottomSheetRef = useRef<BottomSheetMethods | null>(null);
  const openBottomSheet = useBottomSheet(state => state.openBottomSheet);
  const loadCategories = useCategory(state => state.loadCategories);
  const setBottomSheetRef = useBottomSheet(state => state.setBottomSheetRef);

  useEffect(() => {
    loadCategories();
    setBottomSheetRef(bottomSheetRef);
  }, [loadCategories, setBottomSheetRef]);

  return (
    <>
      <MainTabs openBottomSheet={openBottomSheet} />
      <BottomSheetExpenses bottomSheetRef={bottomSheetRef} />
    </>
  );
};

export default MainTabsWithBottomSheet;
