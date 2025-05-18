import React from 'react';
import { Navigate } from 'react-router-dom';
import './Css/product.css';


const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('access_token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;

};


export default ProtectedRoute;
