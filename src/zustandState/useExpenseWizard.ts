import { create } from 'zustand';
import {
  PAYMENT_METHODS,
  type PaymentMethods,
  type Steps,
} from '../bottomSheet/types';
import { useBottomSheet } from './useBottomSheet';
import { useCategory } from './useCategory';
import {
  ExpenseCreateSchema,
  type ExpenseCreateInput,
} from '../shared/expenseSchema';
import { createExpense } from '../api/api';
import { DEV_HOUSEHOLD_ID } from '../config/consts';

type ExpenseWizardStateType = {
  amount: number | null;
  categoryId: string;
  subCategoryId: string;
  currentStep: Steps;
  paymentMethods: readonly PaymentMethods[];
  paymentMethod: PaymentMethods['name'];
  note?: string;

  setAmount: (amount: number) => void;
  setCategoryId: (categoryId: string) => void;
  setSubCategoryId: (subCategoryId: string) => void;
  setCurrentStep: (step: Steps) => void;
  setNote: (note: string) => void;
  resetWizard: () => void;
  canProceedToNextStep: () => boolean;
  handleClose: () => void;
  handleBack: () => void;
  handleContinue: () => void;
  setPaymentMethod: (paymentMethod: PaymentMethods['name']) => void;
  buildPayload: () => ExpenseCreateInput | null;
  submitExpense: () => Promise<void>;
  isSubmitReady: () => boolean;
};

export const useExpenseWizard = create<ExpenseWizardStateType>((set, get) => ({
  amount: null,
  categoryId: '',
  subCategoryId: '',
  currentStep: 'amount',
  paymentMethods: PAYMENT_METHODS,
  paymentMethod: PAYMENT_METHODS[0].name,
  note: '',

  setAmount: amount => set({ amount }),
  setCategoryId: categoryId => set({ categoryId, subCategoryId: '' }),
  setSubCategoryId: subCategoryId => set({ subCategoryId }),
  setCurrentStep: currentStep => set({ currentStep }),
  setPaymentMethod: paymentMethod => set({ paymentMethod }),
  setNote: note => set({ note }),

  resetWizard: () =>
    set({
      amount: null,
      categoryId: '',
      subCategoryId: '',
      currentStep: 'amount',
      paymentMethod: PAYMENT_METHODS[0].name,
      note: '',
    }),

  canProceedToNextStep: () => {
    const state = get();
    switch (state.currentStep) {
      case 'amount':
        return state.amount !== null && state.amount > 0;
      case 'category':
        return !!state.categoryId;
      case 'subCategory': {
        const cat = useCategory.getState().findCategoryById(state.categoryId);
        const hasSub = !!cat && cat.subCategories.length > 0;
        return hasSub ? !!state.subCategoryId : true;
      }
      case 'payMethod':
        return !!state.paymentMethod;
      case 'AddNoteForExpense':
        return true;
      case 'endProcess':
        return true;
      default:
        return false;
    }
  },

  buildPayload: (): ExpenseCreateInput | null => {
    const { amount, categoryId, subCategoryId, paymentMethod, note } = get();
    if (!amount || amount <= 0 || !categoryId || !paymentMethod) return null;

    const parsed = ExpenseCreateSchema.safeParse({
      householdId: DEV_HOUSEHOLD_ID,
      amount,
      categoryId,
      subCategoryId: subCategoryId ? subCategoryId : null,
      paymentMethod,
      note,
    });

    if (!parsed.success) return null;

    return parsed.data;
  },

  submitExpense: async () => {
    const payload = get().buildPayload();
    if (!payload) throw new Error('Incomplete expense data');

    await createExpense(payload);
    get().handleClose();
  },

  isSubmitReady: () => {
    const s = get();
    if (!s.amount || s.amount <= 0) return false;
    if (!s.categoryId) return false;
    const cat = useCategory.getState().findCategoryById(s.categoryId);
    const hasSubs = !!cat && cat.subCategories.length > 0;
    if (hasSubs && !s.subCategoryId) return false;
    if (!s.paymentMethod) return false;
    return true;
  },

  handleClose: () => {
    const closeBottomSheet = useBottomSheet.getState().closeBottomSheet;
    closeBottomSheet();
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
      case 'payMethod':
        if (selectedCategory && selectedCategory.subCategories.length > 0) {
          set({ currentStep: 'subCategory' });
        } else {
          set({ currentStep: 'category' });
        }
        break;
      case 'AddNoteForExpense':
        set({ currentStep: 'payMethod' });
        break;
      case 'endProcess':
        set({ currentStep: 'AddNoteForExpense' });
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
          set({ currentStep: 'payMethod' });
        }
        break;
      case 'subCategory':
        set({ currentStep: 'payMethod' });
        break;
      case 'payMethod':
        set({ currentStep: 'AddNoteForExpense' });
        break;
      case 'AddNoteForExpense':
        set({ currentStep: 'endProcess' });
        break;
      case 'endProcess':
        get().handleClose();
        break;
    }
  },
}));
