import {
  addExpense,
  getExpensesOnce,
  subscribeToExpenses,
} from '../firebase/services/expenses';

import type { Expense, NewExpenseInput } from '../firebase/services/expenses';

export async function getExpenses(householdId: string): Promise<Expense[]> {
  return getExpensesOnce(householdId);
}

export async function createExpense(input: NewExpenseInput): Promise<string> {
  // returns the id of the created document
  return addExpense(input);
}

export function watchExpenses(
  householdId: string,
  onChange: (rows: Expense[]) => void,
  onError?: (e: Error) => void,
) {
  // subscribe to real time, returns a canceling
  return subscribeToExpenses(householdId, onChange, onError);
}
