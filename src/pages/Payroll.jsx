import React, { useEffect, useState } from "react";
import { payrollAPI } from "../services/api";

function getStatusColor(status) {
  if (status === "PAID")
    return "bg-green-100 text-green-700 border border-green-300";
  if (status === "PENDING")
    return "bg-yellow-100 text-yellow-700 border border-yellow-300";
  return "bg-gray-100 text-gray-700 border border-gray-300";
}

function Payroll() {
  const [payrolls, setPayrolls] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadPayrolls = async () => {
    setLoading(true);
    try {
      const res = await payrollAPI.getAll();
      setPayrolls(res.data);
    } catch (err) {
      console.error("Failed to load payrolls", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPayrolls();
  }, []);

  const markAsPaid = async (id) => {
    try {
      await payrollAPI.updateStatus(id, "PAID");
      loadPayrolls();
    } catch (err) {
      console.error("Status update failed", err);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[30vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-300 border-t-blue-600"></div>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-blue-700 tracking-tight">
        Payroll Records
      </h2>

      <div className="bg-white shadow-md rounded-xl border border-gray-200 overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Employee
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Month
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Gross Pay
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Deductions
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Net Pay
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Pay Date
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {payrolls.map((p) => (
              <tr
                key={p.id}
                className="hover:bg-gray-50 transition cursor-pointer"
              >
                <td className="px-4 py-3 text-sm text-gray-800">
                  {p.employee.firstName} {p.employee.lastName}
                </td>

                <td className="px-4 py-3 text-sm text-gray-700">{p.month}</td>

                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                  ₹{p.grossPay}
                </td>

                <td className="px-4 py-3 text-sm text-gray-700">
                  ₹{p.deductions}
                </td>

                <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                  ₹{p.netPay}
                </td>

                {/* Status Column */}
                <td className="px-4 py-3 whitespace-nowrap flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      p.status
                    )}`}
                  >
                    {p.status}
                  </span>

                  {p.status === "PENDING" && (
                    <button
                      onClick={() => markAsPaid(p.id)}
                      className="text-blue-600 text-xs font-medium px-3 py-1 border border-blue-300 bg-blue-50 rounded-full hover:bg-blue-100 transition"
                    >
                      Mark Paid
                    </button>
                  )}
                </td>

                <td className="px-4 py-3 text-sm text-gray-700">
                  {p.payDate || "--"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Payroll;
