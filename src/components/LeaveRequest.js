import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const LeaveRequest = () => {
  const { auth } = useContext(AuthContext);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/leave/request', {
        userId: auth.userId,
        startDate,
        endDate,
        reason,
      }, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      alert(response.data.message);
    } catch (error) {
      console.error('Error requesting leave:', error);
      alert('Failed to submit leave request');
    }
  };

  return (
    <div className="container">
    <form onSubmit={handleSubmit}>
      <h2>Request Leave</h2>
      <div>
        <label>Start Date:</label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
      </div>
      <div>
        <label>End Date:</label>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
      </div>
      <div>
        <label>Reason:</label>
        <textarea value={reason} onChange={(e) => setReason(e.target.value)} required />
      </div>
      <button type="submit">Submit Request</button>
    </form>
    </div>
  );
};

export default LeaveRequest;
