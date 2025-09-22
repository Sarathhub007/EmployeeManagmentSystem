import React from 'react';

const payrolls = [
  {
    id: 'PR001',
    employee: 'John Doe',
    month: 'August 2025',
    grossPay: 7000,
    deductions: 800,
    netPay: 6200,
    status: 'Paid',
    payDate: '2025-08-31',
  },
  {
    id: 'PR002',
    employee: 'Jane Smith',
    month: 'August 2025',
    grossPay: 9000,
    deductions: 1200,
    netPay: 7800,
    status: 'Paid',
    payDate: '2025-08-31',
  },
  {
    id: 'PR003',
    employee: 'Mike Johnson',
    month: 'August 2025',
    grossPay: 8000,
    deductions: 1000,
    netPay: 7000,
    status: 'Pending',
    payDate: '2025-08-31',
  },
];

function getStatusColor(status) {
  if (status === 'Paid') return 'bg-green-100 text-green-800';
  if (status === 'Pending') return 'bg-yellow-100 text-yellow-800';
  return 'bg-gray-100 text-gray-800';
}

function Payroll() {
  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-blue-600">Payroll Records</h2>
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gross Pay</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deductions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Pay</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pay Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payrolls.map((payroll) => (
              <tr key={payroll.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payroll.employee}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payroll.month}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${payroll.grossPay.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${payroll.deductions.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${payroll.netPay.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(payroll.status)}`}>
                    {payroll.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payroll.payDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Payroll;