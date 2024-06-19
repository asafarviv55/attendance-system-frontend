import React, { useState } from 'react';
import axios from 'axios';
import '../css/ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('ForgotPassword call to forgot-password server api:');
      const response = await axios.post('http://localhost:5000/api/forgot-password', { email });
      console.log('ForgotPassword after call to forgot-password server api:');
      console.log(response.data.message);
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error requesting password reset');
    }
  };


  return (
    <div className="container">
      <div className="left-side">
        <h1>Forgot password</h1>
        <p>Enter the email associated with your account and we’ll send an email with instructions to reset your password</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <p>{message}</p>
          <button type="submit" className="button">Send instructions</button>
        </form>
      </div>
      <div className="right-side">
        <h1>Customer Insights, Business Delights</h1>
        <p>Look for information on Crmasaf.co.il</p>
      </div>
    </div>
  );
};

export default ForgotPassword;
