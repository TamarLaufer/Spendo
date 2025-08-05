import { categoriesList } from '../mockData/mockData';
import { CategoryType } from '../zustandState/useCategory';

export const fetchCategories = async (): Promise<CategoryType[]> => {
  return new Promise<CategoryType[]>(resolve => {
    setTimeout(() => resolve(categoriesList), 500);
  });
};
