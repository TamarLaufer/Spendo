import { create } from 'zustand';
import {
  PAYMENT_METHODS,
  type PaymentMethods,
  type Steps,
} from '../bottomSheetExpenses/types';
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
  setPaymentMethod: (paymentMethod: PaymentMethods['name']) => void;
  buildPayload: () => ExpenseCreateInput | null;
  submitExpense: () => Promise<void>;
  isSubmitReady: () => boolean;
};

export const useExpenseWizard = create<ExpenseWizardStateType>((set, get) => {
  return {
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

        case 'subCategory':
          return !!state.subCategoryId;

        case 'payMethod':
          return !!state.paymentMethod;

        case 'AddNoteForExpense':
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
    },

    isSubmitReady: () => {
      const state = get();

      if (!state.amount || state.amount <= 0) return false;
      if (!state.categoryId) return false;
      if (!state.paymentMethod) return false;

      return true;
    },
  };
});
