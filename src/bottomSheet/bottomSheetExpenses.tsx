import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { runOnJS, useWorkletCallback } from 'react-native-reanimated';
import { theme } from '../theme/theme';
import AddExpenseStep from '../components/AddExpenseSteps/AddExpenseStep';
import ChooseCategoryStep from '../components/AddExpenseSteps/ChooseCategoryStep';
import EndProcessStep from '../components/AddExpenseSteps/EndProcessStep';
import ChooseSubCategoryStep from '../components/AddExpenseSteps/ChooseSubCategoryStep';
import { Icons } from '../assets/icons';

type PropsType = {
  bottomSheetRef: React.RefObject<BottomSheetMethods | null>;
  onClose: () => void;
  onBack?: () => void;
};

const BottomSheetExpenses = ({
  bottomSheetRef,
  onClose,
  onBack,
}: PropsType) => {
  const snapPoints = useMemo(() => ['75%'], []);
  const [step, setStep] = useState<
    'amount' | 'category' | 'subCategory' | 'endProcess' | 'date'
  >('amount');
  const [isBackButton, setIsBackButton] = useState(false);
  const [isCancelButton, setIsCancelButton] = useState(false);

  const handleSheetChanges = useWorkletCallback((index: number) => {
    runOnJS(console.log)('BottomSheet index:', index);
  }, []);

  const handleSubmit = (value: string) => {
    // שלחי לפה את הערך שהוקש או העבירי ל־redux/פורם
    onClose(); // closing  the bottomsheet
  };

  const showBackButton = step !== 'amount'; // only from the second step
  const showCancelButton = step !== 'endProcess';

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}
      backgroundStyle={{
        backgroundColor: 'white',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
      }}
    >
      <BottomSheetView style={styles.contentContainer}>
        {step === 'amount' && (
          <AddExpenseStep
            onClose={onClose}
            onNext={() => setStep('category')}
          />
        )}
        {step === 'category' && (
          <ChooseCategoryStep
            onBack={() => setStep('amount')}
            onNext={() => setStep('subCategory')}
          />
        )}
        {step === 'subCategory' && (
          <ChooseSubCategoryStep
            onBack={() => setStep('category')}
            onNext={() => setStep('endProcess')}
          />
        )}
        {/* {step === 'date' && (
      <DateStep
        onFinish={handleFinish}
        onBack={() => setStep('category')}
      />
    )} */}
        {step === 'endProcess' && (
          <EndProcessStep
            onBack={() => setStep('subCategory')}
            onSubmit={() => handleSubmit}
          />
        )}
        {showBackButton && (
          <View style={styles.backButton}>
            <Icons.BACK width={50} height={50} onPress={onBack} />
          </View>
        )}
        {showCancelButton && (
          <View style={styles.cancelXButton}>
            <Icons.CANCEL_X width={32} height={32} onPress={onClose} />
          </View>
        )}
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
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputContainer: {
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 300,
    height: 60,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 20,
    paddingStart: 20,
    fontSize: 18,
  },
  submitButton: {
    backgroundColor: theme.color.pink,
    width: 300,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  submitButtonText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#EFEEEA',
  },
  backButton: {
    position: 'absolute',
    top: '-3%',
    left: '7%',
    zIndex: 10,
    transform: [{ rotate: '180deg' }],
  },
  cancelXButton: {
    position: 'absolute',
    top: '0.2%',
    right: '6%',
    zIndex: 10,
  },
});
export default BottomSheetExpenses;
