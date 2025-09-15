import { create } from 'zustand';
import type { CategoryType, SubCategoryType } from '../shared/categoryType';
import {
  fetchCategoriesForHousehold,
  seedCategoriesIfEmpty,
  subscribeCategoriesForHousehold,
} from '../firebase/services/categories';
import { DEV_HOUSEHOLD_ID } from '../config/consts';

type CategoryStateType = {
  categories: CategoryType[];
  loading: boolean;
  error: string | null;
  // addCategory: (categoryName: string, maxAmount: number) => void;
  setLoading: (value: boolean) => void;
  setError: (msg: string | null) => void;
  loadCategories: () => Promise<void>;
  // ריל-טיים: פותח מנוי ומחזיר פונקציית ביטול
  subscribe: () => () => void;
  findCategoryById: (categoryId: string) => CategoryType | undefined;
  findSubCategoryById: (
    categoryId: string,
    subCategoryId: string | undefined,
  ) => SubCategoryType | undefined;
  deleteCategory: (categoryId: string) => void;
};

export const useCategory = create<CategoryStateType>((set, get) => ({
  categories: [],
  loading: false,
  error: null,

  setLoading: value => set({ loading: value }),
  setError: msg => set({ error: msg }),

  // realtime
  subscribe: () => {
    set({ error: null });
    const unsub = subscribeCategoriesForHousehold(
      DEV_HOUSEHOLD_ID,
      rows => set({ categories: rows }),
      err => set({ error: err.message }),
    );
    return unsub;
  },

  loadCategories: async () => {
    set({ loading: true, error: null });
    try {
      await seedCategoriesIfEmpty(DEV_HOUSEHOLD_ID);
      const rows = await fetchCategoriesForHousehold(DEV_HOUSEHOLD_ID);
      set({ categories: rows, loading: false });
      set({ loading: true, error: null });
    } catch (e: any) {
      set({ error: e?.message ?? 'Load failed', loading: false });
    }
  },
  // addCategory: (categoryName: string, maxAmount: number) => {
  //   const newCategory = {
  //     categoryId: crypto.randomUUID(),
  //     categoryName,
  //     maxAmount,
  //     isExceed: false,
  //     subCategories: [],
  //   };
  //   set(state => ({
  //     categories: [...state.categories, newCategory],
  //   }));
  // },
  findCategoryById: (categoryId: string) => {
    const state = get();
    return state.categories.find(
      category => category.categoryId === categoryId,
    );
  },
  findSubCategoryById: (
    categoryId: string,
    subCategoryId: string | undefined,
  ) => {
    const state = get();
    const category = state.categories.find(
      oneCategory => oneCategory.categoryId === categoryId,
    );
    const subCategory = category?.subCategories.find(
      sub => subCategoryId === sub.subCategoryId,
    );
    return subCategory;
  },
  deleteCategory: (categoryId: string) => {
    const state = get();
    const newList = state.categories.filter(
      category => category.categoryId !== categoryId,
    );
    set({
      categories: newList,
    });
  },
}));
