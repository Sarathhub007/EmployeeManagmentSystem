import React, { useState, useEffect } from "react";
import { authAPI } from "../../services/api";
import { useApp } from "../../context/AppContext";

const Register = () => {
  const { departments, employees } = useApp(); // use context to get departments & managers

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    department_id: "",
    position: "",
    salary: "",
    hire_date: "",
    manager_id: "",
    role: "",
    employee_id: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await authAPI.register({
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        phone: form.phone,
        department_id: form.department_id,
        position: form.position,
        salary: form.salary,
        hire_date: form.hire_date,
        manager_id: form.manager_id,
        role: form.role,
        employee_id: form.employee_id,
        password: form.password,
      });
      setSuccess("Employee registered successfully!");
      setForm({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        department_id: "",
        position: "",
        salary: "",
        hire_date: "",
        manager_id: "",
        role: "",
        employee_id: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Register Employee</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {success && <div className="text-green-500 mb-2">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={form.first_name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={form.last_name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        {/* <select
          name="department_id"
          value={form.department_id}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Department</option>
          {departments.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select> */}

        <input
          type="text"
          name="position"
          placeholder="Position"
          value={form.position}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={form.salary}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          name="hire_date"
          value={form.hire_date}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        {/* <select
          name="manager_id"
          value={form.manager_id}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Manager</option>
          {employees.map((e) => (
            <option key={e.id} value={e.id}>
              {e.first_name} {e.last_name}
            </option>
          ))}
        </select> */}

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="employee">Employee</option>
        </select>

        <input
          type="text"
          name="employee_id"
          placeholder="Employee ID (optional)"
          value={form.employee_id}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;