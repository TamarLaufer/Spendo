import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useCallback, useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import AddExpenseStep from '../components/AddExpenseSteps/AddExpenseStep';
import ChooseCategoryStep from '../components/AddExpenseSteps/ChooseCategoryStep';
import EndProcessStep from '../components/AddExpenseSteps/EndProcessStep';
import ChooseSubCategoryStep from '../components/AddExpenseSteps/ChooseSubCategoryStep';
import { Icons } from '../assets/icons';
import ContinueButton from '../components/AddExpenseSteps/continueButton/ContinueButton';
import { StepsConfig } from './types';
import { useExpenseWizard } from '../zustandState/useExpenseWizard';

type PropsType = {
  bottomSheetRef: React.RefObject<BottomSheetMethods | null>;
  onClose: () => void;
};

const BottomSheetExpenses = ({ bottomSheetRef }: PropsType) => {
  const snapPoints = useMemo(() => ['75%'], []);

  const {
    currentStep,
    resetWizard,
    canProceedToNextStep,
    handleContinue,
    handleBack,
  } = useExpenseWizard();

  const { header, buttonTitle, showButton } = StepsConfig[currentStep];

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      resetWizard();
    }
  }, []);

  const renderStep = () => {
    switch (currentStep) {
      case 'amount':
        return <AddExpenseStep />;
      case 'category':
        return <ChooseCategoryStep />;
      case 'subCategory':
        return <ChooseSubCategoryStep />;
      case 'endProcess':
        return <EndProcessStep />;
      default:
        return null;
    }
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}
      enableDynamicSizing={false}
      backgroundStyle={{
        backgroundColor: '#F5F5F5',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
      }}
      style={styles.bottomSheet}
    >
      {!!header && <Text style={styles.header}>{header}</Text>}

      <BottomSheetScrollView style={styles.bottomScroll}>
        {renderStep()}
      </BottomSheetScrollView>

      {currentStep !== 'amount' && (
        <Pressable style={styles.backButton} onPress={handleBack}>
          <Icons.BACK width={50} height={50} />
        </Pressable>
      )}

      {/* {currentStep !== 'endProcess' && (
        <Pressable style={styles.cancelXButton} onPress={handleClose}>
          <Icons.CANCEL_X width={32} height={32} />
        </Pressable>
      )} */}

      {showButton && !!buttonTitle && (
        <View style={styles.actions}>
          <ContinueButton
            title={buttonTitle}
            onPress={handleContinue}
            disabled={!canProceedToNextStep()}
          />
        </View>
      )}
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    paddingVertical: 12,
    flex: 1,
  },
  bottomScroll: {
    marginTop: 28,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 12,
  },
  backButton: {
    position: 'absolute',
    top: '-2%',
    left: '7%',
    zIndex: 10,
    transform: [{ rotate: '180deg' }],
  },
  cancelXButton: {
    position: 'absolute',
    top: '0%',
    right: '6%',
    zIndex: 10,
  },
  actions: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 28,
  },
});

export default BottomSheetExpenses;
