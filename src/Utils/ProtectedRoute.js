import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../Services/AuthService';

const ProtectedRoute = ({ children }) => {
  if (!AuthService.isAuthenticated()) {
    // Redirect to the login page if not authenticated
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;