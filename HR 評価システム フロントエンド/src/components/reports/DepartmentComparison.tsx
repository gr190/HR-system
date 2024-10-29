import React from 'react';
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  ResponsiveContainer,
  Legend
} from 'recharts';

interface DepartmentComparisonProps {
  data: {
    category: string;
    営業部: number;
    開発部: number;
    人事部: number;
    マーケティング部: number;
  }[];
}

export default function DepartmentComparison({ data }: DepartmentComparisonProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-medium mb-4">部門別パフォーマンス比較</h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="category" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar
              name="営業部"
              dataKey="営業部"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.6}
            />
            <Radar
              name="開発部"
              dataKey="開発部"
              stroke="#22c55e"
              fill="#22c55e"
              fillOpacity={0.6}
            />
            <Radar
              name="人事部"
              dataKey="人事部"
              stroke="#f59e0b"
              fill="#f59e0b"
              fillOpacity={0.6}
            />
            <Radar
              name="マーケティング部"
              dataKey="マーケティング部"
              stroke="#8b5cf6"
              fill="#8b5cf6"
              fillOpacity={0.6}
            />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}