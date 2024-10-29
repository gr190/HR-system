import React, { useState } from 'react';
import { Plus, Save, Download } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useCreateEvaluation } from '../../hooks/useApi';
import { useForm } from '../../hooks/useForm';
import { evaluationSchema } from '../../lib/validations';
import DraggableEvaluationCriteria from './DraggableEvaluationCriteria';
import { useNotifications } from '../../hooks/useNotifications';
import type { EvaluationTemplate } from '../../types';

export default function EvaluationForm() {
  const createEvaluation = useCreateEvaluation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addNotification } = useNotifications();
  const form = useForm(evaluationSchema);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const addCriteria = () => {
    const newCriteria = [
      ...(form.data.criteria || []),
      { id: crypto.randomUUID(), category: '', description: '', weight: 0 }
    ];
    form.setValue('criteria', newCriteria);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      const oldIndex = form.data.criteria?.findIndex(item => item.id === active.id);
      const newIndex = form.data.criteria?.findIndex(item => item.id === over.id);
      
      if (oldIndex !== undefined && newIndex !== undefined) {
        const newCriteria = arrayMove(form.data.criteria || [], oldIndex, newIndex);
        form.setValue('criteria', newCriteria);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.validate()) {
      try {
        setIsSubmitting(true);
        await createEvaluation.mutateAsync(form.data);
        addNotification({
          title: '評価シートを作成しました',
          message: '新しい評価シートが正常に作成されました',
          type: 'success'
        });
        form.reset();
      } catch (error) {
        addNotification({
          title: 'エラー',
          message: '評価シートの作成に失敗しました',
          type: 'error'
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleExport = () => {
    const csvContent = [
      ['カテゴリ', '説明', '重み'],
      ...(form.data.criteria || []).map(c => [c.category, c.description, c.weight.toString()]),
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${form.data.title || '評価シート'}.csv`;
    link.click();

    addNotification({
      title: 'エクスポート完了',
      message: '評価シートをCSVファイルとしてダウンロードしました',
      type: 'success'
    });
  };

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">評価シート作成</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">新しい評価テンプレートを作成します</p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
            disabled={!form.data.criteria?.length}
          >
            <Download className="w-5 h-5 mr-2" />
            CSVエクスポート
          </button>
          <button
            type="submit"
            form="evaluation-form"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center disabled:opacity-50"
          >
            <Save className="w-5 h-5 mr-2" />
            {isSubmitting ? '保存中...' : '保存'}
          </button>
        </div>
      </header>

      <form id="evaluation-form" onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                テンプレート名
              </label>
              <input
                type="text"
                value={form.data.title || ''}
                onChange={(e) => form.setValue('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="例: 2024年度上期評価"
              />
              {form.errors.title && (
                <p className="mt-1 text-sm text-red-600">{form.errors.title}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                評価タイプ
              </label>
              <select
                value={form.data.type || ''}
                onChange={(e) => form.setValue('type', e.target.value as EvaluationTemplate['type'])}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">選択してください</option>
                <option value="目標管理">目標管理</option>
                <option value="OKR">OKR</option>
                <option value="360度評価">360度評価</option>
              </select>
              {form.errors.type && (
                <p className="mt-1 text-sm text-red-600">{form.errors.type}</p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">評価項目</h3>
              <button
                type="button"
                onClick={addCriteria}
                className="flex items-center px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-1" />
                項目を追加
              </button>
            </div>

            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={form.data.criteria || []}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-3">
                  {form.data.criteria?.map((criteria) => (
                    <DraggableEvaluationCriteria
                      key={criteria.id}
                      {...criteria}
                      onUpdate={(id, field, value) => {
                        const newCriteria = form.data.criteria?.map(c =>
                          c.id === id ? { ...c, [field]: value } : c
                        );
                        form.setValue('criteria', newCriteria);
                      }}
                      onDelete={(id) => {
                        const newCriteria = form.data.criteria?.filter(c => c.id !== id);
                        form.setValue('criteria', newCriteria);
                      }}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>

            {form.errors.criteria && (
              <p className="mt-1 text-sm text-red-600">{form.errors.criteria}</p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}