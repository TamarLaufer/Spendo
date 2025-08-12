import { create } from 'zustand';
import { Expense } from '../shared/expense';
import { getExpenses } from '../api/api';

type ExpensesState = {
  expenses: Expense[];
  loading: boolean;
  error: string | null;

  loadExpenses: () => Promise<void>;
  addLocal: (e: Expense) => void;
  replaceAll: (list: Expense[]) => void;
  clear: () => void;
};

export const useExpenses = create<ExpensesState>(set => ({
  expenses: [],
  loading: false,
  error: null,

  async loadExpenses() {
    set({ loading: true, error: null });
    try {
      const data = await getExpenses();
      set({ expenses: data, loading: false });
    } catch (e: any) {
      set({ error: e?.message || 'Fetch failed', loading: false });
    }
  },
  addLocal(e) {
    set(s => ({ expenses: [e, ...s.expenses] }));
  },

  replaceAll(list) {
    set({ expenses: list });
  },

  clear() {
    set({ expenses: [] });
  },
}));
