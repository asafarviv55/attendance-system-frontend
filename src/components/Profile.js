import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import '../styles/global.css';

const Profile = () => {
  const { auth } = useContext(AuthContext);
  const [profile, setProfile] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/profile', {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        setProfile({ email: response.data.user.email, password: '' });
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, [auth.token]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://localhost:5000/api/profile', profile, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Error updating profile');
    }
  };

  return (
    <div>
      <h2>Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Password (leave blank to keep current password):
          <input
            type="password"
            name="password"
            value={profile.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Update Profile</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Profile;
