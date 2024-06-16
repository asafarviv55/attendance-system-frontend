import React, { useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const ClockInOut = () => {
  const { auth } = useContext(AuthContext);

  const handleClockIn = async () => {
    try {
      console.log('handleClockIn : before axios in front ');
      const response = await axios.post('http://localhost:5000/api/attendance/clockin', { userId: auth.userId });
      console.log('handleClockIn : after axios in front:', response);
      alert(`${response.data.message}\nClock In Time: ${new Date(response.data.clockInTime).toLocaleString()}`);
    } catch (error) {
      console.error('Clock in error:', error);
      alert('Failed to clock in');
    }
  };

  const handleClockOut = async () => {
    try {
      console.log('Sending clock out request');
      const response = await axios.post('http://localhost:5000/api/attendance/clockout', { userId: auth.userId });
      console.log('Clock out response:', response);
      alert(`${response.data.message}\nClock Out Time: ${new Date(response.data.clockOutTime).toLocaleString()}\nTotal Hours: ${response.data.totalHours.toFixed(2)}`);
    } catch (error) {
      console.error('Clock out error:', error);
      alert('Failed to clock out');
    }
  };

  return (
    <div className="container">
      <button onClick={handleClockIn} className="clock-button">Clock In</button>
      <button onClick={handleClockOut} className="clock-button">Clock Out</button>
    </div>
  );
};

export default ClockInOut;
