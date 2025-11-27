import React from "react";
import { useApp } from "../context/AppContext";

function Department() {
  const { departments, loading, error, loadDepartments } = useApp();

  /* ---------------------- Loading State ---------------------- */
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-300 border-t-blue-600 mx-auto mb-3"></div>
          <p className="text-gray-600 font-medium">Loading departments...</p>
        </div>
      </div>
    );
  }

  /* ---------------------- Error State ---------------------- */
  if (error) {
    return (
      <div className="max-w-6xl mx-auto mt-12 px-4">
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 shadow">
          <p className="text-red-700 font-semibold">Error: {error}</p>
        </div>
      </div>
    );
  }

  /* ---------------------- Empty State ---------------------- */
  if (!departments || departments.length === 0) {
    return (
      <div className="max-w-6xl mx-auto mt-12 px-4">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Departments</h2>

        <div className="bg-white shadow-lg rounded-xl p-12 text-center border">
          <svg
            className="w-20 h-20 mx-auto mb-4 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
          <p className="text-gray-500 text-lg">No departments found</p>
        </div>
      </div>
    );
  }

  /* ---------------------- Main Content ---------------------- */
  return (
    <div className="max-w-7xl mx-auto mt-10 px-4 py-4">
      <header className="mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-1">
          Departments
        </h2>
        <p className="text-gray-600">
          Manage your organization's departments and structure.
        </p>
      </header>

      {/* Department Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept) => (
          <div
            key={dept.id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold truncate">
                  {dept.name}
                </h3>
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold">
                  ID: {dept.id}
                </span>
              </div>
              <p className="text-blue-100 text-sm line-clamp-2">
                {dept.description || "No description available"}
              </p>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5">
              {/* Manager Section */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs uppercase font-semibold text-gray-500 tracking-wide">
                    Manager
                  </p>
                  <p className="text-sm font-medium text-gray-900 mt-1">
                    {dept.managerName || "Not Assigned"}
                  </p>
                </div>
              </div>

              {/* Employee Count */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs uppercase font-semibold text-gray-500 tracking-wide">
                    Employees
                  </p>
                  <p className="text-sm font-medium text-gray-900 mt-1">
                    {dept.employeeCount || 0}{" "}
                    {dept.employeeCount === 1 ? "Employee" : "Employees"}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-3 border-t flex justify-between text-xs text-gray-500">
              <span>Department #{dept.id}</span>
              {dept.managerId && (
                <span className="text-blue-600 font-medium">
                  Manager ID: {dept.managerId}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {/* Total Departments */}
          <div>
            <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              {departments.length}
            </p>
            <p className="text-sm text-gray-600 mt-1">Total Departments</p>
          </div>

          {/* Total Employees */}
          <div>
            <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 text-transparent bg-clip-text">
              {departments.reduce(
                (sum, dept) => sum + (dept.employeeCount || 0),
                0
              )}
            </p>
            <p className="text-sm text-gray-600 mt-1">Total Employees</p>
          </div>

          {/* With Managers */}
          <div>
            <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
              {
                departments.filter(
                  (dept) =>
                    dept.managerName && dept.managerName !== "Not Assigned"
                ).length
              }
            </p>
            <p className="text-sm text-gray-600 mt-1">Departments with Managers</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Department;
