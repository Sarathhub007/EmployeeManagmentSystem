import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { payrollAPI } from "../services/api";

function getStatusColor(status) {
  if (status === "PAID")
    return "bg-green-100 text-green-700 border border-green-300";
  if (status === "PENDING")
    return "bg-yellow-100 text-yellow-700 border border-yellow-300";
  return "bg-gray-100 text-gray-700 border border-gray-300";
}

function Payslips() {
  const { user } = useAuth();
  const [payslips, setPayslips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const employee = JSON.parse(localStorage.getItem("employee"));
    if (!employee) {
      console.warn("No employee found in localStorage");
      setLoading(false);
      return;
    }

    // Use business employeeId for API call (not DB id)
    const employeeId = employee.employeeId || employee.id;
    console.log(
      "Fetching payslips for employeeId:",
      employeeId,
      "employee:",
      employee
    );

    payrollAPI
      .getByEmployee(employeeId)
      .then((res) => {
        console.log("Payroll API response:", res.data);
        // Payslips have nested employee object, not direct employeeId
        const filteredPayslips = (res.data || []).filter(
          (p) => p.employee?.id === employeeId
        );
        console.log("Filtered payslips:", filteredPayslips);
        setPayslips(filteredPayslips);
      })
      .catch((err) => console.error("Failed to load payslips", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[30vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-300 border-t-blue-600"></div>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-blue-700 tracking-tight">
        My Payslips
      </h2>

      {payslips.length === 0 ? (
        <div className="bg-white shadow-md rounded-xl border border-gray-200 p-10 text-center">
          <p className="text-gray-500 text-lg">No payslips available yet.</p>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-xl border border-gray-200 overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Month
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Net Pay
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Pay Date
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {payslips.map((p) => (
                <tr
                  key={p.id}
                  className="hover:bg-gray-50 transition-all cursor-pointer"
                >
                  <td className="px-6 py-3 text-sm text-gray-800">{p.month}</td>

                  <td className="px-6 py-3 text-sm font-semibold text-gray-900">
                    ₹{p.netPay}
                  </td>

                  <td className="px-6 py-3 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        p.status
                      )}`}
                    >
                      {p.status}
                    </span>
                  </td>

                  <td className="px-6 py-3 text-sm text-gray-700">
                    {p.payDate || "--"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Payslips;
