import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useAuth } from "./context/AuthContext";

// Code-split heavier route components to reduce initial bundle size
const LoginForm = lazy(() => import("./components/auth/LoginForm"));
const Register = lazy(() => import("./components/auth/Register"));
const Home = lazy(() => import("./pages/Home"));
const Navbar = lazy(() => import("./components/layout/Navbar"));
const Sidebar = lazy(() => import("./components/layout/Sidebar"));
const AdminDashboard = lazy(() =>
  import("./components/dashboard/AdminDashboard")
);
const EmployeeDashboard = lazy(() =>
  import("./components/dashboard/EmployeeDashboard")
);
const EmployeeList = lazy(() => import("./components/employees/EmployeeList"));
const EmployeeForm = lazy(() => import("./components/employees/EmployeeForm"));
const LeaveRequestList = lazy(() =>
  import("./components/leave/LeaveRequestList")
);
const Attendance = lazy(() => import("./pages/Attendance"));
const Profile = lazy(() => import("./pages/Profile"));
const Department = lazy(() => import("./pages/Department"));
const Payroll = lazy(() => import("./pages/Payroll"));
const Payslips = lazy(() => import("./pages/Payslips"));
const AttendanceList = lazy(() => import("./pages/AttendanceList"));
const AdminPerformance = lazy(() => import("./pages/AdminPerformance"));
const EmployeePerformance = lazy(() => import("./pages/EmployeePerformance"));

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
    <Router>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading...</p>
            </div>
          </div>
        }
      >
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<Register />} />

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
                  <AdminPerformance />
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
                  <EmployeePerformance />
                </MainLayout>
              </PrivateRoute>
            }
          />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
