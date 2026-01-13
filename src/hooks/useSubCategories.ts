import { useEffect, useState } from 'react';
import { subscribeSubCategoriesForCategory } from '../firebase/services/categoriesService';
import type { SubCategory } from '../shared/categoryType';
import { useSubcatIndex } from '../zustandState/useSubCategoriesIndex';

export function useSubCategories(categoryId: string) {
  const [rows, setRows] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const putMany = useSubcatIndex(state => state.putMany);
  const removeCategory = useSubcatIndex(state => state.removeCategory);

  useEffect(() => {
    if (!categoryId) return;
    setLoading(true);
    const unsub = subscribeSubCategoriesForCategory(
      categoryId,
      live => {
        const mapped = live.map(x => ({
          id: x.id,
          categoryId,
          name: x.subCategoryName,
          icon: x.icon ?? null,
        }));

        setLoading(false);
        setRows(mapped);
        putMany(categoryId, mapped);
      },
      e => {
        setError(e.message);
        setLoading(false);
      },
    );

    return () => {
      unsub();
      removeCategory(categoryId);
    };
  }, [categoryId, putMany, removeCategory]);

  return { rows, loading, error };
}
