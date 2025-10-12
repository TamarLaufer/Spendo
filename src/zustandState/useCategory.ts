import { create } from 'zustand';

import {
  fetchCategoriesForHousehold,
  seedCategoriesIfEmpty,
  subscribeCategoriesForHousehold,
} from '../firebase/services/categories';
import { DEV_HOUSEHOLD_ID } from '../config/consts';
import { Category } from '../shared/categoryType';

type CategoryStateType = {
  categories: Category[];
  loading: boolean;
  error: string | null;
  setLoading: (v: boolean) => void;
  setError: (msg: string | null) => void;
  loadCategories: () => Promise<void>;
  subscribe: () => () => void;
  findCategoryById: (categoryId: string) => Category | undefined;
  deleteCategory: (categoryId: string) => void;
};

export const useCategory = create<CategoryStateType>((set, get) => ({
  categories: [],
  loading: false,
  error: null,

  setLoading: value => set({ loading: value }),
  setError: msg => set({ error: msg }),

  subscribe: () => {
    set({ loading: true, error: null });
    const unsub = subscribeCategoriesForHousehold(
      DEV_HOUSEHOLD_ID,
      rows => set({ categories: rows, loading: false, error: null }),
      err => set({ error: err.message, loading: false }),
    );
    return unsub;
  },

  loadCategories: async () => {
    set({ loading: true, error: null });
    try {
      await seedCategoriesIfEmpty(DEV_HOUSEHOLD_ID);
      const rows = await fetchCategoriesForHousehold(DEV_HOUSEHOLD_ID);
      set({ categories: rows, loading: false, error: null });
    } catch (e: any) {
      set({ error: e?.message ?? 'Load failed', loading: false });
    }
  },
  findCategoryById: (categoryId: string) => {
    const state = get();
    return state.categories.find(category => category.id === categoryId);
  },
  deleteCategory: (categoryId: string) => {
    const state = get();
    const newList = state.categories.filter(
      category => category.id !== categoryId,
    );
    set({
      categories: newList,
    });
  },
}));
