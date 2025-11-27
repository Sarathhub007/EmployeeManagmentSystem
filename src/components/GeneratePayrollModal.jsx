import React, { useState } from "react";
import { payrollAPI } from "../services/api";

export default function GeneratePayrollModal({ isOpen, onClose, onGenerated }) {
  const [month, setMonth] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  });
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(null);

  if (!isOpen) return null;

  async function handleGenerate() {
    setLoading(true);
    setSummary(null);

    try {
      const res = await payrollAPI.generate(month);
      setSummary(res.data);
      onGenerated?.(); // refresh payroll list
    } catch (error) {
      setSummary({ error: error.response?.data || "Failed to generate payroll" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">Generate Payroll</h2>

        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Month
        </label>
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        />

        {summary && (
          <div className="bg-gray-100 p-3 rounded text-sm mb-3">
            {summary.error ? (
              <p className="text-red-600">{summary.error}</p>
            ) : (
              <>
                <p><strong>Month:</strong> {summary.month}</p>
                <p><strong>Generated:</strong> {summary.generated}</p>
                <p><strong>Skipped (already exists):</strong> {summary.skippedAlreadyExists}</p>
              </>
            )}
          </div>
        )}

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-sm rounded"
          >
            Close
          </button>

          <button
            disabled={loading}
            onClick={handleGenerate}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>
      </div>
    </div>
  );
}
