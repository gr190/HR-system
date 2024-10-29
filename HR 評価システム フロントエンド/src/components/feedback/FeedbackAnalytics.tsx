import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MessageSquare, TrendingUp, Users } from 'lucide-react';

interface FeedbackAnalyticsProps {
  departmentId?: string;
}

export default function FeedbackAnalytics({ departmentId }: FeedbackAnalyticsProps) {
  const mockData = [
    { month: '1月', ポジティブ: 24, 改善点: 12, 目標: 8 },
    { month: '2月', ポジティブ: 28, 改善点: 15, 目標: 10 },
    { month: '3月', ポジティブ: 32, 改善点: 18, 目標: 12 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
          <div className="flex items-center space-x-3">
            <MessageSquare className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-medium">総フィードバック数</h3>
          </div>
          <p className="mt-2 text-3xl font-bold text-blue-600 dark:text-blue-400">159</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">前月比 +12%</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <h3 className="text-lg font-medium">ポジティブ率</h3>
          </div>
          <p className="mt-2 text-3xl font-bold text-green-600 dark:text-green-400">68%</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">前月比 +5%</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
          <div className="flex items-center space-x-3">
            <Users className="w-5 h-5 text-purple-500" />
            <h3 className="text-lg font-medium">参加率</h3>
          </div>
          <p className="mt-2 text-3xl font-bold text-purple-600 dark:text-purple-400">85%</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">目標: 90%</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-medium mb-4">フィードバック傾向分析</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="ポジティブ" fill="#22c55e" />
              <Bar dataKey="改善点" fill="#f59e0b" />
              <Bar dataKey="目標" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-medium mb-4">トップフィードバックカテゴリ</h3>
          <div className="space-y-4">
            {[
              { category: 'コミュニケーション', count: 45, percentage: 28 },
              { category: 'リーダーシップ', count: 38, percentage: 24 },
              { category: '技術スキル', count: 32, percentage: 20 },
            ].map((item) => (
              <div key={item.category}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{item.category}</span>
                  <span>{item.count}件</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-medium mb-4">改善推奨事項</h3>
          <div className="space-y-4">
            {[
              { title: 'フィードバック頻度の向上', description: '週1回以上のフィードバック推奨' },
              { title: '具体的な行動の言及', description: '具体例を含めたフィードバックの促進' },
              { title: 'フォローアップの強化', description: '改善点の進捗確認の定期化' },
            ].map((item) => (
              <div key={item.title} className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-medium text-gray-900 dark:text-white">{item.title}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}