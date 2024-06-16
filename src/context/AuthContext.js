import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: null,
    userId: null,
    role: null,
  });

  const signIn = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/signin', { email, password });
      const { token, userId, roleName } = response.data;
      setAuth({ token, userId, role: roleName });
      return { success: true };
    } catch (error) {
      console.error('Sign in error:', error);
      return { success: false, message: 'Sign in failed' };
    }
  };

  const signOut = () => {
    setAuth({ token: null, userId: null, role: null });
  };

  const signUp = async (email, password, roleName) => {
    try {
      const response = await axios.post('http://localhost:5000/api/signup', { email, password, roleName });
      const { token, userId } = response.data;
      setAuth({ token, userId, role: roleName });
      return { success: true };
    } catch (error) {
      console.error('Sign up error:', error);
      return { success: false, message: 'Sign up failed' };
    }
  };

  return (
    <AuthContext.Provider value={{ auth, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
