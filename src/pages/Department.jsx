import React, { useEffect, useState } from "react";
import { employeeAPI } from "../services/api";

function Department() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch employees from backend
  const loadEmployees = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await employeeAPI.getAll();
      setEmployees(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  // Compute departments dynamically
  useEffect(() => {
    if (employees.length === 0) return;

    const deptMap = {};

    employees.forEach((emp) => {
      // Adjust based on your backend: either a nested department object or separate fields
      const deptObj =
        emp.department || {
          id: emp.departmentId || "unknown",
          name: emp.departmentName || "Unknown",
          description: "",
        };

      if (!deptMap[deptObj.id]) {
        deptMap[deptObj.id] = {
          id: deptObj.id,
          name: deptObj.name,
          description: deptObj.description || "",
          manager: "",
          employeeCount: 0,
        };
      }

      deptMap[deptObj.id].employeeCount += 1;

      // Set manager if employee role is manager
      if (emp.role?.toLowerCase() === "manager") {
        deptMap[deptObj.id].manager = `${emp.firstName} ${emp.lastName}`;
      }
    });

    setDepartments(Object.values(deptMap));
  }, [employees]);

  if (loading) return <p className="text-center mt-8">Loading employees...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-blue-600">Departments</h2>
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manager</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employees</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {departments.map((dept) => (
              <tr key={dept.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dept.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dept.manager || "-"}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dept.employeeCount}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dept.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Department;
