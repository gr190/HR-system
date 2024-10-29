import React, { useState } from 'react';
import { Bell, X, CheckCircle, AlertTriangle, Clock, Settings, Trash2 } from 'lucide-react';
import { useNotifications } from '../../hooks/useNotifications';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import NotificationSettings from './NotificationSettings';

export default function NotificationBell() {
  const {
    notifications,
    markAsRead,
    removeNotification,
    markAllAsRead,
    removeMultiple,
    filterNotifications,
  } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);
  const [filterType, setFilterType] = useState<string | undefined>();
  const [filterPriority, setFilterPriority] = useState<string | undefined>();

  const unreadCount = notifications.filter(n => !n.read).length;
  const highPriorityCount = notifications.filter(n => !n.read && n.priority === 'high').length;

  const filteredNotifications = filterNotifications(filterType, filterPriority);

  const handleBulkAction = (action: 'read' | 'delete') => {
    if (action === 'read') {
      markAllAsRead();
    } else {
      removeMultiple(selectedNotifications);
    }
    setSelectedNotifications([]);
  };

  const getNotificationIcon = (type: string, priority: string) => {
    if (priority === 'high') return <AlertTriangle className="w-5 h-5 text-red-500" />;
    if (type === 'deadline') return <Clock className="w-5 h-5 text-orange-500" />;
    if (type === 'progress') return <CheckCircle className="w-5 h-5 text-blue-500" />;
    return <Bell className="w-5 h-5 text-gray-500" />;
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <Bell className="w-6 h-6 text-gray-600 dark:text-gray-400" />
        {unreadCount > 0 && (
          <span className={`absolute top-0 right-0 w-5 h-5 ${
            highPriorityCount > 0 ? 'bg-red-500' : 'bg-blue-500'
          } text-white text-xs rounded-full flex items-center justify-center`}>
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h3 className="font-medium">通知</h3>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center space-x-2">
              {selectedNotifications.length > 0 && (
                <>
                  <button
                    onClick={() => handleBulkAction('read')}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-blue-500"
                  >
                    <CheckCircle className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleBulkAction('delete')}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {showSettings ? (
            <NotificationSettings />
          ) : (
            <>
              <div className="p-2 border-b border-gray-200 dark:border-gray-700 flex space-x-2">
                <select
                  value={filterType || ''}
                  onChange={(e) => setFilterType(e.target.value || undefined)}
                  className="text-sm rounded-md border-gray-300"
                >
                  <option value="">全てのタイプ</option>
                  <option value="deadline">期限</option>
                  <option value="progress">進捗</option>
                  <option value="feedback">フィードバック</option>
                </select>
                <select
                  value={filterPriority || ''}
                  onChange={(e) => setFilterPriority(e.target.value || undefined)}
                  className="text-sm rounded-md border-gray-300"
                >
                  <option value="">全ての優先度</option>
                  <option value="high">高</option>
                  <option value="medium">中</option>
                  <option value="low">低</option>
                </select>
              </div>

              <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
                {filteredNotifications.length === 0 ? (
                  <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                    通知はありません
                  </div>
                ) : (
                  filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-gray-200 dark:border-gray-700 ${
                        !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                      } ${
                        notification.priority === 'high' ? 'border-l-4 border-l-red-500' : ''
                      }`}
                    >
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          checked={selectedNotifications.includes(notification.id)}
                          onChange={(e) => {
                            setSelectedNotifications(prev =>
                              e.target.checked
                                ? [...prev, notification.id]
                                : prev.filter(id => id !== notification.id)
                            );
                          }}
                          className="mt-1 mr-2"
                        />
                        <div className="flex-shrink-0">
                          {getNotificationIcon(notification.type, notification.priority)}
                        </div>
                        <div className="ml-3 flex-1">
                          <p className="font-medium text-gray-900 dark:text-white">
                            {notification.title}
                          </p>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {notification.message}
                          </p>
                          {notification.sender && (
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                              送信者: {notification.sender}
                            </p>
                          )}
                          <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                            {format(notification.timestamp, 'M月d日 HH:mm', { locale: ja })}
                          </p>
                        </div>
                        <div className="ml-2 flex flex-col space-y-1">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-blue-500"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => removeNotification(notification.id)}
                            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-red-500"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}