import { useState } from 'react';
import { CategoryType } from '../shared/categoryType';
import useDebounce from './useDebounce';
import { SortConfig } from '../shared/categoryType';

export const useSortAndFilter = (
  setSortConfig: (config: SortConfig<CategoryType> | undefined) => void,
  setFilters: (filter: ((item: CategoryType) => boolean) | undefined) => void,
  sortConfig?: SortConfig<CategoryType>,
  filters?: (item: CategoryType) => boolean
) => {
  const [textSearch, setTextSearch] = useState('');
  const debouncedSearch = useDebounce(textSearch, 500);

  const handleSortPress = () => {
    if (!sortConfig || typeof sortConfig === 'function') {
      setSortConfig({ key: 'name', direction: 'asc' });
    } else if (sortConfig.key === 'name' && sortConfig.direction === 'asc') {
      setSortConfig({ key: 'name', direction: 'desc' });
    } else if (sortConfig.key === 'name') {
      setSortConfig({ key: 'maxAmount', direction: 'asc' });
    } else if (sortConfig.direction === 'asc') {
      setSortConfig({ key: 'maxAmount', direction: 'desc' });
    } else {
      setSortConfig(undefined);
    }
  };

  const handleFilterPress = () => {
    setFilters(filters ? undefined : item => item.isExceed);
  };

  const sortLabel = (() => {
    if (!sortConfig || typeof sortConfig === 'function') return 'מיון';
    const keyLabel = sortConfig.key === 'name' ? 'שם' : 'תקציב';
    const directionLabel = sortConfig.direction === 'asc' ? '↓' : '↑' ;
    return `מיון: ${keyLabel} ${directionLabel}`;
  })();

  const filterLabel = filters ? 'סינון: פעיל' : 'סינון';

  return {
    textSearch,
    setTextSearch,
    debouncedSearch,
    handleSortPress,
    handleFilterPress,
    sortLabel,
    filterLabel,
  };
};
