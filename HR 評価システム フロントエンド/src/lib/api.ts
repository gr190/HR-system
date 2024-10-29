import { mockEmployees, mockDepartments, mockObjectives, mockFeedback, mockEvaluations } from './mockData';
import type { User, EvaluationTemplate, Department, Objective, Feedback } from '../types';

// モックAPIレスポンスを遅延させる関数
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 認証
export const auth = {
  login: async (email: string, password: string) => {
    await delay(500);
    const user = mockEmployees.find(u => u.email === email);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return { token: 'mock-token', user };
  },
  logout: () => {
    localStorage.removeItem('token');
  },
};

// 社員
export const employees = {
  getAll: async () => {
    await delay(500);
    return mockEmployees;
  },
  getById: async (id: string) => {
    await delay(500);
    const employee = mockEmployees.find(e => e.id === id);
    if (!employee) throw new Error('Employee not found');
    return employee;
  },
  create: async (data: Omit<User, 'id'>) => {
    await delay(500);
    const newEmployee = { ...data, id: crypto.randomUUID() };
    mockEmployees.push(newEmployee);
    return newEmployee;
  },
  update: async (id: string, data: Partial<User>) => {
    await delay(500);
    const index = mockEmployees.findIndex(e => e.id === id);
    if (index === -1) throw new Error('Employee not found');
    const updatedEmployee = { ...mockEmployees[index], ...data };
    mockEmployees[index] = updatedEmployee;
    return updatedEmployee;
  },
  delete: async (id: string) => {
    await delay(500);
    const index = mockEmployees.findIndex(e => e.id === id);
    if (index === -1) throw new Error('Employee not found');
    mockEmployees.splice(index, 1);
  },
};

// 部署
export const departments = {
  getAll: async () => {
    await delay(500);
    return mockDepartments;
  },
  getById: async (id: string) => {
    await delay(500);
    const department = mockDepartments.find(d => d.id === id);
    if (!department) throw new Error('Department not found');
    return department;
  },
  create: async (data: Omit<Department, 'id'>) => {
    await delay(500);
    const newDepartment = { ...data, id: crypto.randomUUID() };
    mockDepartments.push(newDepartment);
    return newDepartment;
  },
  update: async (id: string, data: Partial<Department>) => {
    await delay(500);
    const index = mockDepartments.findIndex(d => d.id === id);
    if (index === -1) throw new Error('Department not found');
    const updatedDepartment = { ...mockDepartments[index], ...data };
    mockDepartments[index] = updatedDepartment;
    return updatedDepartment;
  },
  delete: async (id: string) => {
    await delay(500);
    const index = mockDepartments.findIndex(d => d.id === id);
    if (index === -1) throw new Error('Department not found');
    mockDepartments.splice(index, 1);
  },
};

// 目標
export const objectives = {
  getAll: async () => {
    await delay(500);
    return mockObjectives;
  },
  getById: async (id: string) => {
    await delay(500);
    const objective = mockObjectives.find(o => o.id === id);
    if (!objective) throw new Error('Objective not found');
    return objective;
  },
  create: async (data: Omit<Objective, 'id'>) => {
    await delay(500);
    const newObjective = { ...data, id: crypto.randomUUID() };
    mockObjectives.push(newObjective);
    return newObjective;
  },
  update: async (id: string, data: Partial<Objective>) => {
    await delay(500);
    const index = mockObjectives.findIndex(o => o.id === id);
    if (index === -1) throw new Error('Objective not found');
    const updatedObjective = { ...mockObjectives[index], ...data };
    mockObjectives[index] = updatedObjective;
    return updatedObjective;
  },
  delete: async (id: string) => {
    await delay(500);
    const index = mockObjectives.findIndex(o => o.id === id);
    if (index === -1) throw new Error('Objective not found');
    mockObjectives.splice(index, 1);
  },
};

// フィードバック
export const feedback = {
  getAll: async () => {
    await delay(500);
    return mockFeedback;
  },
  getById: async (id: string) => {
    await delay(500);
    const feedbackItem = mockFeedback.find(f => f.id === id);
    if (!feedbackItem) throw new Error('Feedback not found');
    return feedbackItem;
  },
  create: async (data: Omit<Feedback, 'id'>) => {
    await delay(500);
    const newFeedback = { ...data, id: crypto.randomUUID(), date: new Date().toISOString().split('T')[0] };
    mockFeedback.push(newFeedback);
    return newFeedback;
  },
  update: async (id: string, data: Partial<Feedback>) => {
    await delay(500);
    const index = mockFeedback.findIndex(f => f.id === id);
    if (index === -1) throw new Error('Feedback not found');
    const updatedFeedback = { ...mockFeedback[index], ...data };
    mockFeedback[index] = updatedFeedback;
    return updatedFeedback;
  },
  delete: async (id: string) => {
    await delay(500);
    const index = mockFeedback.findIndex(f => f.id === id);
    if (index === -1) throw new Error('Feedback not found');
    mockFeedback.splice(index, 1);
  },
};

// 評価テンプレート
export const evaluations = {
  getAll: async () => {
    await delay(500);
    return mockEvaluations;
  },
  getById: async (id: string) => {
    await delay(500);
    const evaluation = mockEvaluations.find(e => e.id === id);
    if (!evaluation) throw new Error('Evaluation not found');
    return evaluation;
  },
  create: async (data: Omit<EvaluationTemplate, 'id'>) => {
    await delay(500);
    const newEvaluation = { ...data, id: crypto.randomUUID() };
    mockEvaluations.push(newEvaluation);
    return newEvaluation;
  },
  update: async (id: string, data: Partial<EvaluationTemplate>) => {
    await delay(500);
    const index = mockEvaluations.findIndex(e => e.id === id);
    if (index === -1) throw new Error('Evaluation not found');
    const updatedEvaluation = { ...mockEvaluations[index], ...data };
    mockEvaluations[index] = updatedEvaluation;
    return updatedEvaluation;
  },
  delete: async (id: string) => {
    await delay(500);
    const index = mockEvaluations.findIndex(e => e.id === id);
    if (index === -1) throw new Error('Evaluation not found');
    mockEvaluations.splice(index, 1);
  },
};