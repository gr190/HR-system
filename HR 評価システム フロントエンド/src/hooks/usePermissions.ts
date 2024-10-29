import { useAuth } from '../contexts/AuthContext';

export function usePermissions() {
  const { user } = useAuth();

  return {
    hasPermission: (requiredLevel: number) => {
      if (!user) return false;
      const levels = {
        '管理者': 3,
        '評価者': 2,
        '一般社員': 1
      };
      return levels[user.role as keyof typeof levels] >= requiredLevel;
    },
    isAdmin: user?.role === '管理者',
    isEvaluator: user?.role === '評価者',
    isEmployee: user?.role === '一般社員',
  };
}