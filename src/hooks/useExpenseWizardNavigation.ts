import { useBottomSheet } from '../zustandState/useBottomSheet';
import { useSubcatIndex } from '../zustandState/useSubCategoriesIndex';
import { useExpenseWizard } from '../zustandState/useExpenseWizard';
import { useCallback } from 'react';

export const useExpenseWizardNavigation = () => {
  const currentStep = useExpenseWizard(state => state.currentStep);
  const categoryId = useExpenseWizard(state => state.categoryId);
  const setCurrentStep = useExpenseWizard(state => state.setCurrentStep);

  const canProceedToNextStep = useExpenseWizard(
    state => state.canProceedToNextStep,
  );
  const counts = useSubcatIndex(state => state.counts);
  const { closeBottomSheet } = useBottomSheet();

  const hasSubs = useCallback(
    (catId: string) => {
      if (!catId) return false;
      return (counts[catId] ?? 0) > 0;
    },
    [counts],
  );

  const handleContinue = useCallback(
    (selectedCategoryId?: string) => {
      if (!canProceedToNextStep()) return;

      const catId = selectedCategoryId ?? categoryId;
      const needSub = hasSubs(catId);

      switch (currentStep) {
        case 'amount':
          return setCurrentStep('category');
        case 'category':
          return setCurrentStep(needSub ? 'subCategory' : 'payMethod');
        case 'subCategory':
          return setCurrentStep('payMethod');
        case 'payMethod':
          return setCurrentStep('addNote');
        case 'addNote':
          return setCurrentStep('endProcess');
        case 'endProcess':
          return closeBottomSheet();
      }
    },
    [
      canProceedToNextStep,
      currentStep,
      setCurrentStep,
      closeBottomSheet,
      hasSubs,
      categoryId,
    ],
  );

  const handleClose = useCallback(() => {
    closeBottomSheet();
  }, [closeBottomSheet]);

  const handleBack = useCallback(() => {
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
      case 'addNote':
        setCurrentStep('payMethod');
        break;
      case 'endProcess':
        setCurrentStep('addNote');
        break;
    }
  }, [categoryId, currentStep, setCurrentStep, hasSubs]);

  return {
    handleContinue,
    handleClose,
    handleBack,
  };
};
