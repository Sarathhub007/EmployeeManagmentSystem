import React from 'react';

const summary = [
  { label: 'Total Employees', value: 28 },
  { label: 'Departments', value: 3 },
  { label: 'Leaves This Month', value: 7 },
  { label: 'Payroll Paid', value: '$185,000' },
];

const attendanceData = [
  { name: 'Present', value: 22, color: '#10B981' },
  { name: 'Absent', value: 6, color: '#EF4444' },
];

function Reports() {
  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-6 text-blue-600">Reports Dashboard</h2>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {summary.map((item) => (
          <div key={item.label} className="bg-white shadow rounded-lg p-6 text-center">
            <div className="text-sm text-gray-500 mb-2">{item.label}</div>
            <div className="text-2xl font-bold text-blue-600">{item.value}</div>
          </div>
        ))}
      </div>

      {/* Attendance Pie Chart (static) */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Attendance Overview</h3>
        <div className="flex items-center justify-center">
          <svg width="180" height="180" viewBox="0 0 36 36" className="mr-8">
            <circle cx="18" cy="18" r="16" fill="#F3F4F6" />
            {/* Present */}
            <path
              d="M18 2 a 16 16 0 0 1 14.5 9.3"
              fill="none"
              stroke="#10B981"
              strokeWidth="4"
            />
            {/* Absent */}
            <path
              d="M32.5 11.3 a 16 16 0 1 1 -14.5 -9.3"
              fill="none"
              stroke="#EF4444"
              strokeWidth="4"
            />
          </svg>
          <div>
            {attendanceData.map((item) => (
              <div key={item.name} className="flex items-center mb-2">
                <span
                  className="inline-block w-3 h-3 rounded-full mr-2"
                  style={{ background: item.color }}
                ></span>
                <span className="text-sm text-gray-700 mr-2">{item.name}</span>
                <span className="font-semibold text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity Table (static) */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activities</h3>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2025-09-18</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Leave request approved</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Jane Smith</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2025-09-15</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Payroll processed</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Admin</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2025-09-10</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">New employee added</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">John Doe</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reports;