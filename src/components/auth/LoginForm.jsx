import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [focusedInput, setFocusedInput] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    const result = await login(formData.email, formData.password);

    if (result.success) {
      if (result.user.role === "admin") navigate("/admin/dashboard");
      else navigate("/employee/dashboard");
    } else {
      setError(result.message || "Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg">
            <span className="text-white text-2xl font-bold">EMS</span>
          </div>
          <h1 className="mt-6 text-3xl font-bold text-gray-900">Welcome back</h1>
          <p className="mt-2 text-sm text-gray-600">Sign in to your Employee Management System</p>
        </div>

        {/* Login Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 space-y-6"
        >
          {/* Email Input */}
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setFocusedInput("email")}
              onBlur={() => setFocusedInput("")}
              className="appearance-none relative block w-full px-3 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 transition-all duration-200 hover:border-gray-400 bg-gray-50 focus:bg-white"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              onFocus={() => setFocusedInput("password")}
              onBlur={() => setFocusedInput("")}
              className="appearance-none relative block w-full px-3 py-3 pr-12 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 transition-all duration-200 hover:border-gray-400 bg-gray-50 focus:bg-white"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5 text-gray-400" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>

          {/* Error */}
          {error && <div className="text-red-600 text-sm text-center">{error}</div>}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
