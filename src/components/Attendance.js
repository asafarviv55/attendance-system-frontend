import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Attendance.css'; // Import the CSS file

const Attendance = () => {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    // Fetch student data from the backend
    axios.get('http://localhost:5000/api/students').then(response => {
      setStudents(response.data);
    });
  }, []);

  const handleAttendanceChange = (studentId, status) => {
    setAttendance({ ...attendance, [studentId]: status });
  };

  const submitAttendance = () => {
    axios.post('http://localhost:5000/api/attendance', attendance).then(response => {
      alert('Attendance submitted successfully!');
    });
  };

 
  return (
    <div className="container">
      <h1>Attendance</h1>
      <table border="1" cellPadding="5" cellSpacing="0" className="center">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Attendance</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>
                <select 
                  value={attendance[student.id]} 
                  onChange={e => handleAttendanceChange(student.id, e.target.value)}
                >
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                  <option value="late">Late</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={submitAttendance}>Submit</button>
    </div>
  );
};
export default Attendance;
