import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Flag } from 'lucide-react';
import { useFeedback, useCreateFeedback } from '../../hooks/useApi';
import { useForm } from '../../hooks/useForm';
import { feedbackSchema } from '../../lib/validations';
import type { Feedback } from '../../types';

export default function FeedbackList() {
  const { data: feedbackList, isLoading } = useFeedback();
  const createFeedback = useCreateFeedback();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const form = useForm(feedbackSchema);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.validate()) {
      try {
        await createFeedback.mutateAsync(form.data);
        setIsModalOpen(false);
        form.reset();
      } catch (error) {
        console.error('フィードバックの送信に失敗しました:', error);
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">フィードバック</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">チーム間のフィードバックとコミュニケーション</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <MessageSquare className="w-5 h-5 mr-2" />
          フィードバックを送る
        </button>
      </header>

      <div className="space-y-4">
        {feedbackList?.map((feedback) => (
          <div key={feedback.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700" />
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900 dark:text-white">{feedback.from}</span>
                    <span className="text-gray-400 dark:text-gray-500">→</span>
                    <span className="font-medium text-gray-900 dark:text-white">{feedback.to}</span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{feedback.date}</span>
                </div>
              </div>
              <span className={`flex items-center px-3 py-1 rounded-full text-sm ${
                feedback.type === 'ポジティブ'
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                  : feedback.type === '改善点'
                  ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                  : 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
              }`}>
                {feedback.type === 'ポジティブ' && <ThumbsUp className="w-4 h-4 mr-1" />}
                {feedback.type === '改善点' && <Flag className="w-4 h-4 mr-1" />}
                {feedback.type}
              </span>
            </div>
            <p className="text-gray-700 dark:text-gray-300">{feedback.content}</p>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              フィードバックを送る
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  送信先
                </label>
                <input
                  type="text"
                  value={form.data.to}
                  onChange={(e) => form.setValue('to', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  フィードバックの種類
                </label>
                <select
                  value={form.data.type}
                  onChange={(e) => form.setValue('type', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="ポジティブ">ポジティブ</option>
                  <option value="改善点">改善点</option>
                  <option value="目標">目標</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  内容
                </label>
                <textarea
                  value={form.data.content}
                  onChange={(e) => form.setValue('content', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={4}
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
                  送信
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}