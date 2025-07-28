import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useMemo } from 'react';
import { Button, StyleSheet, Text } from 'react-native';
import { runOnJS, useWorkletCallback } from 'react-native-reanimated';

type PropsType = {
  bottomSheetRef: React.RefObject<BottomSheetMethods | null>;
  onClose: () => void;
};

const HandleExpenses = ({ bottomSheetRef, onClose }: PropsType) => {
  const snapPoints = useMemo(() => ['25%', '50%', '70%'], []);

  const handleSheetChanges = useWorkletCallback((index: number) => {
    runOnJS(console.log)('BottomSheet index:', index);
  }, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}
    >
      <BottomSheetView style={styles.contentContainer}>
        <Text>Awesome 🎉</Text>
        <Button title="סגור" onPress={onClose} />
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    padding: 36,
    alignItems: 'center',
  },
});
export default HandleExpenses;
