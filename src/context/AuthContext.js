import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token') || null,
    userId: localStorage.getItem('userId') || null,
    userName: localStorage.getItem('userName') || null,
    role: localStorage.getItem('role') || null,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    const role = localStorage.getItem('role');
    if (token && userId && userName && role) {
      setAuth({ token, userId, userName, role });
    }
  }, []);

  const signIn = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/signin', { email, password });
      const { token, userId, userName, roleName } = response.data;
      setAuth({ token, userId, userName, role: roleName });
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('userName', userName);
      localStorage.setItem('role', roleName);
      return { success: true };
    } catch (error) {
      console.error('Sign in error:', error);
      return { success: false, message: 'Sign in failed' };
    }
  };

  const signOut = () => {
    setAuth({ token: null, userId: null, userName: null, role: null });
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('role');
  };

  const signUp = async (email, password, roleName) => {
    try {
      const response = await axios.post('http://localhost:5000/api/signup', { email, password, roleName });
      const { token, userId, userName } = response.data;
      setAuth({ token, userId, userName, role: roleName });
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('userName', userName);
      localStorage.setItem('role', roleName);
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
