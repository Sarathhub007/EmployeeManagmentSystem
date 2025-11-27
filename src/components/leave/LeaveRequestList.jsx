import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useApp } from "../../context/AppContext";
import { PlusIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import LeaveRequestForm from "./LeaveRequestForm";

const LeaveRequestList = () => {
  const { user } = useAuth();
  const {
    leaveRequests,
    employees,
    approveLeaveRequest,
    rejectLeaveRequest,
    loadLeaveRequests,
  } = useApp();

  const [showForm, setShowForm] = useState(false);

  const isAdmin = user?.role === "admin";

  // For employees, get their employee ID from localStorage (set during login)
  let currentEmployeeId = null;
  if (!isAdmin) {
    try {
      const employee = JSON.parse(localStorage.getItem("employee") || "null");
      // Use 'id' (DB ID) or 'employeeId' (business ID) depending on what backend stores
      currentEmployeeId = employee?.id || employee?.employeeId;
    } catch (e) {
      console.warn("Failed to parse employee from localStorage", e);
    }
  }

  const displayRequests = isAdmin
    ? leaveRequests
    : leaveRequests.filter((req) => {
        // Match by either DB id or business employeeId
        return req.employeeId === currentEmployeeId || req.userId === user?.id;
      });

  // Debug: log what we're filtering by
  useEffect(() => {
    if (!isAdmin) {
      console.log(
        "Employee leave requests: looking for employeeId=",
        currentEmployeeId,
        "userId=",
        user?.id,
        "found:",
        displayRequests.length,
        "out of",
        leaveRequests.length
      );
    }
  }, [
    isAdmin,
    currentEmployeeId,
    user?.id,
    displayRequests.length,
    leaveRequests.length,
  ]);

  const getEmployeeName = (employeeId) => {
    // Try to find employee by DB id or business employeeId
    let employee = employees.find((emp) => emp.id === employeeId);
    if (!employee) {
      employee = employees.find((emp) => emp.employeeId === employeeId);
    }
    if (!employee) {
      return `Unknown Employee (ID: ${employeeId})`;
    }
    // Try both camelCase and snake_case field names
    const first = employee.firstName || employee.first_name || "";
    const last = employee.lastName || employee.last_name || "";
    return `${first} ${last}`.trim();
  };

  useEffect(() => {
    // Load leave requests only once on component mount
    // (no dependency on loadLeaveRequests to avoid infinite re-fetches)
    loadLeaveRequests();
  }, []);

  const handleApprove = async (id) => {
    await approveLeaveRequest(id);
    loadLeaveRequests();
  };

  const handleReject = async (id) => {
    await rejectLeaveRequest(id);
    loadLeaveRequests();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {isAdmin ? "Leave Requests" : "My Leave Requests"}
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            {isAdmin
              ? "Manage all employee leave applications."
              : "Track and manage your applied leaves."}
          </p>
        </div>

        {!isAdmin && (
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl shadow hover:bg-blue-700 transition"
          >
            <PlusIcon className="h-5 w-5" />
            Request Leave
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {isAdmin && (
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Employee
                </th>
              )}
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Applied On
              </th>
              {isAdmin && (
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {displayRequests.map((request) => {
              const start = format(new Date(request.startDate), "MMM dd, yyyy");
              const end = format(new Date(request.endDate), "MMM dd, yyyy");
              const applied = format(
                new Date(request.appliedOn),
                "MMM dd, yyyy"
              );

              return (
                <tr key={request.id} className="hover:bg-gray-50 transition">
                  {/* Employee Name */}
                  {isAdmin && (
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {getEmployeeName(request.employeeId)}
                    </td>
                  )}

                  {/* Type */}
                  <td className="px-6 py-4 capitalize text-gray-800">
                    {request.type.replace("-", " ")}
                  </td>

                  {/* Duration */}
                  <td className="px-6 py-4">
                    <div className="text-gray-900">
                      {start} → {end}
                    </div>
                    <div className="text-gray-500 text-xs">
                      {request.days} day{request.days > 1 ? "s" : ""}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`
                        px-2.5 py-1 rounded-full text-xs font-medium
                        ${
                          request.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : request.status === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }
                      `}
                    >
                      {request.status.charAt(0).toUpperCase() +
                        request.status.slice(1)}
                    </span>
                  </td>

                  {/* Applied On */}
                  <td className="px-6 py-4 text-gray-900">{applied}</td>

                  {isAdmin && (
                    <td className="px-6 py-4">
                      {request.status?.toLowerCase() === "pending" ? (
                        <div className="flex items-center justify-end gap-2">
                          {/* Approve */}
                          <button
                            onClick={() => handleApprove(request.id)}
                            className="p-2 rounded-lg bg-green-50 text-green-600 border border-green-200 hover:bg-green-100 transition"
                            title="Approve"
                          >
                            <CheckIcon className="h-4 w-4" />
                          </button>

                          {/* Reject */}
                          <button
                            onClick={() => handleReject(request.id)}
                            className="p-2 rounded-lg bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition"
                            title="Reject"
                          >
                            <XMarkIcon className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-end">
                          <span className="text-gray-400 italic text-xs">
                            No action
                          </span>
                        </div>
                      )}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Empty State */}
        {displayRequests.length === 0 && (
          <div className="py-10 text-center text-gray-500">
            <p>
              {isAdmin
                ? "No leave requests found."
                : "You have no leave requests. Click 'Request Leave' to create one."}
            </p>
            {!isAdmin && (
              <p className="text-xs text-gray-400 mt-2">
                (Looking for employee ID: {currentEmployeeId || "unknown"})
              </p>
            )}
          </div>
        )}
      </div>

      {showForm && <LeaveRequestForm onClose={() => setShowForm(false)} />}
    </div>
  );
};

export default LeaveRequestList;
