import { useQuery, useMutation, useQueryClient } from 'react-query';
import * as api from '../lib/api';
import type { User, EvaluationTemplate, Department, Objective, Feedback } from '../types';

// 社員
export function useEmployees() {
  return useQuery('employees', api.employees.getAll);
}

export function useEmployee(id: string) {
  return useQuery(['employee', id], () => api.employees.getById(id));
}

export function useCreateEmployee() {
  const queryClient = useQueryClient();
  return useMutation(
    (data: Omit<User, 'id'>) => api.employees.create(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('employees');
      },
    }
  );
}

// 評価テンプレート
export function useEvaluations() {
  return useQuery('evaluations', api.evaluations.getAll);
}

export function useEvaluation(id: string) {
  return useQuery(['evaluation', id], () => api.evaluations.getById(id));
}

export function useCreateEvaluation() {
  const queryClient = useQueryClient();
  return useMutation(
    (data: Omit<EvaluationTemplate, 'id'>) => api.evaluations.create(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('evaluations');
      },
    }
  );
}

// 部署
export function useDepartments() {
  return useQuery('departments', api.departments.getAll);
}

export function useDepartment(id: string) {
  return useQuery(['department', id], () => api.departments.getById(id));
}

export function useCreateDepartment() {
  const queryClient = useQueryClient();
  return useMutation(
    (data: Omit<Department, 'id'>) => api.departments.create(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('departments');
      },
    }
  );
}

// 目標
export function useObjectives() {
  return useQuery('objectives', api.objectives.getAll);
}

export function useObjective(id: string) {
  return useQuery(['objective', id], () => api.objectives.getById(id));
}

export function useCreateObjective() {
  const queryClient = useQueryClient();
  return useMutation(
    (data: Omit<Objective, 'id'>) => api.objectives.create(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('objectives');
      },
    }
  );
}

// フィードバック
export function useFeedback() {
  return useQuery('feedback', api.feedback.getAll);
}

export function useFeedbackItem(id: string) {
  return useQuery(['feedback', id], () => api.feedback.getById(id));
}

export function useCreateFeedback() {
  const queryClient = useQueryClient();
  return useMutation(
    (data: Omit<Feedback, 'id'>) => api.feedback.create(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('feedback');
      },
    }
  );
}