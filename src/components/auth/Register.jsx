import React, { useState } from "react";
import { authAPI } from "../../services/api";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    roles: "EMPLOYEE",
    phone: "",
    department: "",
    employeeId: "",
    position: "",
    salary: "",
    hireDate: "",
    createdAt: "",
    updatedAt: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        phone: parseInt(formData.phone),
        employeeId: parseInt(formData.employeeId),
        salary: parseInt(formData.salary),
        createdAt: formData.createdAt ? new Date(formData.createdAt) : new Date(),
        updatedAt: formData.updatedAt ? new Date(formData.updatedAt) : new Date(),
        hireDate: formData.hireDate || new Date().toISOString().split("T")[0],
      };

      const response = await authAPI.register(payload);
      setMessage(response.data.message || "User registered successfully!");
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed. Try again!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 bg-white rounded-2xl shadow-xl p-10 border border-gray-100">

      <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
        Employee Registration
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Input =================================== */}
        {[
          ["firstName", "First Name", "text"],
          ["lastName", "Last Name", "text"],
          ["email", "Email", "email"],
          ["password", "Password", "password"],
          ["employeeId", "Employee ID", "number"],
          ["department", "Department", "text"],
          ["phone", "Phone Number", "number"],
          ["position", "Position", "text"],
          ["salary", "Salary", "number"],
          ["hireDate", "Hire Date", "date"],
          ["createdAt", "Created At", "datetime-local"],
          ["updatedAt", "Updated At", "datetime-local"],
        ].map(([name, label, type]) => (
          <div key={name} className="flex flex-col gap-1">
            <label className="text-gray-700 font-medium">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              required={name !== "createdAt" && name !== "updatedAt"}
              className="px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 
                         focus:bg-white shadow-sm
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        ))}

        {/* Role */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-700 font-medium">Role</label>
          <select
            name="roles"
            value={formData.roles}
            onChange={handleChange}
            className="px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 
                       focus:bg-white shadow-sm
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="EMPLOYEE">Employee</option>
            <option value="MANAGER">Manager</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="col-span-1 md:col-span-2 w-full py-3 mt-4 rounded-xl bg-blue-600 
            hover:bg-blue-700 text-white font-semibold shadow-lg hover:shadow-xl
            transition-all"
        >
          Register
        </button>
      </form>

      {message && (
        <p className="text-center text-green-700 bg-green-50 border border-green-200 
          p-3 rounded-lg font-medium mt-6">
          {message}
        </p>
      )}
    </div>
  );
}
