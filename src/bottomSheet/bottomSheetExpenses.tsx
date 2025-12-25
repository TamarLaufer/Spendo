import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useCallback, useMemo, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import AddExpenseStep from '../components/AddExpenseSteps/AddExpenseStep';
import ChooseCategoryStep from '../components/AddExpenseSteps/ChooseCategoryStep';
import EndProcessStep from '../components/AddExpenseSteps/EndProcessStep';
import ChooseSubCategoryStep from '../components/AddExpenseSteps/ChooseSubCategoryStep';
import { Icons } from '../assets/icons';
import ContinueButton from '../components/AddExpenseSteps/continueButton/ContinueButton';
import { StepsConfig } from './types';
import { useExpenseWizard } from '../zustandState/useExpenseWizard';
import PaymentMethodsScreen from '../components/AddExpenseSteps/PaymentMethodsScreen';
import AddNoteForExpense from '../components/AddExpenseSteps/AddNoteForExpense';
import { useExpenseWizardNavigation } from '../hooks/useExpenseWizardNavigation';

type PropsType = {
  bottomSheetRef: React.RefObject<BottomSheetMethods | null>;
};

const BottomSheetExpenses = ({ bottomSheetRef }: PropsType) => {
  const snapPoints = useMemo(() => ['75%'], []);
  const { handleBack, handleContinue, handleClose } =
    useExpenseWizardNavigation();

  const {
    currentStep,
    resetWizard,
    canProceedToNextStep,
    isSubmitReady,
    submitExpense,
  } = useExpenseWizard();

  const { header, buttonTitle, showButton } = StepsConfig[currentStep];
  const [isSaving, setIsSaving] = useState(false);
  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        resetWizard();
      }
    },
    [resetWizard],
  );

  const renderStep = () => {
    switch (currentStep) {
      case 'amount':
        return <AddExpenseStep />;
      case 'category':
        return <ChooseCategoryStep />;
      case 'subCategory':
        return <ChooseSubCategoryStep />;
      case 'payMethod':
        return <PaymentMethodsScreen />;
      case 'AddNoteForExpense':
        return <AddNoteForExpense />;
      case 'endProcess':
        return <EndProcessStep />;
      default:
        return null;
    }
  };

  const primaryTitle =
    currentStep === 'endProcess' ? 'סיום ושמירה' : buttonTitle;

  const onPrimaryPress = async () => {
    if (currentStep !== 'endProcess') {
      return handleContinue();
    }
    try {
      setIsSaving(true);
      await submitExpense();
      Alert.alert('נשמר!', 'ההוצאה נשמרה בהצלחה');
      handleClose();
    } catch (error) {
      Alert.alert('שגיאה', 'שמירה נכשלה');
    } finally {
      setIsSaving(false);
    }
  };

  const primaryDisabled =
    currentStep === 'endProcess'
      ? isSaving || !isSubmitReady()
      : !canProceedToNextStep();

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose={!isSaving}
      enableDynamicSizing={false}
      backgroundStyle={styles.bottomSheetBackground}
      style={styles.bottomSheet}
    >
      {!!header && <Text style={styles.header}>{header}</Text>}

      <BottomSheetScrollView
        style={styles.bottomScroll}
        contentContainerStyle={styles.bottomSheetView}
      >
        {renderStep()}
      </BottomSheetScrollView>

      {currentStep !== 'amount' && (
        <Pressable
          style={styles.backButton}
          onPress={handleBack}
          disabled={isSaving}
        >
          <Icons.Back width={50} height={50} />
        </Pressable>
      )}

      {showButton && !!primaryTitle && (
        <View style={styles.actions}>
          <ContinueButton
            title={primaryTitle}
            onPress={onPrimaryPress}
            disabled={primaryDisabled}
            loading={isSaving}
          />
        </View>
      )}
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    paddingVertical: 5,
  },
  bottomSheetBackground: {
    backgroundColor: '#FBFBFB',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 18,
  },
  bottomScroll: {
    marginTop: 28,
    marginHorizontal: 10,
  },
  bottomSheetView: { paddingBottom: 40 },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 12,
  },
  backButton: {
    position: 'absolute',
    top: -8,
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
    paddingBottom: 28,
  },
});

export default BottomSheetExpenses;
