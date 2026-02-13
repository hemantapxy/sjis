import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && (!user.role || !allowedRoles.map(r => r.toLowerCase()).includes(user.role.toLowerCase()))) {
    console.log('Role mismatch or missing role. User role:', user.role, 'Allowed:', allowedRoles);
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
