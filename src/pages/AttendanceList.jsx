import React, { useEffect, useState } from "react";
import { attendanceAPI, employeeAPI } from "../services/api";

function AttendanceList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toggleLoading, setToggleLoading] = useState({}); // Track per-employee toggle

  // Fetch employees from backend
  const loadEmployees = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await employeeAPI.getAll();
      const employeesWithStatus = response.data.map((emp) => ({
        ...emp,
        status: emp.status || "Absent", // Default Absent
      }));
      setEmployees(employeesWithStatus);
    } catch (err) {
      setError("Failed to load employees");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  // Toggle Present / Absent
  const handleToggle = (employeeId) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.employeeId === employeeId
          ? { ...emp, status: emp.status === "Present" ? "Absent" : "Present" }
          : emp
      )
    );
  };

  // Save all attendance
  const handleSave = async () => {
    try {
      const attendanceData = employees.map((emp) => ({
        employeeId: emp.employeeId,
        status: emp.status,
      }));

      console.log("🧾 Attendance Data before saving:", attendanceData);

      attendanceData.forEach((emp, index) => {
        console.log(`Employee ${index + 1}:`, emp);
      });

      await attendanceAPI.saveAll(attendanceData);

      alert("Attendance saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save attendance");
    }
  };

  const Spinner = () => (
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
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8H4z"
      ></path>
    </svg>
  );

  if (loading)
    return (
      <div className="flex justify-center items-center h-32">
        <Spinner />
        <span className="ml-2 text-blue-600">Loading employees...</span>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center mt-8">
        <p className="text-red-500 mb-2">{error}</p>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={loadEmployees}
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-blue-600">
        Attendance List
      </h2>

      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table
          className="min-w-full divide-y divide-gray-200"
          aria-label="Attendance List"
        >
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mark
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
                    className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                      emp.status === "Present"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {emp.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={emp.status === "Present"}
                      onChange={() => handleToggle(emp.employeeId)}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      {emp.status}
                    </span>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Save button */}
      <div className="mt-4 flex justify-end">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={handleSave}
        >
          Save Attendance
        </button>
      </div>
    </div>
  );
}

export default AttendanceList;
