import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const ManageLeaveRequests = () => {
  const { auth } = useContext(AuthContext);
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/leave/requests', {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        setLeaveRequests(response.data.leaveRequests);
      } catch (error) {
        console.error('Error fetching leave requests:', error);
      }
    };

    fetchLeaveRequests();
  }, [auth.token]);

  const handleAction = async (requestId, status) => {
    try {
      const response = await axios.post('http://localhost:5000/api/leave/approve-deny', { requestId, status }, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      alert(response.data.message);
      setLeaveRequests(leaveRequests.map(request => request.id === requestId ? { ...request, status } : request));
    } catch (error) {
      console.error(`Error ${status}ing leave request:`, error);
      alert(`Failed to ${status} leave request`);
    }
  };

  return (
    <div>
      <h2>Manage Leave Requests</h2>
      {leaveRequests.map(request => (
        <div key={request.id}>
          <p>User ID: {request.user_id}</p>
          <p>Start Date: {request.start_date}</p>
          <p>End Date: {request.end_date}</p>
          <p>Reason: {request.reason}</p>
          <p>Status: {request.status}</p>
          {request.status === 'pending' && (
            <div>
              <button onClick={() => handleAction(request.id, 'approved')}>Approve</button>
              <button onClick={() => handleAction(request.id, 'denied')}>Deny</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ManageLeaveRequests;
