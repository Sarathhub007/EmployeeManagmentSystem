import React, { useEffect, useState } from "react";
import { attendanceAPI } from "../services/api";
import { useApp } from "../context/AppContext";

function AttendanceList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);
  const { employees: ctxEmployees, loadEmployees, addCheckIn } = useApp();

  // derive attendance from context
  useEffect(() => {
    if (Array.isArray(ctxEmployees)) {
      setEmployees(
        ctxEmployees.map((emp) => ({
          ...emp,
          status: emp.status || "Absent",
        }))
      );
    }
  }, [ctxEmployees]);

  // Toggle Present / Absent
  const handleToggle = async (employeeId) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.employeeId === employeeId
          ? { ...emp, status: emp.status === "Present" ? "Absent" : "Present" }
          : emp
      )
    );

    try {
      await addCheckIn(employeeId);
    } catch (err) {
      console.error(err);

      // revert on failure
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.employeeId === employeeId
            ? {
                ...emp,
                status: emp.status === "Present" ? "Absent" : "Present",
              }
            : emp
        )
      );
    }
  };

  // Save all attendance
  const handleSave = async () => {
    try {
      const attendanceData = employees.map((emp) => ({
        employeeId: emp.employeeId,
        status: emp.status,
      }));

      if (attendanceAPI.saveAll) {
        await attendanceAPI.saveAll(attendanceData);
      } else {
        for (const emp of attendanceData) {
          await addCheckIn(emp.employeeId);
        }
      }

      // Show toast instead of alert
      setToast({ type: "success", message: "Attendance saved successfully!" });
      setTimeout(() => setToast(null), 3000);
    } catch (err) {
      console.error(err);
      setToast({ type: "error", message: "Failed to save attendance" });
      setTimeout(() => setToast(null), 3000);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin h-7 w-7 border-4 border-blue-300 border-t-blue-600 rounded-full"></div>
        <span className="ml-3 text-blue-600 font-medium">Loading attendance...</span>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col justify-center items-center mt-10">
        <p className="text-red-500 text-sm">{error}</p>
        <button
          onClick={loadEmployees}
          className="mt-3 px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-semibold mb-6 text-blue-700 tracking-tight">
        Attendance List
      </h2>

      <div className="bg-white shadow-md rounded-xl border border-gray-200 overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Employee
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Mark Attendance
              </th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr key={emp.employeeId} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                  {emp.firstName} {emp.lastName}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${
                      emp.status === "Present"
                        ? "bg-green-100 text-green-700 border-green-300"
                        : "bg-red-100 text-red-700 border-red-300"
                    }`}
                  >
                    {emp.status}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {/* iOS-style toggle switch */}
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={emp.status === "Present"}
                      onChange={() => handleToggle(emp.employeeId)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-600 transition"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition"></div>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Save button */}
      <div className="mt-5 flex justify-end">
        <button
          onClick={handleSave}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 active:scale-95 transition"
        >
          Save Attendance
        </button>
      </div>

      {/* Toast notification */}
      {toast && (
        <div
          className={`fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-lg text-white font-medium transition-opacity ${
            toast.type === "success"
              ? "bg-green-500"
              : "bg-red-500"
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}

export default AttendanceList;
