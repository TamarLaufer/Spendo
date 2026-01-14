import { useExpenses } from '../zustandState/useExpenses';
import { useSubCategories } from './useSubCategories';

const useMonthlyCategoryTotals = () => {
  const expenses = useExpenses(state => state.expenses);
  const categories = useSubCategories(state => state.categories);
  const sumExpensesByCategoryPerMonth = () => {};

  return {};
};

export default useMonthlyCategoryTotals;
