import { useMemo } from 'react';

interface UseExportProps<T> {
  data: T[];
  fields: (keyof T)[];
  labels?: Record<keyof T, string>;
}

export function useExport<T>({ data, fields, labels = {} }: UseExportProps<T>) {
  const headers = useMemo(() => 
    fields.map(field => ({
      label: labels[field] || String(field),
      key: String(field),
    })),
    [fields, labels]
  );

  const exportData = useMemo(() => 
    data.map(item => {
      const exportItem: Record<string, any> = {};
      fields.forEach(field => {
        exportItem[String(field)] = item[field];
      });
      return exportItem;
    }),
    [data, fields]
  );

  return {
    headers,
    exportData,
  };
}