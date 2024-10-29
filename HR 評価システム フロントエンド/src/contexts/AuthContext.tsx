import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user] = useState<User>({
    id: '1',
    name: '山田 太郎',
    email: 'admin@example.com',
    role: '管理者',
    department: '経営企画部',
    position: '部長'
  });
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    // 認証ロジックは省略
    navigate('/dashboard');
  };

  const logout = () => {
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}