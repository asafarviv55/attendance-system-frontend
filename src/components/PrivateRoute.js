import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/global.css';

const PrivateRoute = ({ allowedRoles }) => {
  const { auth } = useContext(AuthContext);
  return auth.token && allowedRoles.includes(auth.role) ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
