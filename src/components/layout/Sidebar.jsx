import React from "react";
import { useAuth } from "../../context/AuthContext";
import {
  HomeIcon,
  UsersIcon,
  ClockIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  DocumentTextIcon,
  CogIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { user } = useAuth();

  const adminNavigation = [
    { name: "Dashboard", icon: HomeIcon, path: "/admin/dashboard" },
    { name: "Employees", icon: UsersIcon, path: "/admin/employees" },
    {
      name: "Departments",
      icon: BuildingOfficeIcon,
      path: "/admin/department",
    },
    { name: "Attendance", icon: ClockIcon, path: "/attendance" },

    { name: "AttendanceList", icon: ClockIcon, path: "/admin/attendancelist" },

    {
      name: "Leave Requests",
      icon: DocumentTextIcon,
      path: "/admin/leave-requests",
    },

    { name: "Payroll", icon: CurrencyDollarIcon, path: "/admin/payroll" },
    { name: "Performance", icon: ChartBarIcon, path: "/admin/performance" },
    { name: "Reports", icon: DocumentTextIcon, path: "/admin/report" },
    { name: "My Profile", icon: UsersIcon, path: "/profile" },
  ];

  const employeeNavigation = [
    { name: "Dashboard", icon: HomeIcon, path: "/employee/dashboard" },
    { name: "My Profile", icon: UsersIcon, path: "/profile" },
    { name: "Attendance", icon: ClockIcon, path: "/attendance" },
    {
      name: "Leave Requests",
      icon: DocumentTextIcon,
      path: "/employee/leave-requests",
    },
    { name: "Payslips", icon: CurrencyDollarIcon, path: "/employee/payslips" },
    { name: "Performance", icon: ChartBarIcon, path: "/employee/performance" },
  ];

  const navigation =
    user?.role === "admin" ? adminNavigation : employeeNavigation;

  return (
    <div className="w-64 bg-gray-900 min-h-screen">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center h-16 px-4 bg-gray-800">
          <h2 className="text-white text-lg font-semibold">
            {user?.role === "admin" ? "Admin Panel" : "Employee Portal"}
          </h2>
        </div>
        <nav className="mt-8 flex-1">
          <div className="px-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="w-full group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                <item.icon
                  className="mr-3 h-5 w-5 text-gray-400 group-hover:text-white"
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
