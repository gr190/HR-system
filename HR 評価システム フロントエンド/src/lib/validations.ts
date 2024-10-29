import { z } from 'zod';

export const employeeSchema = z.object({
  name: z.string().min(1, '名前は必須です'),
  email: z.string().email('有効なメールアドレスを入力してください'),
  department: z.string().min(1, '部署は必須です'),
  position: z.string().min(1, '役職は必須です'),
  role: z.enum(['管理者', '評価者', '一般社員']),
});

export const evaluationSchema = z.object({
  title: z.string().min(1, 'テンプレート名は必須です'),
  type: z.enum(['目標管理', 'OKR', '360度評価']),
  criteria: z.array(
    z.object({
      category: z.string().min(1, 'カテゴリは必須です'),
      description: z.string().min(1, '説明は必須です'),
      weight: z.number().min(0).max(100, '重みは0から100の間で設定してください'),
    })
  ).min(1, '評価項目は1つ以上必要です'),
});

export const objectiveSchema = z.object({
  title: z.string().min(1, '目標タイトルは必須です'),
  description: z.string().min(1, '目標の説明は必須です'),
  dueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, '期限は YYYY-MM-DD 形式で入力してください'),
  progress: z.number().min(0).max(100, '進捗は0から100の間で設定してください'),
});

export const feedbackSchema = z.object({
  to: z.string().min(1, '送信先は必須です'),
  content: z.string().min(1, 'フィードバック内容は必須です'),
  type: z.enum(['ポジティブ', '改善点', '目標']),
});