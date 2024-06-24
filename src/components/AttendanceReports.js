import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns'; // Import the format function from date-fns
import '../styles/global.css';


const AttendanceReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/attendance-reports');
        console.log('API Response:', response.data);
        if (Array.isArray(response.data)) {
          setReports(response.data);
        } else {
          console.error('Unexpected data format:', response.data);
          setReports([]);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching attendance reports:', err.message);
        setError('Failed to fetch attendance reports');
        setLoading(false);
      }
    };

    fetchReports();
  }, []);



  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return format(date, 'dd/MM/yyyy HH:mm');
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;  // Return the original string if formatting fails
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log('Reports state:', reports);

  return (
    <div className="container">
      <h1>Attendance Reports</h1>
      <div className="filters">
        {Array.isArray(reports) && reports.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Clock In</th>
                <th>Clock Out</th>
                <th>Total Hours</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, index) => (
                <tr key={index}>
                  <td>{report.user_id}</td>
                  <td>{formatDate(report.clock_in)}</td> {/* Use formatDate function */}
                  <td>{formatDate(report.clock_out)}</td>
                  <td>{report.total_hours}</td>
                  <td>{formatDate(report.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No attendance reports available</p>
        )}
      </div>
    </div>
  );
};

export default AttendanceReports;
