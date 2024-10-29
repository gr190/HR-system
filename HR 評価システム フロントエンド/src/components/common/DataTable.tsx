import React, { useState } from 'react';
import { ArrowUpDown, Download, Filter, Search } from 'lucide-react';
import { CSVLink } from 'react-csv';

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  searchable?: boolean;
  exportable?: boolean;
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
}

export default function DataTable({ columns, data, searchable = true, exportable = true, onSort }: DataTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig?.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    onSort?.(key, direction);
  };

  const filteredData = data.filter(item => {
    const matchesSearch = Object.values(item).some(
      value => value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesFilters = Object.entries(selectedFilters).every(
      ([key, value]) => !value || item[key]?.toString() === value
    );
    return matchesSearch && matchesFilters;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {searchable && (
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg"
            />
          </div>
        )}
        
        {exportable && (
          <CSVLink
            data={filteredData}
            filename="export.csv"
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <Download className="w-5 h-5 mr-2" />
            CSVエクスポート
          </CSVLink>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  <div className="flex items-center space-x-2">
                    <span>{column.label}</span>
                    {column.sortable && (
                      <button
                        onClick={() => handleSort(column.key)}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                      >
                        <ArrowUpDown className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => {
                        const uniqueValues = [...new Set(data.map(item => item[column.key]))];
                        // フィルターの実装
                      }}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                    >
                      <Filter className="w-4 h-4" />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredData.map((row, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}