import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

const Navbar = () => {
  const { auth, signOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate('/signin');  // Navigate to sign-in page after sign-out
  };

  return (
    <nav className="navbar">
      {auth.token && (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/attendance">Attendance</Link>
          <Link to="/attendance-reports">Attendance Reports</Link>
          <Link to="/clockinout">Clock In/Out</Link>
          <Link to="/profile">Profile</Link>

          <Link to="/manage-locations">Manage Locations</Link>
        </>
      )}
      {auth.role === 'admin' && (
        <>
          <Link to="/manage-users">Manage Users</Link>
          <Link to="/manage-leave-requests">Manage Leave Requests</Link>
        </>
      )}
      {auth.role === 'manager' && (
        <Link to="/manage-leave-requests">Manage Leave Requests</Link>
      )}
      {auth.role === 'employee' && (
        <Link to="/request-leave">Request Leave</Link>
      )}
      {auth.token ? (
        <button onClick={handleSignOut}>Sign Out</button>
      ) : (
        <>
          <Link to="/signup">Sign Up</Link>
          <Link to="/signin">Sign In</Link>
          <Link to="/forgot-password">Forgot Password</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
