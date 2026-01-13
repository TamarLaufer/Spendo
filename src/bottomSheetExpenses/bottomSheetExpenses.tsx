import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useCallback, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import AddExpenseStep from '../components/AddExpenseSteps/addExpenseStep/AddExpenseStep';
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
import {
  ActionsContainer,
  BackButton,
  BottomSheetContainer,
  HeaderText,
  StepContainer,
} from './BottomSheetExpenses.styles';

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
    <BottomSheetContainer
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose={!isSaving}
      enableDynamicSizing={false}
    >
      {!!header && <HeaderText>{header}</HeaderText>}

      <StepContainer>{renderStep()}</StepContainer>

      {currentStep !== 'amount' && (
        <BackButton onPress={handleBack} disabled={isSaving}>
          <Icons.Back width={50} height={50} />
        </BackButton>
      )}

      {showButton && !!primaryTitle && (
        <ActionsContainer>
          <ContinueButton
            title={primaryTitle}
            onPress={onPrimaryPress}
            disabled={primaryDisabled}
            loading={isSaving}
          />
        </ActionsContainer>
      )}
    </BottomSheetContainer>
  );
};

export default BottomSheetExpenses;
