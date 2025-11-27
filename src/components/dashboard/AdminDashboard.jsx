import React, { useEffect } from "react";
import { useApp } from "../../context/AppContext";
import {
  UsersIcon,
  ClockIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const AdminDashboard = () => {
  const {
    employees,
    departments,
    leaveRequests,
    dashboardStats,
    loadDashboardStats,
  } = useApp();

  useEffect(() => {
    if (!dashboardStats) loadDashboardStats();
  }, [dashboardStats, loadDashboardStats]);

  // Safe arrays
  const safeDepartments = Array.isArray(departments) ? departments : [];
  const safeLeaveRequests = Array.isArray(leaveRequests) ? leaveRequests : [];

  const stats = [
    {
      name: "Total Employees",
      stat:
        dashboardStats?.totalEmployees ??
        employees?.length ??
        0,
      icon: UsersIcon,
      change: "+12%",
      changeType: "increase",
    },
    {
      name: "Present Today",
      stat: dashboardStats?.presentToday ?? 0,
      icon: ClockIcon,
      change: "+2.1%",
      changeType: "increase",
    },
    {
      name: "Pending Leaves",
      stat:
        dashboardStats?.pendingLeaves ??
        safeLeaveRequests.filter((r) => r.status?.toLowerCase() === "pending")
          .length,
      icon: DocumentTextIcon,
      change: "-4.2%",
      changeType: "decrease",
    },
    {
      name: "Monthly Payroll",
      stat:
        dashboardStats?.monthlyPayroll ??
        dashboardStats?.monthlyPayrollAmount ??
        "$0",
      icon: CurrencyDollarIcon,
      change: "+8.1%",
      changeType: "increase",
    },
  ];

  // Department employees
  const departmentData = safeDepartments.map((d) => ({
    name: d?.name || "Unknown",
    employees: d?.employeeCount ?? d?.employee_count ?? 0,
  }));

  // Leave pie chart
  const leaveData = [
    {
      name: "Approved",
      value: safeLeaveRequests.filter((req) => req.status?.toLowerCase() === "approved").length,
      color: "#10B981",
    },
    {
      name: "Pending",
      value: safeLeaveRequests.filter((req) => req.status?.toLowerCase() === "pending").length,
      color: "#F59E0B",
    },
    {
      name: "Rejected",
      value: safeLeaveRequests.filter((req) => req.status?.toLowerCase() === "rejected").length,
      color: "#EF4444",
    },
  ];

  return (
    <div className="space-y-10">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Overview of your organization's activity and insights.
        </p>
      </div>

      {/* ====================== Stats ======================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item) => (
          <div
            key={item.name}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-600 rounded-xl shadow">
                <item.icon className="h-6 w-6 text-white" />
              </div>

              <div>
                <p className="text-gray-500 text-sm">{item.name}</p>
                <p className="text-2xl font-bold text-gray-900 mt-0.5">
                  {item.stat}
                </p>
              </div>
            </div>

            <div
              className={`mt-3 text-sm font-semibold ${
                item.changeType === "increase"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {item.change}
            </div>
          </div>
        ))}
      </div>

      {/* ====================== Charts ======================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Employees by Department
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Bar dataKey="employees" fill="#3B82F6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Leave Requests Status
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={leaveData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                labelLine={false}
                paddingAngle={3}
                label={({ name, percent }) =>
                  percent > 0 ? `${name} ${(percent * 100).toFixed(0)}%` : ""
                }
              >
                {leaveData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <div className="text-center text-gray-600 mt-2">
            Total:{" "}
            {leaveData.reduce((sum, item) => sum + item.value, 0)}
          </div>
        </div>
      </div>

      {/* ==================== Recent Activity ==================== */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>

        <ul className="mt-6 space-y-8">
          {employees.slice(0, 3).map((e, index) => (
            <li key={e.id} className="relative flex items-start gap-4">

              {/* Timeline line */}
              {index < 2 && (
                <span className="absolute left-4 top-10 bottom-0 w-0.5 bg-gray-200"></span>
              )}

              {/* Icon */}
              <span className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center shadow">
                <UsersIcon className="h-5 w-5 text-white" />
              </span>

              {/* Info */}
              <div>
                <p className="text-gray-700">
                  Employee{" "}
                  <span className="font-semibold">
                    {e.firstName} {e.lastName}
                  </span>{" "}
                  joined the{" "}
                  <span className="font-medium">
                    {e.department?.name || "department"}
                  </span>
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {e.hireDate || "Recently"}
                </p>
              </div>

            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default AdminDashboard;
