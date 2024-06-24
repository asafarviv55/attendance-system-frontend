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
      <div className="">
        {auth.token && (
          <>
            <Link className="nav-link" to="/profile">Profile</Link>
          </>
        )}
        {auth.role === 'admin' && (
          <>
            <Link className="nav-link" to="/manage-users">Manage Users</Link>
            <Link className="nav-link" to="/manage-locations">Manage Locations</Link>
            <Link className="nav-link" to="/dashboard">Dashboard</Link>
            <Link to="/bulk-import">Bulk Import</Link>
          </>
        )}
        {auth.role === 'manager' && (
          <Link className="nav-link" to="/manage-leave-requests">Manage Leave Requests</Link>
        )}
        {auth.role === 'employee' && (
          <>
          <Link className="nav-link" to="/request-leave">Request Leave</Link>
          <Link className="nav-link" to="/clockinout">Clock In/Out</Link>
          <Link className="nav-link" to="/attendance-reports">Attendance Reports</Link>
          </>
        )}
        {auth.token ? (
          <button onClick={handleSignOut}>Sign Out</button>
        ) : (
          <>
            <Link className="nav-link" to="/signup">Sign Up</Link>
            <Link className="nav-link" to="/signin">Sign In</Link>
            <Link className="nav-link" to="/forgot-password">Forgot Password</Link>
          </>
        )}
      </div>
      {auth.token && (
        <div >
          User : {auth.userName}
          <br></br>
          Role : {auth.role}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
