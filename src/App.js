import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './Navbar';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Attendance from './components/Attendance';
import AttendanceReports from './components/AttendanceReports';
import Dashboard from './components/Dashboard';
import ClockInOut from './components/ClockInOut';
import LeaveRequest from './components/LeaveRequest';
import ManageLeaveRequests from './components/ManageLeaveRequests';
import ManageUsers from './components/ManageUsers';
import PrivateRoute from './components/PrivateRoute';

const App = () => (
  <AuthProvider>
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<PrivateRoute allowedRoles={['admin', 'manager', 'employee']} />}>
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/attendance-reports" element={<AttendanceReports />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/clockinout" element={<ClockInOut />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={['employee']} />}>
            <Route path="/request-leave" element={<LeaveRequest />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={['admin', 'manager']} />}>
            <Route path="/manage-leave-requests" element={<ManageLeaveRequests />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={['admin']} />}>
            <Route path="/manage-users" element={<ManageUsers />} />
          </Route>
        </Routes>
      </div>
    </Router>
  </AuthProvider>
);

export default App;
