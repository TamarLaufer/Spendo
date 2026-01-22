import { useCategory } from '../zustandState/useCategory';

const useCategoryById = (categoryId: string) => {
  const categoryById = useCategory(state =>
    state.categories.find(category => category.id === categoryId),
  );

  return categoryById;
};

export default useCategoryById;
