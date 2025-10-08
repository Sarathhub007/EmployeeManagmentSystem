import React, { useEffect, useState } from "react";
import { attendanceAPI, employeeAPI } from "../services/api";

// Utility function to get color based on status
function getStatusColor(status) {
  if (status === "Present") return "bg-green-100 text-green-800";
  if (status === "Absent") return "bg-red-100 text-red-800";
  return "bg-gray-100 text-gray-800";
}

function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttendance = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch employees and today's attendance in parallel
        const [employeesRes, attendanceRes] = await Promise.all([
          employeeAPI.getAll(),
          attendanceAPI.getTodayAttendance(), // your new API
        ]);

        // Map attendance status by employeeId
        const attendanceMap = {};
        attendanceRes.data.forEach((att) => {
          attendanceMap[att.employee.employeeId] = att.status;
        });

        // Merge employees with today's attendance
        const employeesWithStatus = employeesRes.data.map((emp) => ({
          ...emp,
          status: attendanceMap[emp.employeeId] || "Absent",
        }));

        setEmployees(employeesWithStatus);
      } catch (err) {
        setError("Failed to load attendance");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-32">
        <svg
          className="animate-spin h-5 w-5 text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          />
        </svg>
        <span className="ml-2 text-blue-600">Loading attendance...</span>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center mt-8">
        <p className="text-red-500 mb-2">{error}</p>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-blue-600">
        Today's Attendance
      </h2>
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {employees.map((emp) => (
              <tr key={emp.employeeId} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {emp.firstName} {emp.lastName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                      emp.status
                    )}`}
                  >
                    {emp.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Attendance;
