import { create } from 'zustand';
import {
  PAYMENT_METHODS,
  type PaymentMethods,
  type Steps,
} from '../bottomSheet/types';
import { useBottomSheet } from './useBottomSheet';
import {
  ExpenseCreateSchema,
  type ExpenseCreateInput,
} from '../shared/expenseSchema';
import { createExpense } from '../api/api';
import { DEV_HOUSEHOLD_ID } from '../config/consts';

// ✅ חדש: נשתמש באינדקס גלובלי של תתי־קטגוריות (counts לפי categoryId)
import { useSubcatIndex } from './useSubCategoriesIndex';

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

export const useExpenseWizard = create<ExpenseWizardStateType>((set, get) => {
  // helper פנימי: האם לקטגוריה יש תתי־קטגוריות לפי האינדקס הגלובלי
  const hasSubs = (catId: string) => {
    if (!catId) return false;
    const counts = useSubcatIndex.getState().counts;
    return (counts[catId] ?? 0) > 0;
  };

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
      const s = get();
      switch (s.currentStep) {
        case 'amount':
          return s.amount !== null && s.amount > 0;
        case 'category':
          return !!s.categoryId;
        case 'subCategory': {
          const needSub = hasSubs(s.categoryId);
          return needSub ? !!s.subCategoryId : true;
        }
        case 'payMethod':
          return !!s.paymentMethod;
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
      get().handleClose();
    },

    isSubmitReady: () => {
      const s = get();
      if (!s.amount || s.amount <= 0) return false;
      if (!s.categoryId) return false;
      const needSub = hasSubs(s.categoryId);
      if (needSub && !s.subCategoryId) return false;
      if (!s.paymentMethod) return false;
      return true;
    },

    handleClose: () => {
      const closeBottomSheet = useBottomSheet.getState().closeBottomSheet;
      closeBottomSheet();
    },

    handleBack: () => {
      const s = get();
      const needSub = hasSubs(s.categoryId);

      switch (s.currentStep) {
        case 'category':
          set({ currentStep: 'amount' });
          break;
        case 'subCategory':
          set({ currentStep: 'category' });
          break;
        case 'payMethod':
          set({ currentStep: needSub ? 'subCategory' : 'category' });
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
      const s = get();
      if (!get().canProceedToNextStep()) return;

      const needSub = hasSubs(s.categoryId);

      switch (s.currentStep) {
        case 'amount':
          set({ currentStep: 'category' });
          break;
        case 'category':
          set({ currentStep: needSub ? 'subCategory' : 'payMethod' });
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
  };
});
