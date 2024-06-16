import React, { useContext } from 'react';
import { Link ,useNavigate } from 'react-router-dom';
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
  <Link to="/">Home</Link>
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
        <button onClick={signOut}>Sign Out</button>
      ) : (
        <>
          <Link to="/signin">Sign In</Link>
          <Link to="/signup">Sign Up</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
