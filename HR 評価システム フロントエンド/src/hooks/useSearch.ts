import { useState, useMemo } from 'react';
import { useDebounce } from './useDebounce';

interface UseSearchProps<T> {
  items: T[];
  searchFields: (keyof T)[];
  initialFilters?: Partial<Record<keyof T, any>>;
}

export function useSearch<T>({
  items,
  searchFields,
  initialFilters = {},
}: UseSearchProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState(initialFilters);
  const [savedSearches, setSavedSearches] = useState<
    { id: string; name: string; filters: typeof filters }[]
  >([]);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // 検索語句によるフィルタリング
      const matchesSearch = debouncedSearchTerm
        ? searchFields.some((field) => {
            const value = item[field];
            return value?.toString().toLowerCase().includes(debouncedSearchTerm.toLowerCase());
          })
        : true;

      // フィルター条件によるフィルタリング
      const matchesFilters = Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        return item[key as keyof T] === value;
      });

      return matchesSearch && matchesFilters;
    });
  }, [items, debouncedSearchTerm, filters, searchFields]);

  const saveSearch = (name: string) => {
    setSavedSearches((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name,
        filters: { ...filters },
      },
    ]);
  };

  const loadSavedSearch = (id: string) => {
    const savedSearch = savedSearches.find((search) => search.id === id);
    if (savedSearch) {
      setFilters(savedSearch.filters);
    }
  };

  return {
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    filteredItems,
    savedSearches,
    saveSearch,
    loadSavedSearch,
  };
}