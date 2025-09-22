import React, { useState } from 'react';

const initialEmployees = [
  { id: 1, name: 'John Doe', status: 'Present' },
  { id: 2, name: 'Jane Smith', status: 'Absent' },
  { id: 3, name: 'Alice Johnson', status: 'Present' },
];

function AttendanceList() {
  const [employees, setEmployees] = useState(initialEmployees);

  const handleToggle = (id) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === id
          ? {
              ...emp,
              status: emp.status === 'Present' ? 'Absent' : 'Present',
            }
          : emp
      )
    );
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-blue-600">Attendance List</h2>
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mark</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {employees.map((emp) => (
              <tr key={emp.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{emp.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${emp.status === 'Present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {emp.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={emp.status === 'Present'}
                      onChange={() => handleToggle(emp.id)}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">{emp.status === 'Present' ? 'Present' : 'Absent'}</span>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AttendanceList;