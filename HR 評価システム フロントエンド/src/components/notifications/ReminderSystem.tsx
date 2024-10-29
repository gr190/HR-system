import React, { useEffect } from 'react';
import { useNotifications } from '../../hooks/useNotifications';
import { useEvaluations, useObjectives } from '../../hooks/useApi';
import { format, differenceInDays } from 'date-fns';
import { ja } from 'date-fns/locale';

export default function ReminderSystem() {
  const { addNotification } = useNotifications();
  const { data: evaluations } = useEvaluations();
  const { data: objectives } = useObjectives();

  useEffect(() => {
    if (!evaluations || !objectives) return;

    const checkDeadlines = () => {
      const now = new Date();

      // 評価期限のチェック
      evaluations.forEach((evaluation) => {
        const dueDate = new Date(evaluation.dueDate);
        const daysUntil = differenceInDays(dueDate, now);

        if ([14, 7, 3, 1].includes(daysUntil)) {
          addNotification({
            title: '評価期限が近づいています',
            message: `${evaluation.title}の期限まであと${daysUntil}日です（期限: ${format(dueDate, 'M月d日', { locale: ja })}）`,
            type: 'deadline',
            priority: daysUntil <= 3 ? 'high' : 'medium'
          });
        }

        // 期限超過の通知
        if (daysUntil < 0 && daysUntil > -7) {
          addNotification({
            title: '評価期限が超過しています',
            message: `${evaluation.title}の期限が${Math.abs(daysUntil)}日超過しています`,
            type: 'deadline',
            priority: 'high'
          });
        }
      });

      // 目標の進捗確認リマインド
      objectives.forEach((objective) => {
        const dueDate = new Date(objective.dueDate);
        const daysUntil = differenceInDays(dueDate, now);
        const halfwayPoint = differenceInDays(dueDate, objective.startDate) / 2;

        if (daysUntil === Math.floor(halfwayPoint)) {
          addNotification({
            title: '目標の中間確認時期です',
            message: `${objective.title}の進捗を確認してください`,
            type: 'progress',
            priority: 'medium'
          });
        }

        if (objective.progress < 50 && daysUntil <= 14) {
          addNotification({
            title: '目標の進捗に注意が必要です',
            message: `${objective.title}の進捗が50%未満です。期限まであと${daysUntil}日です`,
            type: 'progress',
            priority: 'high'
          });
        }
      });
    };

    // 初回チェック
    checkDeadlines();

    // 1日1回チェック（午前9時）
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 9, 0, 0);
    const timeUntilTomorrow = tomorrow.getTime() - now.getTime();

    const timeout = setTimeout(() => {
      checkDeadlines();
      // 以降は24時間ごとにチェック
      const interval = setInterval(checkDeadlines, 24 * 60 * 60 * 1000);
      return () => clearInterval(interval);
    }, timeUntilTomorrow);

    return () => clearTimeout(timeout);
  }, [evaluations, objectives, addNotification]);

  return null;
}