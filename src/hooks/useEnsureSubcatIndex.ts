import { useEffect, useMemo, useRef } from 'react';
import { fetchSubCategoriesForCategory } from '../firebase/services/categoriesService';
import { useSubcatIndex } from '../zustandState/useSubCategoriesIndex';
import type { SubCategoryType } from '../shared/categoryType';

function uniqSorted(ids: string[]) {
  return Array.from(new Set(ids.filter(Boolean))).sort();
}

export function useEnsureSubcatIndex(categoryIds: string[]) {
  const putMany = useSubcatIndex(state => state.putMany);
  const loadedRef = useRef<Set<string>>(new Set());
  const ids = useMemo(() => uniqSorted(categoryIds), [categoryIds]);

  useEffect(() => {
    ids.forEach(categoryId => {
      if (loadedRef.current.has(categoryId)) return;

      loadedRef.current.add(categoryId);

      (async () => {
        try {
          const rows = await fetchSubCategoriesForCategory(categoryId);
          const subs: SubCategoryType[] = rows.map(row => ({
            id: row.id,
            categoryId,
            name: row.subCategoryName,
            icon: row.icon ?? null,
            order: row.order,
            active: row.active,
          }));
          putMany(categoryId, subs);
        } catch (e) {
          console.warn('[useEnsureSubcatIndex] fetch error', categoryId, e);
        }
      })();
    });
  }, [ids, putMany]);
}
