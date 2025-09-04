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
  findExpenseById: (id: string) => Expense | undefined;
};

export const useExpenses = create<ExpensesState>((set, get) => ({
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
  findExpenseById: (id: string) =>
    get().expenses.find((element: Expense) => element.id === id),

  addLocal(expense) {
    set(state => ({ expenses: [expense, ...state.expenses] }));
  },

  replaceAll(list) {
    set(state => (state.expenses === list ? state : { expenses: list }));
  },

  clear() {
    set({ expenses: [] });
  },
}));
