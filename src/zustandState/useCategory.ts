import { create } from 'zustand';

import {
  fetchCategoriesForHousehold,
  seedCategoriesIfEmpty,
  softDeleteCategory as softDeleteCategoryService,
  updateCategory as updateCategoryService,
} from '../firebase/services/categoriesService';
import { DEV_HOUSEHOLD_ID } from '../config/consts';
import { CategoryPatch, CategoryType } from '../shared/categoryType';

type CategoryStateType = {
  categories: CategoryType[];
  loading: boolean;
  error: string | null;
  setLoading: (v: boolean) => void;
  setError: (msg: string | null) => void;
  loadCategories: () => Promise<void>;
  findCategoryById: (categoryId: string) => CategoryType | undefined;
  softDeleteCategory: (categoryId: string) => Promise<void>;
  updateCategory: (
    categoryId: string,
    patch: CategoryPatch,
  ) => Promise<void>;
};

export const useCategory = create<CategoryStateType>((set, get) => ({
  categories: [],
  loading: false,
  error: null,

  setLoading: value => set({ loading: value }),
  setError: msg => set({ error: msg }),

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
    return state.categories.find(
      (category: CategoryType) => category.id === categoryId,
    );
  },
  softDeleteCategory: async categoryId => {
    const exists = get().categories.some(cat => cat.id === categoryId);
    if (!exists) return;

    try {
      await softDeleteCategoryService(categoryId);
      set(state => ({
        categories: state.categories.filter(cat => cat.id !== categoryId),
      }));
    } catch (e: any) {
      console.error('Failed to soft delete category', e);
      throw e;
    }
  },
  updateCategory: async (categoryId, patch) => {
    const exists = get().categories.some(cat => cat.id === categoryId);
    if (!exists) return;

    try {
      await updateCategoryService(categoryId, patch);

      set(state => ({
        categories: state.categories.map(cat =>
          cat.id === categoryId ? { ...cat, ...patch } : cat,
        ),
      }));
    } catch (e: any) {
      console.error('Failed to update category', e);
      throw e;
    }
  },
}));
