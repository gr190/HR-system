import React, { useState } from 'react';
import { Plus, Download } from 'lucide-react';
import { useObjectives } from '../../hooks/useApi';
import DraggableList from '../common/DraggableList';
import DraggableObjective from './DraggableObjective';
import ExportButton from '../common/ExportButton';
import { useNotifications } from '../../hooks/useNotifications';

export default function ObjectiveList() {
  const { data: objectives, isLoading } = useObjectives();
  const { addNotification } = useNotifications();
  const [localObjectives, setLocalObjectives] = useState(objectives || []);

  const handleReorder = (newObjectives: any[]) => {
    setLocalObjectives(newObjectives);
    addNotification({
      title: '目標の順序を更新しました',
      message: '新しい優先順位が保存されました',
      type: 'info'
    });
  };

  const handlePriorityChange = (id: string, change: number) => {
    const newObjectives = [...localObjectives];
    const index = newObjectives.findIndex(o => o.id === id);
    if (index === -1) return;

    const newPriority = newObjectives[index].priority + change;
    if (newPriority < 1 || newPriority > localObjectives.length) return;

    newObjectives[index] = { ...newObjectives[index], priority: newPriority };
    setLocalObjectives(newObjectives.sort((a, b) => a.priority - b.priority));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const exportHeaders = [
    { label: 'タイトル', key: 'title' },
    { label: '説明', key: 'description' },
    { label: '進捗', key: 'progress' },
    { label: '状態', key: 'status' },
    { label: '期限', key: 'dueDate' },
    { label: '優先度', key: 'priority' },
  ];

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">目標管理</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            目標の設定と進捗管理を行います
          </p>
        </div>
        <div className="flex space-x-4">
          <ExportButton
            data={localObjectives}
            headers={exportHeaders}
            filename="objectives.csv"
          />
          <button
            onClick={() => {
              const newObjective = {
                id: crypto.randomUUID(),
                title: '',
                description: '',
                progress: 0,
                status: 'pending',
                dueDate: new Date().toISOString().split('T')[0],
                priority: localObjectives.length + 1,
              };
              setLocalObjectives([...localObjectives, newObjective]);
            }}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            目標を追加
          </button>
        </div>
      </header>

      <DraggableList
        items={localObjectives}
        onReorder={handleReorder}
        renderItem={(objective) => (
          <DraggableObjective
            key={objective.id}
            {...objective}
            onPriorityChange={handlePriorityChange}
          />
        )}
        className="space-y-4"
      />

      {localObjectives.length === 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          目標が設定されていません。「目標を追加」ボタンをクリックして始めましょう。
        </div>
      )}
    </div>
  );
}