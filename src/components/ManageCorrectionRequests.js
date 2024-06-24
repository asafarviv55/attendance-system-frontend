import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const ManageCorrectionRequests = () => {
  const { auth } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/attendance-correction/correction-requests', {
          headers: { Authorization: `Bearer ${auth.token}` }
        });
        setRequests(response.data.requests);
      } catch (error) {
        console.error('Error fetching correction requests:', error);
      }
    };

    fetchRequests();
  }, [auth.token]);

  const handleResponse = async (requestId, status) => {
    const managerResponse = prompt(`Enter response for ${status}:`);
    try {
      const response = await axios.post('http://localhost:5000/api/attendance-correction/respond-correction', {
        requestId,
        status,
        managerResponse
      }, {
        headers: { Authorization: `Bearer ${auth.token}` }
      });
      alert(response.data.message);
      setRequests(requests.filter(request => request.id !== requestId));
    } catch (error) {
      console.error(`Error ${status}ing request:`, error);
      alert(`Failed to ${status} request`);
    }
  };

  return (
    <div>
      <h2>Manage Correction Requests</h2>
      <ul>
        {requests.map(request => (
          <li key={request.id}>
            <p>User ID: {request.user_id}</p>
            <p>Attendance ID: {request.attendance_id}</p>
            <p>Reason: {request.request_reason}</p>
            <button onClick={() => handleResponse(request.id, 'approved')}>Approve</button>
            <button onClick={() => handleResponse(request.id, 'denied')}>Deny</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageCorrectionRequests;
