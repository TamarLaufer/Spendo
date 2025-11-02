export type MainBottomTabsParamsListTypes = {
  Home: undefined;
  Categories: undefined;
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
};
