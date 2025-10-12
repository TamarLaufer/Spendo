import type { IconKey } from '../assets/icons';

export type SubCategory = {
  id: string;
  categoryId: string;
  name: string;
  icon?: IconKey | null;
  order?: number;
  active?: boolean;
  createdAt?: Date | null;
  updatedAt?: Date | null;
};
export type Category = {
  id: string;
  name: string;
  maxAmount: number;
  isExceed: boolean; // computed in UI
  icon?: IconKey | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
};
