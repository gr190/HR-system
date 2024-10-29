import React from 'react';
import { CheckCircle, Circle, AlertTriangle, Clock } from 'lucide-react';

interface Milestone {
  id: string;
  title: string;
  dueDate: string;
  status: '完了' | '進行中' | '遅延' | '未着手';
  progress: number;
  dependencies?: string[];
}

interface MilestoneTrackerProps {
  milestones: Milestone[];
  onStatusChange: (id: string, status: Milestone['status']) => void;
}

export default function MilestoneTracker({ milestones, onStatusChange }: MilestoneTrackerProps) {
  const getStatusIcon = (status: Milestone['status']) => {
    switch (status) {
      case '完了':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case '進行中':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case '遅延':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: Milestone['status']) => {
    switch (status) {
      case '完了':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case '進行中':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case '遅延':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-4">
      {milestones.map((milestone) => (
        <div 
          key={milestone.id}
          className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              {getStatusIcon(milestone.status)}
              <div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                  {milestone.title}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  期限: {milestone.dueDate}
                </p>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(milestone.status)}`}>
              {milestone.status}
            </span>
          </div>

          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>進捗状況</span>
              <span>{milestone.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  milestone.status === '遅延'
                    ? 'bg-red-500'
                    : milestone.status === '完了'
                    ? 'bg-green-500'
                    : 'bg-blue-500'
                }`}
                style={{ width: `${milestone.progress}%` }}
              />
            </div>
          </div>

          {milestone.dependencies && milestone.dependencies.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">依存関係:</p>
              <div className="flex flex-wrap gap-2">
                {milestone.dependencies.map((dep) => (
                  <span
                    key={dep}
                    className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded-md"
                  >
                    {dep}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}