import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, TrendingUp, Award } from 'lucide-react';

interface EvaluationHistoryProps {
  employeeId: string;
}

export default function EvaluationHistory({ employeeId }: EvaluationHistoryProps) {
  const mockData = [
    { date: '2023 Q1', score: 85, average: 82 },
    { date: '2023 Q2', score: 88, average: 83 },
    { date: '2023 Q3', score: 92, average: 84 },
    { date: '2023 Q4', score: 90, average: 85 },
    { date: '2024 Q1', score: 94, average: 86 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
          <div className="flex items-center space-x-3">
            <Award className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-medium">最新評価スコア</h3>
          </div>
          <p className="mt-2 text-3xl font-bold text-blue-600 dark:text-blue-400">94</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">前回比 +4%</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <h3 className="text-lg font-medium">平均スコア</h3>
          </div>
          <p className="mt-2 text-3xl font-bold text-green-600 dark:text-green-400">89.8</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">過去5回の平均</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-purple-500" />
            <h3 className="text-lg font-medium">次回評価予定</h3>
          </div>
          <p className="mt-2 text-xl font-semibold text-purple-600 dark:text-purple-400">2024年6月末</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">残り45日</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-medium mb-4">評価スコア推移</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[60, 100]} />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="score" 
                name="個人スコア"
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="average" 
                name="部門平均"
                stroke="#22c55e" 
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}