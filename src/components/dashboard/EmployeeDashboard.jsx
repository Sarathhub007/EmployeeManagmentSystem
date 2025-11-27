import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useApp } from "../../context/AppContext";
import {
  ClockIcon,
  CalendarDaysIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const { leaveRequests } = useApp();
  const navigate = useNavigate();

  // Get logged-in employee's ID from localStorage
  let currentEmployeeId = null;
  try {
    const employee = JSON.parse(localStorage.getItem("employee") || "null");
    currentEmployeeId = employee?.id || employee?.employeeId;
  } catch (e) {
    console.warn("Failed to parse employee from localStorage", e);
  }

  // Filter leave requests to show only logged-in user's requests
  const userLeaveRequests = leaveRequests.filter(
    (req) => req.employeeId === currentEmployeeId || req.userId === user?.id
  );

  const stats = [
    {
      name: "Hours This Week",
      stat: "40",
      icon: ClockIcon,
      change: "+2 hrs from last week",
    },
    {
      name: "Leave Balance",
      stat: "18 days",
      icon: CalendarDaysIcon,
      change: "6 days used this year",
    },
    {
      name: "Last Payslip",
      stat: "$6,250",
      icon: CurrencyDollarIcon,
      change: "November 2024",
    },
    {
      name: "Performance Score",
      stat: "4.8 / 5",
      icon: ChartBarIcon,
      change: "+0.2 from last review",
    },
  ];

  return (
    <div className="space-y-10">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.firstName}!
        </h1>
        <p className="mt-1 text-gray-600">
          Here's your personalized overview and activity summary.
        </p>
      </div>

      {/* ====================== Stats ======================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item) => (
          <div
            key={item.name}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
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

            <p className="text-xs text-gray-500 mt-2">{item.change}</p>
          </div>
        ))}
      </div>

      {/* ====================== Quick Actions ======================= */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900">
          Quick Actions
        </h3>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl shadow-sm hover:bg-gray-100 transition">
            <ClockIcon className="h-5 w-5 text-gray-500" />
            Clock In / Out
          </button>

          <button
            onClick={() => navigate("/employee/leave-requests")}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl shadow-sm hover:bg-gray-100 transition"
          >
            <CalendarDaysIcon className="h-5 w-5 text-gray-500" />
            Request Leave
          </button>

          <button
            onClick={() => navigate("/employee/payslips")}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl shadow-sm hover:bg-gray-100 transition"
          >
            <CurrencyDollarIcon className="h-5 w-5 text-gray-500" />
            View Payslips
          </button>
        </div>
      </div>

      {/* ====================== Recent Leave Requests ======================= */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900">
          Recent Leave Requests
        </h3>

        <div className="mt-6">
          {userLeaveRequests.length === 0 ? (
            <p className="text-sm text-gray-500">No recent leave requests.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {userLeaveRequests.map((req) => (
                <li key={req.id} className="py-4 flex items-center gap-4">
                  <CalendarDaysIcon className="h-6 w-6 text-gray-500" />

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {req.type.charAt(0).toUpperCase() + req.type.slice(1)}{" "}
                      Leave
                    </p>
                    <p className="text-sm text-gray-500">
                      {req.startDate} → {req.endDate} ({req.days} days)
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      req.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : req.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {req.status.charAt(0).toUpperCase() +
                      req.status.slice(1)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* ====================== Upcoming Events ======================= */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900">
          Upcoming Events
        </h3>

        <ul className="mt-6 space-y-5">
          <li className="flex items-center gap-4">
            <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
              15
            </div>

            <div>
              <p className="text-sm font-medium text-gray-900">
                Team Meeting
              </p>
              <p className="text-sm text-gray-500">
                December 15, 2024 — 10:00 AM
              </p>
            </div>
          </li>

          <li className="flex items-center gap-4">
            <div className="h-10 w-10 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold">
              20
            </div>

            <div>
              <p className="text-sm font-medium text-gray-900">
                Performance Review
              </p>
              <p className="text-sm text-gray-500">
                December 20, 2024 — 2:00 PM
              </p>
            </div>
          </li>
        </ul>
      </div>

    </div>
  );
};

export default EmployeeDashboard;
