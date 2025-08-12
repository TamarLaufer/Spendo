import { categoriesList } from '../mockData/mockData';
import { Expense, ExpensePayload } from '../shared/expense';
import { CategoryType } from '../zustandState/useCategory';
import { API_BASE_URL } from './config';

export const fetchCategories = async (): Promise<CategoryType[]> => {
  return new Promise<CategoryType[]>(resolve => {
    setTimeout(() => resolve(categoriesList), 500);
  });
};

export async function createExpense(expense: ExpensePayload) {
  const res = await fetch(`${API_BASE_URL}/expenses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(expense),
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => '');
    throw new Error(msg || 'Failed to create expense');
  }
  return res.json();
}

export async function getExpenses(): Promise<Expense[]> {
  const res = await fetch(`${API_BASE_URL}/expenses`);
  if (!res.ok)
    throw new Error(await res.text().catch(() => 'Failed to fetch expenses'));
  return res.json();
}
