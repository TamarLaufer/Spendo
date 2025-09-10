import { create } from 'zustand';
import type { Expense } from '../firebase/services/expenses';
import { getExpenses, /* createExpense, */ watchExpenses } from '../api/api';

export type ExpensesState = {
  expenses: Expense[];
  loading: boolean;
  error: string | null;

  loadExpenses: (householdId: string) => Promise<void>;
  subscribeExpenses: (householdId: string) => () => void;

  addLocal: (e: Expense) => void;
  replaceAll: (list: Expense[]) => void;
  clear: () => void;
  findExpenseById: (id: string) => Expense | undefined;
};

export const useExpenses = create<ExpensesState>((set, get) => ({
  expenses: [],
  loading: false,
  error: null,

  async loadExpenses(householdId) {
    set({ loading: true, error: null });
    try {
      const data = await getExpenses(householdId); // ← עכשיו Firebase
      set({ expenses: data, loading: false });
    } catch (e: any) {
      set({ error: e?.message || 'Fetch failed', loading: false });
    }
  },

  //real-time
  subscribeExpenses(householdId) {
    set({ loading: true, error: null });
    const unsubscribe = watchExpenses(
      householdId,
      rows => set({ expenses: rows, loading: false }),
      err => set({ error: err.message, loading: false }),
    );
    return unsubscribe; // חשוב: לקרוא לו ב-cleanup
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
