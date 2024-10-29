import React from 'react';
import { Users, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import PerformanceChart from './analytics/PerformanceChart';
import EvaluationHistory from './analytics/EvaluationHistory';
import FeedbackAnalytics from './feedback/FeedbackAnalytics';

const performanceData = [
  { date: '2023 Q1', 評価スコア: 85, 目標達成率: 78 },
  { date: '2023 Q2', 評価スコア: 88, 目標達成率: 82 },
  { date: '2023 Q3', 評価スコア: 92, 目標達成率: 88 },
  { date: '2023 Q4', 評価スコア: 90, 目標達成率: 85 },
  { date: '2024 Q1', 評価スコア: 94, 目標達成率: 91 },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">ダッシュボード</h1>
        <p className="mt-2 text-sm md:text-base text-gray-600 dark:text-gray-400">ようこそ、管理者様</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard
          title="社員数"
          value="1,234"
          icon={<Users className="w-5 h-5 md:w-6 md:h-6" />}
          trend="+5.2%"
          color="blue"
        />
        <StatCard
          title="評価完了"
          value="845"
          icon={<CheckCircle className="w-5 h-5 md:w-6 md:h-6" />}
          trend="+12.3%"
          color="green"
        />
        <StatCard
          title="評価待ち"
          value="89"
          icon={<Clock className="w-5 h-5 md:w-6 md:h-6" />}
          trend="-2.4%"
          color="yellow"
        />
        <StatCard
          title="期限超過"
          value="23"
          icon={<AlertTriangle className="w-5 h-5 md:w-6 md:h-6" />}
          trend="+8.1%"
          color="red"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">パフォーマンス推移</h2>
          <PerformanceChart data={performanceData} />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">評価履歴</h2>
          <EvaluationHistory employeeId="1" />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">フィードバック分析</h2>
        <FeedbackAnalytics />
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  color: 'blue' | 'green' | 'yellow' | 'red';
}

function StatCard({ title, value, icon, trend, color }: StatCardProps) {
  const colors = {
    blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
    green: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400',
    yellow: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400',
    red: 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 md:p-6">
      <div className="flex items-center justify-between">
        <span className={`p-2 rounded-lg ${colors[color]}`}>{icon}</span>
        <span className="text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400">{trend}</span>
      </div>
      <h3 className="mt-3 md:mt-4 text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">{value}</h3>
      <p className="mt-1 text-sm md:text-base text-gray-600 dark:text-gray-400">{title}</p>
    </div>
  );
}