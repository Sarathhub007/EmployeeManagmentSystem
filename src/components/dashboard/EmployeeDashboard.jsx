import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import {
  ClockIcon,
  CalendarDaysIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const { leaveRequests } = useApp();
  const navigate = useNavigate();
  
  const userLeaveRequests = leaveRequests.filter(req => req.employeeId === user?.id);

  const stats = [
    {
      name: 'Hours This Week',
      stat: '40',
      icon: ClockIcon,
      change: '+2 hrs from last week',
      changeType: 'increase',
    },
    {
      name: 'Leave Balance',
      stat: '18 days',
      icon: CalendarDaysIcon,
      change: '6 days used this year',
      changeType: 'neutral',
    },
    {
      name: 'Last Payslip',
      stat: '$6,250',
      icon: CurrencyDollarIcon,
      change: 'November 2024',
      changeType: 'neutral',
    },
    {
      name: 'Performance Score',
      stat: '4.8/5',
      icon: ChartBarIcon,
      change: '+0.2 from last review',
      changeType: 'increase',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Welcome back, {user?.firstName}!
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Here's your personal dashboard with your latest updates.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div key={item.name} className="relative bg-white pt-5 px-4 pb-4 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
            <div>
              <div className="absolute bg-blue-500 rounded-md p-3">
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 text-sm font-medium text-gray-500 truncate">{item.name}</p>
            </div>
            <div className="ml-16 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
            </div>
            <div className="ml-16 mt-1">
              <p className="text-xs text-gray-500">{item.change}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Quick Actions</h3>
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <button
              className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <ClockIcon className="h-5 w-5 mr-2 text-gray-400" />
              Clock In/Out
            </button>
            <button
              className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => navigate('/employee/leave-requests')}
            >
              <CalendarDaysIcon className="h-5 w-5 mr-2 text-gray-400" />
              Request Leave
            </button>
            <button
              className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => navigate('/employee/payslips')}
            >
              <CurrencyDollarIcon className="h-5 w-5 mr-2 text-gray-400" />
              View Payslips
            </button>
          </div>
        </div>
      </div>

      {/* Recent Leave Requests */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Leave Requests</h3>
          <div className="mt-5">
            {userLeaveRequests.length === 0 ? (
              <p className="text-sm text-gray-500">No recent leave requests.</p>
            ) : (
              <div className="flow-root">
                <ul className="-my-5 divide-y divide-gray-200">
                  {userLeaveRequests.map((request) => (
                    <li key={request.id} className="py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <CalendarDaysIcon className="h-6 w-6 text-gray-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {request.type.charAt(0).toUpperCase() + request.type.slice(1)} Leave
                          </p>
                          <p className="text-sm text-gray-500">
                            {request.startDate} to {request.endDate} ({request.days} days)
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              request.status === 'approved'
                                ? 'bg-green-100 text-green-800'
                                : request.status === 'rejected'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Upcoming Events</h3>
          <div className="mt-5">
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                <li className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">15</span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">Team Meeting</p>
                      <p className="text-sm text-gray-500">December 15, 2024 at 10:00 AM</p>
                    </div>
                  </div>
                </li>
                <li className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">20</span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">Performance Review</p>
                      <p className="text-sm text-gray-500">December 20, 2024 at 2:00 PM</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
