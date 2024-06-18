import React, { useState } from 'react';
import axios from 'axios';
import '../styles/global.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('ForgotPassword call to forgot-password server api:');
      const response = await axios.post('http://localhost:5000/api/forgot-password', { email });
      console.log('ForgotPassword after call to forgot-password server api:');
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error requesting password reset');
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
        <button type="submit">Request Password Reset</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
