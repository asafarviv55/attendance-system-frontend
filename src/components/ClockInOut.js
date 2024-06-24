import React, { useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';




const ClockInOut = () => {
  const { auth } = useContext(AuthContext);
  
  const handleClockIn = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await axios.post(
            'http://localhost:5000/api/attendance/clockin',
            { userId: auth.userId, latitude, longitude },
            { headers: { Authorization: `Bearer ${auth.token}` } }
          );
          alert(response.data.message);
        } catch (error) {
          console.error(error);
          alert(error.response?.data?.message || 'Failed to clock in');
        }
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };



  const handleClockOut = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await axios.post(
            'http://localhost:5000/api/attendance/clockout',
            { userId: auth.userId, latitude, longitude },
            { headers: { Authorization: `Bearer ${auth.token}` } }
          );
          alert(response.data.message);
        } catch (error) {
          console.error(error);
          alert(error.response?.data?.message || 'Failed to clock out');
        }
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };



  return (
    <div className="container">
      <div className="left-side">
          <button onClick={handleClockIn} className="button">Clock In</button>
          <button onClick={handleClockOut} className="button">Clock Out</button>
      </div>
      <div className="right-side">

      </div>
    </div>
  );
};

export default ClockInOut;
