import { User } from '../types';

export const Permissions = {
  管理者: {
    level: 3,
    features: ['全機能アクセス可能']
  },
  評価者: {
    level: 2,
    features: ['評価作成', '部下の評価閲覧・編集', 'フィードバック送信']
  },
  一般社員: {
    level: 1,
    features: ['自身の評価閲覧', 'フィードバック送信', '目標設定']
  }
} as const;

export type UserRole = keyof typeof Permissions;

export function hasPermission(user: User | null, requiredLevel: number): boolean {
  if (!user) return false;
  return Permissions[user.role].level >= requiredLevel;
}

export function canAccessFeature(user: User | null, feature: string): boolean {
  if (!user) return false;
  if (user.role === '管理者') return true;
  return Permissions[user.role].features.includes(feature);
}

export function canManageEmployee(user: User | null, targetEmployeeId: string): boolean {
  if (!user) return false;
  if (user.role === '管理者') return true;
  // 評価者は部下のみ管理可能
  if (user.role === '評価者') {
    // TODO: 部下の判定ロジックを実装
    return true;
  }
  // 一般社員は自分のデータのみアクセス可能
  return user.id === targetEmployeeId;
}