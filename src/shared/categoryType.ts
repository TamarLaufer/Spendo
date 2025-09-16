import type { IconKey } from '../assets/icons';

export type SubCategoryType = {
  subCategoryId: string;
  subCategoryName: string;
  icon?: IconKey | null;
};

export type CategoryType = {
  categoryId: string;
  categoryName: string;
  maxAmount: number;
  isExceed: boolean;
  icon?: IconKey | null;
  subCategories: SubCategoryType[];
};
