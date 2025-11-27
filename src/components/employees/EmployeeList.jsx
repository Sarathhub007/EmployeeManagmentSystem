import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import EmployeeForm from "./EmployeeForm";

const EmployeeList = () => {
  const { employees, deleteEmployee } = useApp();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const departments = [
    ...new Map(
      employees.map((emp) => [emp.department?.id, emp.department])
    ).values(),
  ];

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.employeeId?.toString().includes(searchTerm);

    const matchesDepartment =
      !filterDepartment || employee.department?.id === parseInt(filterDepartment);

    return matchesSearch && matchesDepartment;
  });

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      const result = await deleteEmployee(id);
      if (!result.success) alert("Failed to delete employee");
    }
  };

  const openAddForm = () => {
    setEditingEmployee(null);
    setShowForm(true);
  };

  const openEditForm = (employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  return (
    <>
      {showForm && (
        <EmployeeForm employee={editingEmployee} onClose={() => setShowForm(false)} />
      )}

      <div className="space-y-10">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Employees</h1>
            <p className="text-gray-600 mt-1">
              Manage employee details, departments, status, and more.
            </p>
          </div>

          <button
            onClick={openAddForm}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700
                       text-white text-sm font-semibold rounded-xl shadow-md transition"
          >
            <PlusIcon className="h-5 w-5" />
            Add Employee
          </button>
        </div>

        {/* ======================= Search & Filter ======================= */}
        <div className="bg-white p-6 rounded-2xl shadow border border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* Search */}
            <div className="relative">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 bg-gray-50 rounded-xl border border-gray-300
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
              />
            </div>

            {/* Department Filter */}
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="w-full px-3 py-2.5 bg-gray-50 rounded-xl border border-gray-300
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
            >
              <option value="">All Departments</option>
              {departments.map((dept) => (
                <option key={dept?.id} value={dept?.id}>
                  {dept?.name}
                </option>
              ))}
            </select>

          </div>
        </div>

        {/* ======================= Employee Table ======================= */}
        <div className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {["Employee", "Department", "Position", "Status", "Salary", ""].map(
                  (header, index) => (
                    <th
                      key={index}
                      className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50 transition">
                  
                  {/* Employee Cell */}
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-11 w-11 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-700 font-semibold">
                          {employee.firstName?.[0] || ""}
                          {employee.lastName?.[0] || ""}
                        </span>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-bold text-gray-900">
                          {employee.firstName} {employee.lastName}
                        </p>
                        <p className="text-sm text-gray-500">{employee.email}</p>
                        <p className="text-xs text-gray-400">ID: {employee.employeeId}</p>
                      </div>
                    </div>
                  </td>

                  {/* Department */}
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {employee.department?.name || "N/A"}
                  </td>

                  {/* Position */}
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {employee.position || "N/A"}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        employee.status?.toLowerCase() === "active"
                          ? "bg-green-100 text-green-700"
                          : employee.status?.toLowerCase() === "inactive"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {employee.status || "Active"}
                    </span>
                  </td>

                  {/* Salary */}
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    ${employee.salary?.toLocaleString() || "0"}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => openEditForm(employee)}
                      className="text-blue-600 hover:text-blue-900 mr-3 transition"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>

                    <button
                      onClick={() => handleDelete(employee.id)}
                      className="text-red-600 hover:text-red-900 transition"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default EmployeeList;
