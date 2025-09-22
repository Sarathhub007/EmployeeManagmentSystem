import React, { useState } from "react";
import { authAPI } from "../../services/api";
import { useApp } from "../../context/AppContext";
import { 
  User, Mail, Phone, Building, Briefcase, DollarSign, Calendar, Users, Shield, Eye, EyeOff, CheckCircle, AlertCircle 
} from "lucide-react";

const Register = () => {
  const { departments, employees } = useApp(); // from context

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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

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
      setCurrentStep(1);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  const nextStep = () => { if (currentStep < 3) setCurrentStep(currentStep + 1); };
  const prevStep = () => { if (currentStep > 1) setCurrentStep(currentStep - 1); };

  const isStep1Valid = form.first_name && form.last_name && form.email;
  const isStep2Valid = form.department_id && form.position && form.role;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg">
            <Users className="h-8 w-8 text-white" />
          </div>
          <h1 className="mt-6 text-3xl font-bold text-gray-900">Register New Employee</h1>
          <p className="mt-2 text-sm text-gray-600">Add a new team member to your organization</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-20 h-1 ml-4 ${step < currentStep ? 'bg-blue-600' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4 space-x-16">
            <span className="text-xs text-gray-500">Personal Info</span>
            <span className="text-xs text-gray-500">Work Details</span>
            <span className="text-xs text-gray-500">Security</span>
          </div>
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 space-y-6">
          {/* Success/Error Messages */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
          {success && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
              <p className="text-green-600 text-sm">{success}</p>
            </div>
          )}

          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 mb-6">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input type="text" name="first_name" value={form.first_name} onChange={handleChange} placeholder="Enter first name"
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white transition-all duration-200" />
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input type="text" name="last_name" value={form.last_name} onChange={handleChange} placeholder="Enter last name"
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white transition-all duration-200" />
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter email"
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white transition-all duration-200" />
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="Enter phone"
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white transition-all duration-200" />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Work Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 mb-6">Work Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department *</label>
                  <Building className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <select name="department_id" value={form.department_id} onChange={handleChange} className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white transition-all duration-200 appearance-none">
                    <option value="">Select Department</option>
                    {departments.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
                  </select>
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Position *</label>
                  <Briefcase className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input type="text" name="position" value={form.position} onChange={handleChange} placeholder="Enter position"
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white transition-all duration-200" />
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Salary</label>
                  <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input type="number" name="salary" value={form.salary} onChange={handleChange} placeholder="Enter salary"
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white transition-all duration-200" />
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hire Date</label>
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input type="date" name="hire_date" value={form.hire_date} onChange={handleChange} className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white transition-all duration-200" />
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Manager</label>
                  <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <select name="manager_id" value={form.manager_id} onChange={handleChange} className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white transition-all duration-200 appearance-none">
                    <option value="">Select Manager</option>
                    {employees.map((e) => <option key={e.id} value={e.id}>{e.first_name} {e.last_name}</option>)}
                  </select>
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role *</label>
                  <Shield className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <select name="role" value={form.role} onChange={handleChange} className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white transition-all duration-200 appearance-none">
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="employee">Employee</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Employee ID (Optional)</label>
                  <input type="text" name="employee_id" value={form.employee_id} onChange={handleChange} placeholder="Enter Employee ID"
                    className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white transition-all duration-200" />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Security */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 mb-6">Security Settings</h3>
              <div className="space-y-6">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                  <input type={showPassword ? "text" : "password"} name="password" value={form.password} onChange={handleChange} placeholder="Create a password"
                    className="w-full pl-3 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white transition-all duration-200" />
                  <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                  </button>
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password *</label>
                  <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm password"
                    className="w-full pl-3 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white transition-all duration-200" />
                  <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                  </button>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                  <h4 className="text-sm font-medium text-blue-800 mb-2">Password Requirements</h4>
                  <ul className="text-xs text-blue-700 space-y-1">
                    <li>• At least 8 characters long</li>
                    <li>• Include uppercase and lowercase letters</li>
                    <li>• Include at least one number</li>
                    <li>• Include at least one special character</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button type="button" onClick={prevStep} className={`px-6 py-3 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200 ${currentStep === 1 ? 'invisible' : ''}`}>Previous</button>

            {currentStep < 3 ? (
              <button type="button" onClick={nextStep} disabled={(currentStep===1 && !isStep1Valid)||(currentStep===2 && !isStep2Valid)}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-medium hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl">
                Next Step
              </button>
            ) : (
              <button type="submit" className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl text-sm font-medium hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                Register Employee
              </button>
            )}
          </div>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">All employee data is encrypted and stored securely</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
