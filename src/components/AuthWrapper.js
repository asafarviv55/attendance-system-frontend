import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AuthWrapper = ({ children }) => {
  const { auth } = useContext(AuthContext);
  return auth.token ? children : <Redirect to="/signin" />;
};

export default AuthWrapper;
