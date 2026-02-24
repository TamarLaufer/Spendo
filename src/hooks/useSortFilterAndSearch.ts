import { useState } from 'react';
import useDebounce from './useDebounce';
import { SortConfig } from '../shared/categoryType';

export const useSortFilterAndSearch = <T>() => {
  const [textSearch, setTextSearch] = useState('');
  const debouncedSearch = useDebounce(textSearch, 500);

  const [sortConfig, setSortConfig] = useState<SortConfig<T> | undefined>();
  const [filters, setFilters] = useState<((item: T) => boolean) | undefined>();

  return {
    textSearch,
    setTextSearch,
    debouncedSearch,
    sortConfig,
    setSortConfig,
    filters,
    setFilters,
  };
};
