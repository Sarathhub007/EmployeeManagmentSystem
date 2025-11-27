import React, { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { XMarkIcon } from "@heroicons/react/24/outline";

const EmployeeForm = ({ employee, onClose }) => {
  const { addEmployee, updateEmployee, departments } = useApp();
  const isEdit = !!employee;

  const [formData, setFormData] = useState({
    employeeId: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    departmentId: "",
    position: "",
    salary: "",
    hireDate: "",
    status: "ACTIVE",
    managerId: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (employee) {
      setFormData({
        employeeId: employee.employeeId || "",
        firstName: employee.firstName || "",
        lastName: employee.lastName || "",
        email: employee.email || "",
        phone: employee.phone || "",
        departmentId: employee.department?.id || "",
        position: employee.position || "",
        salary: employee.salary?.toString() || "",
        hireDate: employee.hireDate || "",
        status: (employee.status || "ACTIVE").toUpperCase(),
        managerId: employee.managerId || "",
      });
    }
  }, [employee]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      // Validation
      if (!formData.departmentId) {
        setError("Department is required");
        setIsSubmitting(false);
        return;
      }

      const salary = parseFloat(formData.salary);
      if (isNaN(salary) || salary < 0) {
        setError("Salary must be a valid number");
        setIsSubmitting(false);
        return;
      }

      const employeeData = {
        ...(isEdit && { id: employee.id }),
        employeeId: parseInt(formData.employeeId),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone ? parseInt(formData.phone) : null,
        department: {
          id: parseInt(formData.departmentId),
        },
        position: formData.position,
        salary: salary,
        hireDate: formData.hireDate,
        status: formData.status.toUpperCase(),
        managerId: formData.managerId ? parseInt(formData.managerId) : null,
      };

      const result = isEdit
        ? await updateEmployee(employeeData)
        : await addEmployee(employeeData);

      if (!result?.success) {
        const errorMsg = result?.error?.message || "Failed to save employee";
        setError(errorMsg);
        setIsSubmitting(false);
        return;
      }

      onClose();
    } catch (err) {
      console.error("Form submission error:", err);
      setError(err.message || "Failed to save employee");
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      {/* Modal Container */}
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-gray-100 p-6 sm:p-8 animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold text-gray-900">
            {isEdit ? "Edit Employee" : "Add New Employee"}
          </h3>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="h-7 w-7" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {/* Error Message */}
          {error && (
            <div className="sm:col-span-2 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Field Template */}
          {[
            ["employeeId", "Employee ID", "number", true],
            ["firstName", "First Name", "text", true],
            ["lastName", "Last Name", "text", true],
            ["email", "Email", "email", true],
            ["phone", "Phone", "tel"],
            ["departmentId", "Department", "select", true],
            ["position", "Position", "text", true],
            ["salary", "Salary", "number", true],
            ["hireDate", "Hire Date", "date", true],
            ["managerId", "Manager ID", "number"],
            ["status", "Status", "select"],
          ].map(([name, label, type, required]) => (
            <div key={name} className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">
                {label}
              </label>

              {type === "select" ? (
                name === "departmentId" ? (
                  <select
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    required={required}
                    className="mt-1 px-3 py-2.5 rounded-xl border border-gray-300 bg-gray-50
                               focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <select
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="mt-1 px-3 py-2.5 rounded-xl border border-gray-300 bg-gray-50
                               focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                    <option value="TERMINATED">Terminated</option>
                  </select>
                )
              ) : (
                <input
                  type={type}
                  name={name}
                  required={required}
                  value={formData[name]}
                  onChange={handleChange}
                  className="mt-1 px-3 py-2.5 rounded-xl border border-gray-300 bg-gray-50
                             focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              )}
            </div>
          ))}

          {/* Buttons */}
          <div className="sm:col-span-2 flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-medium rounded-xl border border-gray-300
                         text-gray-700 bg-white hover:bg-gray-100 transition shadow-sm"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 text-sm font-semibold rounded-xl text-white bg-blue-600
                         hover:bg-blue-700 shadow-md transition disabled:opacity-50"
            >
              {isEdit ? "Update Employee" : "Create Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
