import { useMemo } from 'react';
import { useExpenses } from '../zustandState/useExpenses';
import { ExpenseModel } from '../firebase/services/expensesService';

export type ExpensesMonthSection = {
  key: string;
  title: string;
  data: ExpenseModel[];
};

const useExpensesByMonth = () => {
  const expenses = useExpenses(state => state.expenses);

  const monthKey = (date: Date | null) => {
    if (!date) return 'unknown';

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');

    return `${year}-${month}`;
  };

  const monthTitleFromKey = (key: string) => {
    if (key === 'unknown') return 'תאריך לא ידוע';

    const [y, m] = key.split('-').map(Number);
    const d = new Date(y, (m ?? 1) - 1, 1);

    return d.toLocaleDateString('he-IL', { month: 'long', year: 'numeric' });
  };

  const sections = useMemo<ExpensesMonthSection[]>(() => {
    const buckets = expenses.reduce<Record<string, ExpenseModel[]>>(
      (acc, ex) => {
        const key = monthKey(ex.createdAt);
        (acc[key] ??= []).push(ex);

        return acc;
      },
      {},
    );

    return Object.entries(buckets)
      .sort((a, b) => b[0].localeCompare(a[0]))
      .map(([key, arr]) => ({
        key,
        title: monthTitleFromKey(key),
        data: arr.sort(
          (a, b) =>
            (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0),
        ),
      }));
  }, [expenses]);

  return {
    sections,
  };
};

export default useExpensesByMonth;
