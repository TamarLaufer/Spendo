import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useRef } from 'react';
import BottomSheetExpenses from '../bottomSheet/bottomSheetExpenses';
import MainTabs from '../navigation/bottom';

const MainTabsWithBottomSheet = () => {
  const bottomSheetRef = useRef<BottomSheetMethods | null>(null);

  const openBottomSheet = () => bottomSheetRef.current?.expand();
  const closeBottomSheet = () => bottomSheetRef.current?.close();

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
