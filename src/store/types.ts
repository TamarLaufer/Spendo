export type SubcategoryType = {
  id: string;
  name: string;
};

export type CategoryType = {
  id: string;
  name: string;
  maxAmount: number;
  subCategories?: SubcategoryType[];
};

export type ExpensesType = {
  id: string;
  category: CategoryType;
  subCategory?: SubcategoryType;
  amount: number;
  date: Date;
  note?: string;
};
