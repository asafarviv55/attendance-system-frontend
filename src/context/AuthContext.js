import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, role: null , user: null,userId: null });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (token  && userId) {
      axios.defaults.headers.common['Authorization'] = token;
      setAuth({ token , userId });
    }
  }, []);

  
  const signIn = async (email, password) => {
    console.log("Initiating sign in...");
  
    try {
      const response = await axios.post('http://localhost:5000/api/signin', { email, password });
      console.log("Received response from backend:", response);
  
      if (response.data.success) {
        console.log('Sign in success:', response.data);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userId); // Save userId in localStorage

        axios.defaults.headers.common['Authorization'] = response.data.token;
        setAuth({ token: response.data.token, role: response.data.roleName , userId: response.data.userId });
      } else {
        console.log('Sign in failed with message:', response.data.message);
      }
      return response.data;
    } catch (error) {
      console.error('Error during sign in:', error);
      return { success: false, message: 'Sign in failed' };
    }
  };
  

  const signUp = async (email, password) => {
    console.log('signUp front');
    try {
      const response = await axios.post('http://localhost:5000/api/signup', { email, password });
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userId); // Save userId in localStorage
        axios.defaults.headers.common['Authorization'] = response.data.token;
        setAuth({ token: response.data.token, role: null, userId: response.data.userId  });
      }
      return response.data;
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Sign up failed' };
    }
  };

  const signOut = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setAuth({ token: null, user: null });
  };

  return (
    <AuthContext.Provider value={{ auth, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
