import { create } from 'zustand';
import { Steps } from '../bottomSheet/types';
import { useBottomSheet } from './useBottomSheet';
import { useCategory } from './useCategory';

type ExpenseWizardStateType = {
  amount: number | null;
  categoryId: string;
  subCategoryId: string;
  currentStep: Steps;

  setAmount: (amount: number) => void;
  setCategoryId: (categoryId: string) => void;
  setSubCategoryId: (subCategoryId: string) => void;
  setCurrentStep: (step: Steps) => void;
  resetWizard: () => void;
  canProceedToNextStep: () => boolean;
  handleClose: () => void;
  handleBack: () => void;
  handleContinue: () => void;
};

export const useExpenseWizard = create<ExpenseWizardStateType>((set, get) => ({
  amount: null,
  categoryId: '',
  subCategoryId: '',
  currentStep: 'amount',

  setAmount: amount => set({ amount }),
  setCategoryId: categoryId => set({ categoryId }),
  setSubCategoryId: subCategoryId => set({ subCategoryId }),
  setCurrentStep: currentStep => set({ currentStep }),

  resetWizard: () =>
    set({
      amount: null,
      categoryId: '',
      subCategoryId: '',
      currentStep: 'amount',
    }),

  canProceedToNextStep: () => {
    const state = get();
    switch (state.currentStep) {
      case 'amount':
        return state.amount !== null && state.amount > 0;
      case 'category':
        return state.categoryId !== null;
      case 'subCategory':
        return state.subCategoryId !== null;
      case 'endProcess':
        return true;
      default:
        return false;
    }
  },

  handleClose: () => {
    const closeBottomSheet = useBottomSheet.getState().closeBottomSheet;
    closeBottomSheet();

    set({
      amount: null,
      categoryId: '',
      subCategoryId: '',
      currentStep: 'amount',
    });
  },

  handleBack: () => {
    const state = get();
    const findCategoryById = useCategory.getState().findCategoryById;
    const selectedCategory = findCategoryById(state.categoryId);
    switch (state.currentStep) {
      case 'category':
        set({ currentStep: 'amount' });
        break;
      case 'subCategory':
        set({ currentStep: 'category' });
        break;
      case 'endProcess':
        if (selectedCategory && selectedCategory.subCategories.length > 0) {
          set({ currentStep: 'subCategory' });
        } else {
          set({ currentStep: 'category' });
        }
        break;
    }
  },

  handleContinue: () => {
    const state = get();
    const findCategoryById = useCategory.getState().findCategoryById;
    const selectedCategory = findCategoryById(state.categoryId);
    if (!get().canProceedToNextStep()) return;

    switch (state.currentStep) {
      case 'amount':
        set({ currentStep: 'category' });
        break;
      case 'category':
        if (selectedCategory && selectedCategory?.subCategories?.length > 0) {
          set({ currentStep: 'subCategory' });
        } else {
          set({ currentStep: 'endProcess' });
        }
        break;
      case 'subCategory':
        set({ currentStep: 'endProcess' });
        break;
      case 'endProcess':
        get().handleClose();
        break;
    }
  },
}));
