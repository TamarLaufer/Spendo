export type MainBottomTabsParamsListTypes = {
  Home: undefined;
  AllCategories: undefined;
  Add: undefined;
  Receipts: undefined;
  Settings: undefined;
};

export type RootStackParamsType = {
  MainTabs: undefined;
  ExpenseDetails: {
    expenseId: string;
    categoryId: string;
    subCategoryId?: string;
  };
  AllExpenses: undefined;
  EditExpense: { expenseId: string; categoryId: string };
  CategoryDetails: { categoryId: string };
  EditCategory: { categoryId: string };
};

export type AuthStackParamsType = {
  Login: undefined;
  Register: undefined;
};
