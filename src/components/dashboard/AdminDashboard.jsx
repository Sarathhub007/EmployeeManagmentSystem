import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  UsersIcon,
  ClockIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const AdminDashboard = () => {
  const { employees, departments, leaveRequests, dashboardStats, loadDashboardStats } = useApp();

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const stats = dashboardStats ? [
    {
      name: 'Total Employees',
      stat: dashboardStats.totalEmployees?.toString() || '0',
      icon: UsersIcon,
      change: '+12%',
      changeType: 'increase',
    },
    {
      name: 'Present Today',
      stat: dashboardStats.presentToday?.toString() || '0',
      icon: ClockIcon,
      change: '+2.1%',
      changeType: 'increase',
    },
    {
      name: 'Pending Leaves',
      stat: dashboardStats.pendingLeaves?.toString() || '0',
      icon: DocumentTextIcon,
      change: '-4.2%',
      changeType: 'decrease',
    },
    {
      name: 'Monthly Payroll',
      stat: dashboardStats.monthlyPayroll || '$0',
      icon: CurrencyDollarIcon,
      change: '+8.1%',
      changeType: 'increase',
    },
  ] : [];

  const departmentData = departments.map((dept) => ({
    name: dept.name,
    employees: dept.employeeCount,
  }));

  const leaveData = [
    { 
      name: 'Approved', 
      value: leaveRequests.filter(req => req.status === 'approved').length,
      color: '#10B981' 
    },
    { 
      name: 'Pending', 
      value: leaveRequests.filter(req => req.status === 'pending').length,
      color: '#F59E0B' 
    },
    { 
      name: 'Rejected', 
      value: leaveRequests.filter(req => req.status === 'rejected').length,
      color: '#EF4444' 
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-sm text-gray-600">
          Welcome back! Here's what's happening at your organization.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.name}
            className="relative bg-white pt-5 px-4 pb-4 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
          >
            <div>
              <div className="absolute bg-blue-500 rounded-md p-3">
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                {item.name}
              </p>
            </div>
            <div className="ml-16 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  item.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {item.change}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Employees by Department
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="employees" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Leave Requests Status
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={leaveData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {leaveData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Recent Activity
          </h3>
          <div className="mt-5">
            <div className="flow-root">
              <ul className="-mb-8">
                {employees.slice(0, 3).map((employee, idx) => (
                  <li key={employee.id}>
                    <div className="relative pb-8">
                      {idx !== 2 && (
                        <span
                          className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                          aria-hidden="true"
                        />
                      )}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
                            <UsersIcon className="h-4 w-4 text-white" aria-hidden="true" />
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-gray-500">
                              Employee{' '}
                              <span className="font-medium text-gray-900">
                                {employee.firstName} {employee.lastName}
                              </span>{' '}
                              in {employee.department || 'department'}
                            </p>
                          </div>
                          <div className="text-right text-sm whitespace-nowrap text-gray-500">
                            <time dateTime={employee.hireDate}>Recent</time>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;