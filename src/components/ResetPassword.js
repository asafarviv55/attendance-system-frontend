import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/ForgotPassword.css';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const token = new URLSearchParams(window.location.search).get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/reset-password', { token, password });
      alert('Password has been reset successfully.');
    } catch (error) {
      console.error('Error resetting password:', error);
      alert('Failed to reset password. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="left-side">
        <h1>Reset password</h1>
        <p>Enter your new password below to reset your password</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className="button">Reset Password</button>
        </form>
      </div>
      <div className="right-side">
        <h1>Secure Your Account</h1>
        <p>Look for information on Crmasaf.co.il</p>
      </div>
    </div>
  );
};



export default ResetPassword;
