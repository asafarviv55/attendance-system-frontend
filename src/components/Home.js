import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/global.css';

const Home = () => (
  <div className="container">
    <h2>Welcome To Our Attendance Report System</h2>
    <div>
      <Link to="/signin">Sign In</Link>
      <span> | </span>
      <Link to="/signup">Sign Up</Link>
    </div>
  </div>
);

export default Home;
