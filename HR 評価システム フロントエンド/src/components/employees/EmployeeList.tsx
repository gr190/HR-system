import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2 } from 'lucide-react';
import { useEmployees, useCreateEmployee } from '../../hooks/useApi';
import { useForm } from '../../hooks/useForm';
import { employeeSchema } from '../../lib/validations';
import DataTable from '../common/DataTable';
import type { User } from '../../types';

export default function EmployeeList() {
  const { data: employees, isLoading } = useEmployees();
  const createEmployee = useCreateEmployee();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const form = useForm(employeeSchema);

  const columns = [
    { key: 'name', label: '社員名', sortable: true },
    { key: 'email', label: 'メール', sortable: true },
    { key: 'department', label: '部署', sortable: true },
    { key: 'position', label: '役職', sortable: true },
    { key: 'role', label: '権限', sortable: true },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.validate()) {
      try {
        await createEmployee.mutateAsync(form.data);
        setIsModalOpen(false);
        form.reset();
      } catch (error) {
        console.error('社員の作成に失敗しました:', error);
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">社員一覧</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">社員情報の管理と編集</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          社員を追加
        </button>
      </header>

      <DataTable
        columns={columns}
        data={employees || []}
        searchable={true}
        exportable={true}
      />

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">社員を追加</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  名前
                </label>
                <input
                  type="text"
                  value={form.data.name || ''}
                  onChange={(e) => form.setValue('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  メール
                </label>
                <input
                  type="email"
                  value={form.data.email || ''}
                  onChange={(e) => form.setValue('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  部署
                </label>
                <select
                  value={form.data.department || ''}
                  onChange={(e) => form.setValue('department', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">選択してください</option>
                  <option value="営業部">営業部</option>
                  <option value="開発部">開発部</option>
                  <option value="人事部">人事部</option>
                  <option value="マーケティング部">マーケティング部</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  役職
                </label>
                <input
                  type="text"
                  value={form.data.position || ''}
                  onChange={(e) => form.setValue('position', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  権限
                </label>
                <select
                  value={form.data.role || ''}
                  onChange={(e) => form.setValue('role', e.target.value as User['role'])}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">選択してください</option>
                  <option value="管理者">管理者</option>
                  <option value="評価者">評価者</option>
                  <option value="一般社員">一般社員</option>
                </select>
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