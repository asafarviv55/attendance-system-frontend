import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './Navbar';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import AttendanceReports from './components/AttendanceReports';
import Dashboard from './components/Dashboard';
import ClockInOut from './components/ClockInOut';
import LeaveRequest from './components/LeaveRequest';
import ManageLeaveRequests from './components/ManageLeaveRequests';
import ManageUsers from './components/ManageUsers';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Profile from './components/Profile';
import ManageLocations from './components/ManageLocations';
import PrivateRoute from './components/PrivateRoute';
import AttendanceCorrection from './components/AttendanceCorrection';
import ManageCorrectionRequests from './components/ManageCorrectionRequests';


const App = () => (
  <AuthProvider>
    <Router>
      <div className="App">
        <Navbar />
        <div className="main-content">
            <Routes>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
              <Route element={<PrivateRoute allowedRoles={['admin', 'manager', 'employee']} />}>
                <Route path="/attendance-reports" element={<AttendanceReports />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
              <Route element={<PrivateRoute allowedRoles={['employee']} />}>
                <Route path="/clockinout" element={<ClockInOut />} />
                <Route path="/request-leave" element={<LeaveRequest />} />
                <Route path="/request-correction" element={<AttendanceCorrection />} />
              </Route>
              <Route element={<PrivateRoute allowedRoles={['admin', 'manager']} />}>
                <Route path="/manage-leave-requests" element={<ManageLeaveRequests />} />
                <Route path="/manage-correction-requests" element={<ManageCorrectionRequests />} />
                <Route path="/manage-locations" element={<ManageLocations />} />
              </Route>
              <Route element={<PrivateRoute allowedRoles={['admin']} />}>
                <Route path="/manage-users" element={<ManageUsers />} />
                <Route path="/bulk-import" element={<BulkImport />} />
              </Route>
            </Routes>
        </div>
      </div>
    </Router>
  </AuthProvider>
);

export default App;
