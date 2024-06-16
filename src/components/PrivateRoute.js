import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ allowedRoles }) => {
  const { auth } = useContext(AuthContext);
  return auth.token && allowedRoles.includes(auth.role) ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
