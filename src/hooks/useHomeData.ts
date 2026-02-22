import { useEffect, useMemo } from 'react';
import { useExpenses } from '../zustandState/useExpenses';
import { useCategory } from '../zustandState/useCategory';
import { useEnsureSubcatIndex } from './useEnsureSubcatIndex';
import { DEV_HOUSEHOLD_ID, NUM_OF_TRANSACTIONS } from '../config/consts';

export function useHomeData() {
  const subscribeExpenses = useExpenses(state => state.subscribeExpenses);
  const expenses = useExpenses(state => state.expenses);
  const loading = useExpenses(state => state.loading);
  const error = useExpenses(state => state.error);

  const categories = useCategory(state => state.categories);
  const categoryError = useCategory(state => state.error);

  const categoryIds = useMemo(
    () => expenses.map(e => e.categoryId),
    [expenses],
  );

  useEnsureSubcatIndex(categoryIds);

  const lastExpenses = useMemo(
    () => expenses.slice(0, NUM_OF_TRANSACTIONS),
    [expenses],
  );

  useEffect(() => {
    const unsub = subscribeExpenses(DEV_HOUSEHOLD_ID);

    return () => unsub?.();
  }, [subscribeExpenses]);

  return {
    categories,
    expenses: lastExpenses,
    loading,
    error: error ?? categoryError,
  };
}
