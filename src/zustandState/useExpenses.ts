import { create } from 'zustand';
import { ExpenseUpdatePatch } from '../shared/expenseSchema';
import { DEV_HOUSEHOLD_ID } from '../config/consts';
import {
  deleteExpenseFromServer,
  ExpenseModel,
  fetchExpenses,
  subscribeToExpenses,
  updateExpenseService,
} from '../firebase/services/expensesService';

export type ExpensesState = {
  expenses: ExpenseModel[];
  loading: boolean;
  error: string | null;

  loadExpenses: () => Promise<void>;
  subscribeExpenses: (householdId: string) => () => void;
  setLoading: (value: boolean) => void;
  setError: (msg: string | null) => void;
  addLocal: (e: ExpenseModel) => void;
  replaceAll: (list: ExpenseModel[]) => void;
  clear: () => void;
  findExpenseById: (id: string) => ExpenseModel | undefined;
  deleteExpense: (id: string) => Promise<void>;
  updateExpense: (id: string, patch: ExpenseUpdatePatch) => Promise<void>;
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
      const data = await fetchExpenses(DEV_HOUSEHOLD_ID);
      set({ expenses: data, loading: false, error: null });
    } catch (e: any) {
      set({ error: e?.message || 'Fetch failed', loading: false });
    }
  },

  //real-time
  subscribeExpenses(householdId) {
    if (!householdId) return () => {};
    set({ loading: true, error: null });

    const unsubscribe = subscribeToExpenses(
      householdId,
      rows => set({ expenses: rows, error: null, loading: false }),
      err => set({ error: err.message, loading: false }),
    );

    return unsubscribe;
  },

  findExpenseById: (id: string) =>
    get().expenses.find((element: ExpenseModel) => element.id === id),

  addLocal(expense) {
    set(state => ({ expenses: [expense, ...state.expenses] }));
  },

  replaceAll(list) {
    set(state => (state.expenses === list ? state : { expenses: list }));
  },

  deleteExpense: async (id: string) => {
    try {
      await deleteExpenseFromServer(id);
      set(state => ({
        expenses: state.expenses.filter(expense => expense.id !== id),
      }));
    } catch (err: any) {
      set({ error: err?.message ?? 'Delete failed' });
    }
  },

  updateExpense: async (id, patch) => {
    try {
      await updateExpenseService(id, patch);
      set(state => ({
        expenses: state.expenses.map(exp =>
          exp.id === id ? { ...exp, ...patch } : exp,
        ),
      }));
    } catch (err) {
      console.error('❌ failed to update expense', err);
    }
  },

  clear() {
    set({ expenses: [] });
  },
}));
