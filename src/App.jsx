import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { AppProvider } from "./context/AppContext";
import LoginForm from "./components/auth/LoginForm";
import Register from "./components/auth/Register";
import Home from "./pages/Home";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import EmployeeDashboard from "./components/dashboard/EmployeeDashboard";
import EmployeeList from "./components/employees/EmployeeList";
import EmployeeForm from "./components/employees/EmployeeForm";
import LeaveRequestList from "./components/leave/LeaveRequestList";
import Attendance from "./pages/Attendance";
import Profile from "./pages/Profile";
import Department from "./pages/Department";
import Payroll from "./pages/Payroll";
import Performance from "./pages/Performance";
import Reports from "./pages/Reports";
import Payslips from "./pages/Payslips";
import AttendanceList from "./pages/AttendanceList";
import { useEffect } from "react";

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const MainLayout = ({ children }) => (
  <div className="flex h-screen bg-gray-100">
    <Sidebar />
    <div className="flex-1 flex flex-col overflow-hidden">
      <Navbar />
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <div className="container mx-auto px-6 py-8">{children}</div>
      </main>
    </div>
  </div>
);

function App() {
 

  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />

            {/* Protected Routes */}
            {/* <Route
              path="/"
              element={
                <PrivateRoute>
                  <MainLayout>
                    <AdminDashboard />
                  </MainLayout>
                </PrivateRoute>
              }
            /> */}

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <PrivateRoute>
                  <MainLayout>
                    <AdminDashboard />
                  </MainLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/employees"
              element={
                <PrivateRoute>
                  <MainLayout>
                    <EmployeeList />
                  </MainLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/department"
              element={
                <PrivateRoute>
                  <MainLayout>
                    <Department />
                  </MainLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/attendancelist"
              element={
                <PrivateRoute>
                  <MainLayout>
                    <AttendanceList />
                  </MainLayout>
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/leave-requests"
              element={
                <PrivateRoute>
                  <MainLayout>
                    <LeaveRequestList />
                  </MainLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/payroll"
              element={
                <PrivateRoute>
                  <MainLayout>
                    <Payroll />
                  </MainLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/performance"
              element={
                <PrivateRoute>
                  <MainLayout>
                    <Performance />
                  </MainLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/report"
              element={
                <PrivateRoute>
                  <MainLayout>
                    <Reports />
                  </MainLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/attendance"
              element={
                <PrivateRoute>
                  <MainLayout>
                    <Attendance />
                  </MainLayout>
                </PrivateRoute>
              }
            />

            {/* Employee Routes */}
            <Route
              path="/employee/dashboard"
              element={
                <PrivateRoute>
                  <MainLayout>
                    <EmployeeDashboard />
                  </MainLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/employee/leave-requests"
              element={
                <PrivateRoute>
                  <MainLayout>
                    <LeaveRequestList />
                  </MainLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/employee/payslips"
              element={
                <PrivateRoute>
                  <MainLayout>
                    <Payslips />
                  </MainLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <MainLayout>
                    <Profile />
                  </MainLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/employee/performance"
              element={
                <PrivateRoute>
                  <MainLayout>
                    <Performance />
                  </MainLayout>
                </PrivateRoute>
              }
            />

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
