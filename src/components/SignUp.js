import React, { useState } from 'react';
import axios from 'axios';
import '../css/SignIn.css';


const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [roleName, setRoleName] = useState('employee'); // Default to employee

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/signup', { email, password, roleName });
      alert('Sign up successful! Please log in.');
    } catch (error) {
      console.error('Error signing up:', error);
      alert('Failed to sign up');
    }
  };


  return (
    <div className="container">
      <div className="left-side">
        <h2>Register</h2>
        <form>
        <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            required
          >
            <option value="Employee">Employee</option>
            <option value="Manager">Manager</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
          <button type="submit" onClick={handleSubmit}  className="button">Sign Up</button>
        </form>
        <div className="other-options">
        <p>Allready Have an Account ?  <a href="/signin">Sign In</a></p>
          
        </div>
      </div>
      <div className="right-side">
        <h2>Mastering Connections, Fueling Growth CRM Unleashed!</h2>
      </div>
    </div>
  );
};
export default SignUp;
