// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken, isTokenExpired } from '../utils/auth';

const ProtectedRoute = ({ children }) => {
  const token = getToken();

  if (!token || isTokenExpired(token)) {
    // Simply redirect — no logout() here
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;