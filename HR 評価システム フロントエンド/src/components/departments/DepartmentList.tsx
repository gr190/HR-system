import React, { useState } from 'react';
import { Plus, Users, Edit2, Trash2 } from 'lucide-react';
import { useDepartments, useCreateDepartment } from '../../hooks/useApi';
import { useForm } from '../../hooks/useForm';
import type { Department } from '../../types';

export default function DepartmentList() {
  const { data: departments, isLoading } = useDepartments();
  const createDepartment = useCreateDepartment();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const form = useForm({
    name: '',
    manager: '',
    description: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.validate()) {
      try {
        await createDepartment.mutateAsync(form.data);
        setIsModalOpen(false);
        form.reset();
      } catch (error) {
        console.error('部署の作成に失敗しました:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">部署管理</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">部署情報の管理と編集</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          部署を追加
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments?.map((dept) => (
          <div key={dept.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{dept.name}</h3>
              <div className="flex space-x-2">
                <button className="p-1 hover:text-blue-600 dark:hover:text-blue-400">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button className="p-1 hover:text-red-600 dark:hover:text-red-400">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Users className="w-5 h-5 mr-2" />
                <span>{dept.employeeCount || 0}名</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-500 dark:text-gray-400">部署長：</span>
                <span className="text-gray-900 dark:text-white">{dept.manager}</span>
              </div>
              {dept.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400">{dept.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">部署を追加</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  部署名
                </label>
                <input
                  type="text"
                  value={form.data.name}
                  onChange={(e) => form.setValue('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  部署長
                </label>
                <input
                  type="text"
                  value={form.data.manager}
                  onChange={(e) => form.setValue('manager', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  説明
                </label>
                <textarea
                  value={form.data.description}
                  onChange={(e) => form.setValue('description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={3}
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  保存
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}