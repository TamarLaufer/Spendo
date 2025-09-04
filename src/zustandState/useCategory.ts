import { create } from 'zustand';
import { fetchCategories } from '../api/api';

export type CategoryType = {
  categoryId: string;
  categoryName: string;
  maxAmount: number;
  isExceed: boolean;
  subCategories: SubCategoryType[];
};

export type SubCategoryType = {
  subCategoryId: string;
  subCategoryName: string;
};

type CategoryStateType = {
  categories: CategoryType[];
  // addCategory: (categoryName: string, maxAmount: number) => void;
  loadCategories: () => Promise<void>;
  findCategoryById: (categoryId: string) => CategoryType | undefined;
  findSubCategoryById: (
    categoryId: string,
    subCategoryId: string | undefined,
  ) => SubCategoryType | undefined;
  deleteCategory: (categoryId: string) => void;
};

export const useCategory = create<CategoryStateType>((set, get) => ({
  categories: [],

  loadCategories: async () => {
    const categories = await fetchCategories();
    set({ categories });
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
