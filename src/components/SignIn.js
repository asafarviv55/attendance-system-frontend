import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../css/SignIn.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn(email, password);
    if (result.success) {
      navigate('/attendance-reports');
    } else {
      alert(result.message);
    }
  };
  return (
    <div className="container">
      <div className="left-side">
        <h2>Sign In</h2>
        <p>Enter your email and password to sign in!</p>
        <button className="google-signin">
          <img src="google-icon.png" alt="Google icon" /> Sign in with Google
        </button>
        <div className="divider">or</div>
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="button">Sign In</button>
        </form>
        <div className="other-options">
          <label>
            <input type="checkbox" /> Keep me logged in
          </label>
          <a href="/forgot-password">Forgot password?</a>
        </div>
        <div className="other-options">
          <p>Not registered yet? <a href="/signup">Create an Account</a></p>
        </div>
      </div>
      <div className="right-side">
        <h2>Connecting Your Business to the Future!</h2>
        <p>Look for information on Crmasaf.co.il</p>
      </div>
    </div>
  );
};


export default SignIn;
