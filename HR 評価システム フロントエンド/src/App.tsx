import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import EmployeeList from './components/employees/EmployeeList';
import EvaluationForm from './components/evaluations/EvaluationForm';
import DepartmentList from './components/departments/DepartmentList';
import ObjectiveList from './components/objectives/ObjectiveList';
import FeedbackList from './components/feedback/FeedbackList';
import NotificationBell from './components/notifications/NotificationBell';
import ReminderSystem from './components/notifications/ReminderSystem';
import { AuthProvider } from './contexts/AuthContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <ReminderSystem />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="employees" element={<EmployeeList />} />
              <Route path="evaluations" element={<EvaluationForm />} />
              <Route path="departments" element={<DepartmentList />} />
              <Route path="objectives" element={<ObjectiveList />} />
              <Route path="feedback" element={<FeedbackList />} />
            </Route>
          </Routes>
          <NotificationBell />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;