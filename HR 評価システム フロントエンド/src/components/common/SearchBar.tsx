import React from 'react';
import { Search, Save, History } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSaveSearch?: () => void;
  onLoadSearch?: (id: string) => void;
  savedSearches?: { id: string; name: string }[];
  className?: string;
}

export default function SearchBar({
  value,
  onChange,
  onSaveSearch,
  onLoadSearch,
  savedSearches = [],
  className = '',
}: SearchBarProps) {
  const [showSavedSearches, setShowSavedSearches] = React.useState(false);

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="検索..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg"
          />
        </div>

        {onSaveSearch && (
          <button
            onClick={onSaveSearch}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            title="検索条件を保存"
          >
            <Save className="w-5 h-5" />
          </button>
        )}

        {savedSearches.length > 0 && (
          <div className="relative">
            <button
              onClick={() => setShowSavedSearches(!showSavedSearches)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              title="保存済み検索"
            >
              <History className="w-5 h-5" />
            </button>

            {showSavedSearches && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-10">
                {savedSearches.map((search) => (
                  <button
                    key={search.id}
                    onClick={() => {
                      onLoadSearch?.(search.id);
                      setShowSavedSearches(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {search.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}