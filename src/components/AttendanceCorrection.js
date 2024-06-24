import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const AttendanceCorrection = () => {
  const { auth } = useContext(AuthContext);
  const [attendanceId, setAttendanceId] = useState('');
  const [requestReason, setRequestReason] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/attendance-correction/request-correction', {
        userId: auth.userId,
        attendanceId,
        requestReason
      }, {
        headers: { Authorization: `Bearer ${auth.token}` }
      });
      alert(response.data.message);
    } catch (error) {
      console.error(error);
      alert('Failed to submit correction request');
    }
  };

  return (
    <div className="container">
      <h2>Request Attendance Correction</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Attendance ID:</label>
          <input type="text" value={attendanceId} onChange={(e) => setAttendanceId(e.target.value)} required />
        </div>
        <div>
          <label>Reason for Correction:</label>
          <textarea value={requestReason} onChange={(e) => setRequestReason(e.target.value)} required></textarea>
        </div>
        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
};

export default AttendanceCorrection;
