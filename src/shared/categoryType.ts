import type { IconKey } from '../assets/icons';

export type SubCategoryType = {
  id: string;
  categoryId: string;
  name: string;
  icon?: IconKey;
  order?: number;
  active?: boolean;
};

export type CategoryType = {
  id: string;
  name: string;
  maxAmount: number;
  isExceed: boolean;
  icon?: IconKey;
};

export type CategoryPatch = Partial<{
  name: string;
  maxAmount: number;
  icon: IconKey;
  active: boolean;
  order: number;
}>;