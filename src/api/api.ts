import {
  addExpense,
  fetchExpenses,
  subscribeToExpenses,
} from '../firebase/services/expenses';

import type { CategoryType } from '../shared/categoryType';
import { fetchCategoriesForHousehold } from '../firebase/services/categories';
import { ExpenseCreateInput, ExpenseRecord } from '../shared/expense';
import { DEV_HOUSEHOLD_ID } from '../config/consts';

export async function fetchCategories(): Promise<CategoryType[]> {
  const householdId = 'HOUSEHOLD_SHARED_ID'; // temporary for now
  return await fetchCategoriesForHousehold(householdId);
}

export async function getExpenses(
  householdId: string,
): Promise<ExpenseRecord[]> {
  return fetchExpenses(householdId);
}

export async function createExpense(
  input: ExpenseCreateInput,
): Promise<ExpenseRecord> {
  // returns the id of the created document
  return addExpense({ ...input, householdId: DEV_HOUSEHOLD_ID });
}

export function watchExpenses(
  householdId: string,
  onChange: (rows: ExpenseRecord[]) => void,
  onError?: (e: Error) => void,
) {
  // subscribe to realtime, returns a canceling
  return subscribeToExpenses(householdId, onChange, onError);
}
