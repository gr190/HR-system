import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface NotificationSettings {
  feedbackEnabled: boolean;
  deadlineEnabled: boolean;
  progressEnabled: boolean;
  emailNotifications: boolean;
  notifyBeforeDays: number[];
  workingHours: {
    start: number;
    end: number;
  };
  priorities: {
    deadline: 'high' | 'medium' | 'low';
    feedback: 'high' | 'medium' | 'low';
    progress: 'high' | 'medium' | 'low';
  };
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'deadline' | 'progress' | 'feedback';
  priority: 'low' | 'medium' | 'high';
  timestamp: number;
  read: boolean;
  acknowledged?: boolean;
  sender?: string;
  category?: string;
}

interface NotificationStore {
  notifications: Notification[];
  settings: NotificationSettings;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  acknowledgeNotification: (id: string) => void;
  clearAll: () => void;
  removeNotification: (id: string) => void;
  updateSettings: (settings: Partial<NotificationSettings>) => void;
  markAllAsRead: () => void;
  removeMultiple: (ids: string[]) => void;
  filterNotifications: (type?: string, priority?: string) => Notification[];
}

const defaultSettings: NotificationSettings = {
  feedbackEnabled: true,
  deadlineEnabled: true,
  progressEnabled: true,
  emailNotifications: false,
  notifyBeforeDays: [14, 7, 3, 1],
  workingHours: {
    start: 9,
    end: 18,
  },
  priorities: {
    deadline: 'high',
    feedback: 'medium',
    progress: 'medium',
  },
};

export const useNotifications = create<NotificationStore>()(
  persist(
    (set, get) => ({
      notifications: [],
      settings: defaultSettings,
      addNotification: (notification) =>
        set((state) => {
          const { settings } = state;
          
          // 通知設定に基づくフィルタリング
          if (
            (notification.type === 'feedback' && !settings.feedbackEnabled) ||
            (notification.type === 'deadline' && !settings.deadlineEnabled) ||
            (notification.type === 'progress' && !settings.progressEnabled)
          ) {
            return state;
          }

          // 重複チェック
          const exists = state.notifications.some(
            (n) => 
              n.title === notification.title &&
              n.message === notification.message &&
              !n.read &&
              n.timestamp > Date.now() - 24 * 60 * 60 * 1000
          );

          if (exists) return state;

          // 古い通知の自動クリーンアップ
          const filteredNotifications = state.notifications.filter(
            (n) => 
              !n.read || 
              n.timestamp > Date.now() - 7 * 24 * 60 * 60 * 1000
          );

          // 優先度の設定
          const priority = settings.priorities[notification.type] || 'medium';

          return {
            notifications: [
              {
                ...notification,
                id: crypto.randomUUID(),
                timestamp: Date.now(),
                read: false,
                priority,
              },
              ...filteredNotifications,
            ],
          };
        }),
      markAsRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        })),
      acknowledgeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, acknowledged: true } : n
          ),
        })),
      clearAll: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        })),
      removeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
      markAllAsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        })),
      removeMultiple: (ids) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => !ids.includes(n.id)),
        })),
      filterNotifications: (type, priority) =>
        get().notifications.filter((n) => 
          (!type || n.type === type) && (!priority || n.priority === priority)
        ),
    }),
    {
      name: 'notifications-storage',
    }
  )
);