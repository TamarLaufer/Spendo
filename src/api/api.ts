import { categoriesList } from '../mockData/mockData';
import { ExpensePayload } from '../shared/expense';
import { CategoryType } from '../zustandState/useCategory';

export const fetchCategories = async (): Promise<CategoryType[]> => {
  return new Promise<CategoryType[]>(resolve => {
    setTimeout(() => resolve(categoriesList), 500);
  });
};

export async function createExpense(expense: ExpensePayload) {
  const res = await fetch('http://localhost:4000/expenses', {
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
