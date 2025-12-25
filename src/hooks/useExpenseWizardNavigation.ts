import { useBottomSheet } from '../zustandState/useBottomSheet';
import { useSubcatIndex } from '../zustandState/useSubCategoriesIndex';
import { useExpenseWizard } from '../zustandState/useExpenseWizard';

export const useExpenseWizardNavigation = () => {
  const currentStep = useExpenseWizard(state => state.currentStep);
  const categoryId = useExpenseWizard(state => state.categoryId);
  const setCurrentStep = useExpenseWizard(state => state.setCurrentStep);

  const canProceedToNextStep = useExpenseWizard(
    state => state.canProceedToNextStep,
  );
  const counts = useSubcatIndex(state => state.counts);
  const { closeBottomSheet } = useBottomSheet();

  const hasSubs = (catId: string) => {
    if (!catId) return false;
    return (counts[catId] ?? 0) > 0;
  };

  const handleContinue = () => {
    if (!canProceedToNextStep()) return;

    const needSub = hasSubs(categoryId);

    switch (currentStep) {
      case 'amount':
        setCurrentStep('category');
        break;
      case 'category':
        setCurrentStep(needSub ? 'subCategory' : 'payMethod');
        break;
      case 'subCategory':
        setCurrentStep('payMethod');
        break;
      case 'payMethod':
        setCurrentStep('AddNoteForExpense');
        break;
      case 'AddNoteForExpense':
        setCurrentStep('endProcess');
        break;
      case 'endProcess':
        closeBottomSheet();
        break;
    }
  };

  const handleClose = () => {
    closeBottomSheet();
  };

  const handleBack = () => {
    const needSub = hasSubs(categoryId);

    switch (currentStep) {
      case 'category':
        setCurrentStep('amount');
        break;
      case 'subCategory':
        setCurrentStep('category');
        break;
      case 'payMethod':
        setCurrentStep(needSub ? 'subCategory' : 'category');
        break;
      case 'AddNoteForExpense':
        setCurrentStep('payMethod');
        break;
      case 'endProcess':
        setCurrentStep('AddNoteForExpense');
        break;
    }
  };

  return {
    handleContinue,
    handleClose,
    handleBack,
  };
};
