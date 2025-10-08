import React, { useState } from "react";
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

  const handleApprove = async (requestId) => {
    await approveLeaveRequest(requestId);
    loadLeaveRequests();
  };

  const handleReject = async (requestId) => {
    await rejectLeaveRequest(requestId);
    loadLeaveRequests();
  };

  const [showForm, setShowForm] = useState(false);

  const isAdmin = user?.role === "admin";
  const displayRequests = isAdmin
    ? leaveRequests
    : leaveRequests.filter((req) => req.employeeId === user?.id);

  const getEmployeeName = (employeeId) => {
    const employee = employees.find((emp) => emp.id === employeeId);
    return employee
      ? `${employee.firstName} ${employee.lastName}`
      : "Unknown Employee";
  };

  // const handleApprove = async (requestId) => {
  //   const request = leaveRequests.find((req) => req.id === requestId);
  //   if (request) {
  //     await updateLeaveRequest({ ...request, status: 'approved' });
  //     loadLeaveRequests();
  //   }
  // };

  // const handleReject = async (requestId) => {
  //   const request = leaveRequests.find((req) => req.id === requestId);
  //   if (request) {
  //     await updateLeaveRequest({ ...request, status: 'rejected' });
  //     loadLeaveRequests();
  //   }
  // };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">
            {isAdmin ? "Leave Requests" : "My Leave Requests"}
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            {isAdmin
              ? "Manage leave requests from all employees."
              : "View and manage your leave requests."}
          </p>
        </div>
        {!isAdmin && (
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Request Leave
            </button>
          </div>
        )}
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {isAdmin && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
              )}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Applied On
              </th>
              {isAdmin && (
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayRequests.map((request) => (
              <tr key={request.id} className="hover:bg-gray-50">
                {isAdmin && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {getEmployeeName(request.employeeId)}
                    </div>
                  </td>
                )}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 capitalize">
                    {request.type.replace("-", " ")}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {format(new Date(request.startDate), "MMM dd")} -{" "}
                    {format(new Date(request.endDate), "yyyy mm, dd ")}
                  </div>
                  <div className="text-sm text-gray-500">
                    {request.days} day{request.days !== 1 ? "s" : ""}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      request.status.toLowerCase() === "approved"
                        ? "bg-green-100 text-green-800"
                        : request.status.toLowerCase() === "rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {request.status.charAt(0).toUpperCase() +
                      request.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {format(new Date(request.appliedOn), "MMM dd, yyyy")}
                </td>
                {isAdmin && request.status.toLowerCase() === "pending" && (
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleApprove(request.id)}
                      className="text-green-600 hover:text-green-900 mr-3"
                      title="Approve"
                    >
                      <CheckIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleReject(request.id)}
                      className="text-red-600 hover:text-red-900"
                      title="Reject"
                    >
                      <XMarkIcon className="h-4 w-4" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {displayRequests.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No leave requests found.</p>
          </div>
        )}
      </div>

      {showForm && <LeaveRequestForm onClose={() => setShowForm(false)} />}
    </div>
  );
};

export default LeaveRequestList;
