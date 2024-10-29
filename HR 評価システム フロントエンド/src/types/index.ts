export interface User {
  id: string;
  name: string;
  email: string;
  role: '管理者' | '評価者' | '一般社員';
  department: string;
  position: string;
}

export interface EvaluationTemplate {
  id: string;
  title: string;
  type: '目標管理' | 'OKR' | '360度評価';
  criteria: EvaluationCriteria[];
}

export interface EvaluationCriteria {
  id: string;
  category: string;
  description: string;
  weight: number;
}