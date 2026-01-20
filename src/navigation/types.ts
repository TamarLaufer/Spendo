export type MainBottomTabsParamsListTypes = {
  Home: undefined;
  AllCategories: undefined;
  Add: undefined;
  Receipts: undefined;
  Settings: undefined;
};

export type RootStackParamsType = {
  MainTabs: undefined;
  DetailsExpense: {
    expenseId: string;
    categoryId: string;
    subCategoryId?: string;
  };
  AllExpenses: undefined;
  EditExpenseScreen: { expenseId: string; categoryId: string };
};
