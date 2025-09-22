import React, { useState, useEffect } from 'react';
import { XMarkIcon, UserPlusIcon, PencilSquareIcon } from '@heroicons/react/24/outline';

// Mock context for demo purposes
const mockContext = {
  addEmployee: (employee) => console.log('Adding employee:', employee),
  updateEmployee: (employee) => console.log('Updating employee:', employee)
};

const useApp = () => mockContext;

const EmployeeForm = ({ employee, onClose }) => {
  const { addEmployee, updateEmployee } = useApp();
  const isEdit = !!employee;

  const [formData, setFormData] = useState({
    employeeId: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    position: '',
    salary: '',
    hireDate: '',
    status: 'active',
    manager: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (employee) {
      setFormData({
        employeeId: employee.employeeId,
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        phone: employee.phone,
        department: employee.department,
        position: employee.position,
        salary: employee.salary.toString(),
        hireDate: employee.hireDate,
        status: employee.status,
        manager: employee.manager || '',
      });
    }
  }, [employee]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const employeeData = {
      id: employee?.id || Date.now().toString(),
      employeeId: formData.employeeId,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      department: formData.department,
      position: formData.position,
      salary: parseInt(formData.salary),
      hireDate: formData.hireDate,
      status: formData.status,
      manager: formData.manager || undefined,
    };

    if (isEdit) {
      updateEmployee(employeeData);
    } else {
      addEmployee(employeeData);
    }

    setIsSubmitting(false);
    onClose();
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'terminated':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl transform transition-all duration-300 ease-out scale-100">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-2xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                {isEdit ? (
                  <PencilSquareIcon className="h-6 w-6 text-white" />
                ) : (
                  <UserPlusIcon className="h-6 w-6 text-white" />
                )}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  {isEdit ? 'Edit Employee' : 'Add New Employee'}
                </h3>
                <p className="text-blue-100 text-sm">
                  {isEdit ? 'Update employee information' : 'Create a new employee record'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-200"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="p-8">
          <div onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information Section */}
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h4>
              </div>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Employee ID *
                  </label>
                  <input
                    type="text"
                    name="employeeId"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    value={formData.employeeId}
                    onChange={handleChange}
                    placeholder="e.g., EMP001"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Status
                  </label>
                  <select
                    name="status"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${getStatusColor(formData.status)}`}
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="terminated">Terminated</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Hire Date *
                  </label>
                  <input
                    type="date"
                    name="hireDate"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    value={formData.hireDate}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="space-y-6">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h4>
              </div>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@company.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            </div>

            {/* Job Information Section */}
            <div className="space-y-6">
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Job Information</h4>
              </div>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Department *
                  </label>
                  <input
                    type="text"
                    name="department"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    value={formData.department}
                    onChange={handleChange}
                    placeholder="e.g., Engineering"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Position *
                  </label>
                  <input
                    type="text"
                    name="position"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    value={formData.position}
                    onChange={handleChange}
                    placeholder="e.g., Software Engineer"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Annual Salary *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500">$</span>
                    <input
                      type="number"
                      name="salary"
                      required
                      className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      value={formData.salary}
                      onChange={handleChange}
                      placeholder="75000"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Manager
                  </label>
                  <input
                    type="text"
                    name="manager"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    value={formData.manager}
                    onChange={handleChange}
                    placeholder="Manager's name (optional)"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-8 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-8 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200 focus:ring-2 focus:ring-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                onClick={handleSubmit}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 border border-transparent rounded-lg text-sm font-medium text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>{isEdit ? 'Updating...' : 'Creating...'}</span>
                  </>
                ) : (
                  <span>{isEdit ? 'Update Employee' : 'Create Employee'}</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Demo component
export default function Demo() {
  const [showForm, setShowForm] = useState(true);
  const [employee] = useState({
    id: '1',
    employeeId: 'EMP001',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    phone: '+1 (555) 123-4567',
    department: 'Engineering',
    position: 'Senior Software Engineer',
    salary: 95000,
    hireDate: '2023-01-15',
    status: 'active',
    manager: 'Jane Smith'
  });

  if (!showForm) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <button
          onClick={() => setShowForm(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Show Employee Form
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <EmployeeForm
        employee={employee} // Pass employee for edit mode, or null for create mode
        onClose={() => setShowForm(false)}
      />
    </div>
  );
}