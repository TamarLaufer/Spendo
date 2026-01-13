import type { IconKey } from '../assets/icons';

export type SubCategoryType = {
  id: string;
  categoryId: string;
  name: string;
  icon?: IconKey | null;
  order?: number;
  active?: boolean;
  createdAt?: Date | null;
  updatedAt?: Date | null;
};
export type CategoryType = {
  id: string;
  name: string;
  maxAmount: number;
  isExceed: boolean;
  icon?: IconKey | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
};
