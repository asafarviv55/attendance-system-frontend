import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import ClockInOut from './components/ClockInOut';
import Attendance from './components/Attendance';
import AttendanceReports from './components/AttendanceReports';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './Navbar';
import AuthProvider from './context/AuthContext';
import LeaveRequest from './components/LeaveRequest';
import ManageLeaveRequests from './components/ManageLeaveRequests';




const App = () => (
  <AuthProvider>
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/attendance" element={<Attendance />  }/>
          <Route path="/attendance-reports" element={<AttendanceReports />}  />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/clockinout" element={<ClockInOut />} />
          <Route path="/request-leave" component={<LeaveRequest/>} />
          <Route path="/manage-leave-requests" component={<ManageLeaveRequests/>} />
        </Routes>
      </div>
    </Router>
  </AuthProvider>
);

export default App;
