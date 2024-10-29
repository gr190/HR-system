import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { hasPermission } from '../../lib/permissions';

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredLevel?: number;
}

export default function PrivateRoute({ children, requiredLevel = 1 }: PrivateRouteProps) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!hasPermission(user, requiredLevel)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}