import React from 'react';

const payslips = [
  {
    id: 'PS001',
    month: 'August 2025',
    employee: 'John Doe',
    netPay: 6200,
    status: 'Paid',
    date: '2025-08-31',
  },
  {
    id: 'PS002',
    month: 'July 2025',
    employee: 'John Doe',
    netPay: 6200,
    status: 'Paid',
    date: '2025-07-31',
  },
  {
    id: 'PS003',
    month: 'June 2025',
    employee: 'John Doe',
    netPay: 6200,
    status: 'Paid',
    date: '2025-06-30',
  },
];

function getStatusColor(status) {
  if (status === 'Paid') return 'bg-green-100 text-green-800';
  if (status === 'Pending') return 'bg-yellow-100 text-yellow-800';
  return 'bg-gray-100 text-gray-800';
}

function Payslips() {
  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-blue-600">My Payslips</h2>
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payslip ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Pay</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payslips.map((payslip) => (
              <tr key={payslip.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payslip.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payslip.month}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${payslip.netPay.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(payslip.status)}`}>
                    {payslip.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payslip.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Payslips;