import { create } from 'zustand';
import { getExpenses, watchExpenses } from '../api/api';
import { ExpenseRecord } from '../shared/expense';
import { DEV_HOUSEHOLD_ID } from '../config/consts';

export type ExpensesState = {
  expenses: ExpenseRecord[];
  loading: boolean;
  error: string | null;

  loadExpenses: () => Promise<void>;
  subscribeExpenses: (householdId: string) => () => void;
  setLoading: (value: boolean) => void;
  setError: (msg: string | null) => void;
  addLocal: (e: ExpenseRecord) => void;
  replaceAll: (list: ExpenseRecord[]) => void;
  clear: () => void;
  findExpenseById: (id: string) => ExpenseRecord | undefined;
};

export const useExpenses = create<ExpensesState>((set, get) => ({
  expenses: [],
  loading: false,
  error: null,

  setLoading: value => set({ loading: value }),
  setError: msg => set({ error: msg }),

  async loadExpenses() {
    set({ loading: true, error: null });
    try {
      const data = await getExpenses(DEV_HOUSEHOLD_ID);
      set({ expenses: data, loading: false, error: null });
    } catch (e: any) {
      set({ error: e?.message || 'Fetch failed', loading: false });
    }
  },

  //real-time
  subscribeExpenses(householdId) {
    set({ loading: true, error: null });
    const unsubscribe = watchExpenses(
      householdId,
      rows => set({ expenses: rows, loading: false, error: null }),
      err => set({ error: err.message, loading: false }),
    );
    return unsubscribe; // חשוב: לקרוא לו ב-cleanup
  },

  findExpenseById: (id: string) =>
    get().expenses.find((element: ExpenseRecord) => element.id === id),

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
