import { create } from 'zustand';
import { PAYMENT_METHODS, PaymentMethods, Steps } from '../bottomSheet/types';
import { useBottomSheet } from './useBottomSheet';
import { useCategory } from './useCategory';
import {
  Expense,
  ExpensePayloadInput,
  ExpensePayloadOutput,
  ExpensePayloadSchema,
  type ExpensePayload,
} from '../shared/expense';
import { createExpense } from '../api/api';
import { useExpenses } from './useExpenses';

type ExpenseWizardStateType = {
  amount: number | null;
  categoryId: string;
  subCategoryId: string;
  currentStep: Steps;
  paymentMethods: readonly PaymentMethods[];
  paymentMethod: PaymentMethods['name'];

  setAmount: (amount: number) => void;
  setCategoryId: (categoryId: string) => void;
  setSubCategoryId: (subCategoryId: string) => void;
  setCurrentStep: (step: Steps) => void;
  resetWizard: () => void;
  canProceedToNextStep: () => boolean;
  handleClose: () => void;
  handleBack: () => void;
  handleContinue: () => void;
  setPaymentMethod: (paymentMethod: PaymentMethods['name']) => void;
  buildPayload: () => ExpensePayloadOutput | null;
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

  setAmount: amount => set({ amount }),
  setCategoryId: categoryId => set({ categoryId, subCategoryId: '' }),
  setSubCategoryId: subCategoryId => set({ subCategoryId }),
  setCurrentStep: currentStep => set({ currentStep }),
  setPaymentMethod: paymentMethod => set({ paymentMethod }),

  resetWizard: () =>
    set({
      amount: null,
      categoryId: '',
      subCategoryId: '',
      currentStep: 'amount',
      paymentMethod: PAYMENT_METHODS[0].name,
    }),

  canProceedToNextStep: () => {
    const state = get();
    switch (state.currentStep) {
      case 'amount':
        return state.amount !== null && state.amount > 0;
      case 'category':
        return !!state.categoryId;
      case 'subCategory':
        const cat = useCategory.getState().findCategoryById(state.categoryId);
        const hasSub = !!cat && cat.subCategories.length > 0;
        return hasSub ? !!state.subCategoryId : true;
      case 'payMethod':
        return !!state.paymentMethod;
      case 'endProcess':
        return true;
      default:
        return false;
    }
  },

  buildPayload: (): ExpensePayloadOutput | null => {
    const { amount, categoryId, subCategoryId, paymentMethod } = get();
    if (!amount || amount <= 0 || !categoryId || !paymentMethod) return null;

    // before validation — input
    const expensePayloadInput: ExpensePayloadInput = {
      amount,
      categoryId,
      subCategoryId: subCategoryId || null,
      paymentMethod,
      createdAt: new Date().toISOString(),
    };

    // validation
    const parsed = ExpensePayloadSchema.safeParse(expensePayloadInput);
    if (!parsed.success) return null;

    // after validation — safe payload
    const expensePayload: ExpensePayload = parsed.data;
    return expensePayload;
  },

  submitExpense: async () => {
    const payload = get().buildPayload();
    console.log(payload);

    if (!payload) throw new Error('Incomplete expense data');

    const saved: Expense = await createExpense(payload);
    useExpenses.getState().addLocal(saved);
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
      case 'endProcess':
        set({ currentStep: 'payMethod' });
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
        set({ currentStep: 'endProcess' });
        break;
      case 'endProcess':
        get().handleClose();
        break;
    }
  },
}));
