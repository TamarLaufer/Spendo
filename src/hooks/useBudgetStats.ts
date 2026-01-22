import { useMemo } from 'react';
import { useExpenses } from '../zustandState/useExpenses';
import { useCategory } from '../zustandState/useCategory';

type CategoryBudgetStat = {
  categoryId: string;
  spent: number;
  max: number;
  percent: number;
  isExceeded: boolean;
};

type BudgetStats = {
  byCategory: Record<string, CategoryBudgetStat>;
  total: {
    spent: number;
    max: number;
    percent: number;
  };
};

export function useBudgetStats(): BudgetStats {
  const expenses = useExpenses(state => state.expenses);
  const categories = useCategory(state => state.categories);

  const stats = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const byCategory: Record<string, CategoryBudgetStat> = {};
    let totalSpent = 0;
    let totalMax = 0;

    categories.forEach(category => {
      const categoryExpenses = expenses.filter(expense => {
        const date = expense.createdAt ? new Date(expense.createdAt) : null;

        if (!date) return false;

        return (
          expense.categoryId === category.id &&
          date.getMonth() === currentMonth &&
          date.getFullYear() === currentYear
        );
      });

      const spent = categoryExpenses.reduce((sum, exp) => sum + exp.amount, 0);

      const max = category.maxAmount ?? 0;
      const percent = max > 0 ? Math.min((spent / max) * 100, 100) : 0;
      const isExceeded = max > 0 && spent > max;

      byCategory[category.id] = {
        categoryId: category.id,
        spent,
        max,
        percent,
        isExceeded,
      };

      totalSpent += spent;
      totalMax += max;
    });

    const totalPercent =
      totalMax > 0 ? Math.min((totalSpent / totalMax) * 100, 100) : 0;

    return {
      byCategory,
      total: {
        spent: totalSpent,
        max: totalMax,
        percent: totalPercent,
      },
    };
  }, [expenses, categories]);

  return stats;
}
