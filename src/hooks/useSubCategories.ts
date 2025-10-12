import { useEffect, useState } from 'react';
import { subscribeSubCategoriesForCategory } from '../firebase/services/categories';
import type { SubCategory } from '../shared/categoryType';

export function useSubCategories(categoryId: string) {
  const [rows, setRows] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const unsub = subscribeSubCategoriesForCategory(
      categoryId,
      live => {
        setRows(
          live.map(x => ({
            id: x.id,
            categoryId,
            name: x.subCategoryName,
            icon: x.icon ?? null,
            // אם יש לך order/active/createdAt/updatedAt במיפוי – הוסיפי כאן
          })),
        );
        setLoading(false);
      },
      e => {
        setError(e.message);
        setLoading(false);
      },
    );
    return () => unsub();
  }, [categoryId]);

  return { rows, loading, error };
}
