import React from 'react';
import { Bell, Clock, MessageSquare, Mail } from 'lucide-react';
import { useNotifications } from '../../hooks/useNotifications';

export default function NotificationSettings() {
  const { settings, updateSettings } = useNotifications();

  const handleToggle = (key: string) => {
    updateSettings({ [key]: !settings[key as keyof typeof settings] });
  };

  const handlePriorityChange = (type: string, value: 'high' | 'medium' | 'low') => {
    updateSettings({
      priorities: {
        ...settings.priorities,
        [type]: value,
      },
    });
  };

  const handleDaysChange = (days: number[]) => {
    updateSettings({ notifyBeforeDays: days });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">通知設定</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="w-5 h-5 text-gray-500" />
              <span>通知の有効化</span>
            </div>
            <div className="space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.feedbackEnabled}
                  onChange={() => handleToggle('feedbackEnabled')}
                  className="rounded border-gray-300"
                />
                <span>フィードバック</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.deadlineEnabled}
                  onChange={() => handleToggle('deadlineEnabled')}
                  className="rounded border-gray-300"
                />
                <span>期限</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.progressEnabled}
                  onChange={() => handleToggle('progressEnabled')}
                  className="rounded border-gray-300"
                />
                <span>進捗</span>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-gray-500" />
              <span>通知タイミング</span>
            </div>
            <div className="space-x-2">
              {[14, 7, 3, 1].map((day) => (
                <label key={day} className="inline-flex items-center space-x-1">
                  <input
                    type="checkbox"
                    checked={settings.notifyBeforeDays.includes(day)}
                    onChange={() => {
                      const newDays = settings.notifyBeforeDays.includes(day)
                        ? settings.notifyBeforeDays.filter((d) => d !== day)
                        : [...settings.notifyBeforeDays, day].sort((a, b) => b - a);
                      handleDaysChange(newDays);
                    }}
                    className="rounded border-gray-300"
                  />
                  <span>{day}日前</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MessageSquare className="w-5 h-5 text-gray-500" />
              <span>優先度設定</span>
            </div>
            <div className="space-x-4">
              {Object.entries(settings.priorities).map(([type, priority]) => (
                <div key={type} className="inline-block">
                  <label className="block text-sm font-medium mb-1">{type}</label>
                  <select
                    value={priority}
                    onChange={(e) => handlePriorityChange(type, e.target.value as any)}
                    className="rounded border-gray-300"
                  >
                    <option value="high">高</option>
                    <option value="medium">中</option>
                    <option value="low">低</option>
                  </select>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-500" />
              <span>メール通知</span>
            </div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={() => handleToggle('emailNotifications')}
                className="rounded border-gray-300"
              />
              <span>有効化</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}