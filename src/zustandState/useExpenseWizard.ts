import { create } from 'zustand';
import { CategoryType, SubcategoryType } from '../store/types';

export type ExpenseWizardData = {
  category: CategoryType | null;
  subCategory?: SubcategoryType | null;
  amount: number | null;
  date: Date | null;
  note?: string;
};

type ExpenseWizardState = ExpenseWizardData & {
  setCategory: (category: CategoryType) => void;
  setSubCategory: (subCategory: SubcategoryType) => void;
  setAmount: (amount: number) => void;
  setDate: (date: Date) => void;
  setNote?: (note: string) => void;
  reset: () => void;
};

export const useExpenseWizard = create<ExpenseWizardState>(set => ({
  category: null,
  subCategory: undefined,
  amount: null,
  date: null,
  note: '',
  setCategory: category => set({ category }),
  setSubCategory: subCategory => set({ subCategory }),
  setAmount: amount => set({ amount }),
  setDate: date => set({ date }),
  setNote: note => set({ note }),
  reset: () =>
    set({
      category: null,
      subCategory: undefined,
      amount: null,
      date: null,
      note: '',
    }),
}));
