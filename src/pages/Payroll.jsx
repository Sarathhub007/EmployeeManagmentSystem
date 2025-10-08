import React, { useEffect, useState } from "react";
import { payrollAPI } from "../services/api"; // make sure this exists in your api.js

function getStatusColor(status) {
  if (status === "Paid") return "bg-green-100 text-green-800";
  if (status === "Pending") return "bg-yellow-100 text-yellow-800";
  return "bg-gray-100 text-gray-800";
}

function Payroll() {
  const [payrolls, setPayrolls] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch payrolls from backend
  const loadPayrolls = async () => {
    setLoading(true);
    try {
      const response = await payrollAPI.getAll();
      setPayrolls(response.data);
    } catch (error) {
      console.error("Failed to load payrolls", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPayrolls();
  }, []);

  // Update payroll status
  const markAsPaid = async (id) => {
    try {
      await payrollAPI.updateStatus(id, "Paid");
      loadPayrolls(); // refresh list after update
    } catch (error) {
      console.error("Failed to update payroll status", error);
    }
  };

  if (loading) return <p className="text-center mt-8">Loading payrolls...</p>;

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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payroll.employeeName || `ID ${payroll.employeeId}`}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payroll.month}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${payroll.grossPay.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${payroll.deductions.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${payroll.netPay.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(payroll.status)}`}>
                    {payroll.status}
                  </span>
                  {payroll.status === "Pending" && (
                    <button
                      className="ml-2 text-blue-600 underline"
                      onClick={() => markAsPaid(payroll.id)}
                    >
                      Mark Paid
                    </button>
                  )}
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
