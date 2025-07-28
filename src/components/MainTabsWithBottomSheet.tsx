import { useRef } from 'react';
import HandleExpenses from '../bottomSheet/HandleExpenses';
import MainTabs from '../navigation/bottom';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';

const MainTabsWithBottomSheet = () => {
  const bottomSheetRef = useRef<BottomSheetMethods | null>(null);

  const openBottomSheet = () => bottomSheetRef.current?.expand();
  const closeBottomSheet = () => bottomSheetRef.current?.close();

  return (
    <>
      <MainTabs openBottomSheet={openBottomSheet} />
      <HandleExpenses
        bottomSheetRef={bottomSheetRef}
        onClose={closeBottomSheet}
      />
    </>
  );
};

export default MainTabsWithBottomSheet;
