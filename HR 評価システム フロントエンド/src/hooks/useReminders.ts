import { useEffect } from 'react';
import { useNotifications } from './useNotifications';

interface Reminder {
  id: string;
  title: string;
  dueDate: Date;
  type: 'evaluation' | 'feedback' | 'objective';
}

export function useReminders(reminders: Reminder[]) {
  const { addNotification } = useNotifications();

  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      reminders.forEach((reminder) => {
        const daysUntil = Math.ceil(
          (reminder.dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (daysUntil === 7 || daysUntil === 3 || daysUntil === 1) {
          const typeText = {
            evaluation: '評価',
            feedback: 'フィードバック',
            objective: '目標',
          }[reminder.type];

          addNotification({
            title: `${typeText}期限が近づいています`,
            message: `${reminder.title}の期限まであと${daysUntil}日です`,
            type: 'deadline',
          });
        }
      });
    };

    checkReminders();
    const interval = setInterval(checkReminders, 24 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [reminders, addNotification]);
}