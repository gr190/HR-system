import React from 'react';
import { Download } from 'lucide-react';
import { CSVLink } from 'react-csv';

interface ExportButtonProps {
  data: any[];
  headers?: { label: string; key: string }[];
  filename?: string;
  className?: string;
}

export default function ExportButton({
  data,
  headers,
  filename = 'export.csv',
  className = '',
}: ExportButtonProps) {
  return (
    <CSVLink
      data={data}
      headers={headers}
      filename={filename}
      className={`inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 ${className}`}
    >
      <Download className="w-5 h-5 mr-2" />
      CSVエクスポート
    </CSVLink>
  );
}