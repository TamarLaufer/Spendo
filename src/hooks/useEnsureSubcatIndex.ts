import { useEffect, useMemo, useRef } from 'react';
import { subscribeSubCategoriesForCategory } from '../firebase/services/categories';
import { useSubcatIndex } from '../zustandState/useSubCategoriesIndex';
import type { SubCategory } from '../shared/categoryType';

function uniqSorted(ids: string[]) {
  return Array.from(new Set(ids.filter(x => x != null && x !== ''))).sort();
}

export function useEnsureSubcatIndex(categoryIds: string[]) {
  const putMany = useSubcatIndex(state => state.putMany);
  const removeCategory = useSubcatIndex(state => state.removeCategory);
  const subsRef = useRef<Record<string, () => void>>({});

  const ids = useMemo(() => uniqSorted(categoryIds), [categoryIds]);
  const idsKey = useMemo(() => ids.join('|'), [ids]);

  useEffect(() => {
    const current = new Set(Object.keys(subsRef.current));
    const next = new Set(ids);
    const toAdd = ids.filter(id => !current.has(id));
    const toRemove = [...current].filter(id => !next.has(id));

    toAdd.forEach(catId => {
      const unsub = subscribeSubCategoriesForCategory(
        catId,
        rows => {
          const subs: SubCategory[] = rows.map(r => ({
            id: r.id,
            categoryId: catId,
            name: r.subCategoryName,
            icon: r.icon ?? null,
            order: r.order,
            active: r.active,
          }));
          putMany(catId, subs);
        },
        e => console.warn('[useEnsureSubcatIndex] error', catId, e),
      );
      subsRef.current[catId] = unsub;
    });

    toRemove.forEach(catId => {
      subsRef.current[catId]?.();
      delete subsRef.current[catId];
      removeCategory(catId);
    });

    return () => {
      Object.values(subsRef.current).forEach(unsub => unsub());
      subsRef.current = {};
    };
  }, [ids, idsKey, putMany, removeCategory]);
}
