import React from 'react';

const departments = [
  {
    id: '1',
    name: 'Engineering',
    description: 'Software development and technical operations',
    manager: 'Jane Smith',
    employeeCount: 15,
  },
  {
    id: '2',
    name: 'Marketing',
    description: 'Brand management and customer acquisition',
    manager: 'Mike Johnson',
    employeeCount: 8,
  },
  {
    id: '3',
    name: 'Human Resources',
    description: 'Employee relations and organizational development',
    manager: 'Sarah Lee',
    employeeCount: 5,
  },
];

function Department() {
  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-blue-600">Departments</h2>
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manager</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employees</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {departments.map((dept) => (
              <tr key={dept.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dept.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dept.manager}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dept.employeeCount}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dept.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Department;