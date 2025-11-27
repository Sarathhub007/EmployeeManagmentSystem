import React, { useEffect, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { useApp } from "../context/AppContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function chip(score) {
  if (score >= 4.5)
    return "bg-green-100 text-green-700 border border-green-300";
  if (score >= 3.5)
    return "bg-yellow-100 text-yellow-700 border border-yellow-300";
  return "bg-red-100 text-red-700 border border-red-300";
}

export default function Performance() {
  const { user } = useAuth();
  const { performanceReviews, refreshPerformanceReviews } = useApp();

  // Get logged-in employee's ID from localStorage
  let currentEmployeeId = null;
  try {
    const employee = JSON.parse(localStorage.getItem("employee") || "null");
    currentEmployeeId = employee?.employeeId || employee?.id;
  } catch (e) {
    console.warn("Failed to parse employee from localStorage", e);
  }

  useEffect(() => {
    // Load performance reviews only once on mount
    if (refreshPerformanceReviews) {
      refreshPerformanceReviews();
    }
  }, []);

  // Filter to show only logged-in user's performance reviews
  const rows = performanceReviews.filter((review) => {
    const reviewEmpId = Number(review.employeeId);
    const currentEmpId = Number(currentEmployeeId);
    const matchesEmployeeId = reviewEmpId === currentEmpId && reviewEmpId > 0;
    const matchesUserId =
      review.userId && user?.id && review.userId === user.id;
    return matchesEmployeeId || matchesUserId;
  });

  const chartData = useMemo(() => {
    const parseKey = (p) => {
      if (!p) return "";
      if (/^\d{4}-\d{2}$/.test(p)) return p;
      const m = p.match(/^Q([1-4])\s+(\d{4})$/i);
      if (m) return `${m[2]}-0${Number(m[1]) * 3}`;
      return p;
    };

    return [...rows]
      .sort((a, b) => parseKey(a.period).localeCompare(parseKey(b.period)))
      .map((r) => ({
        period: r.period,
        finalScore: Number(r.finalScore || 0),
      }));
  }, [rows]);

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-8 px-4">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
          My Performance
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Productivity • Communication • Teamwork • Punctuality
        </p>
      </div>

      {/* Debug Info */}
      {performanceReviews.length === 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
          <p className="font-medium">📋 No performance reviews yet</p>
          <p className="mt-1">
            Your manager hasn't created any performance reviews for you yet.
          </p>
          <p className="mt-2 text-xs text-amber-700">
            Performance reviews will appear here once your manager adds them in
            the Admin dashboard.
          </p>
        </div>
      )}

      {/* Trend Chart */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Performance Trend
        </h3>

        {chartData.length === 0 ? (
          <p className="text-gray-500 text-sm">No data to chart yet.</p>
        ) : (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]} />
                <Tooltip
                  wrapperStyle={{
                    backgroundColor: "white",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "4px 8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="finalScore"
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Review Cards */}
      <div className="space-y-5">
        {rows.length === 0 && (
          <p className="text-gray-500">No performance reviews yet.</p>
        )}

        {rows.map((r) => (
          <div
            key={r.id}
            className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
          >
            {/* Top Section */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 uppercase font-medium">
                  Period
                </p>
                <p className="text-lg font-semibold text-gray-900">
                  {r.period}
                </p>
              </div>
              <span
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide ${chip(
                  Number(r.finalScore || 0)
                )}`}
              >
                Final Score: {Number(r.finalScore || 0).toFixed(2)}/5
              </span>
            </div>

            {/* Score Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5 text-sm">
              <div className="bg-gray-50 rounded-xl p-4 flex flex-col">
                <span className="text-gray-600 text-xs uppercase">
                  Productivity
                </span>
                <b className="text-gray-900 text-base">{r.productivity}</b>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 flex flex-col">
                <span className="text-gray-600 text-xs uppercase">
                  Communication
                </span>
                <b className="text-gray-900 text-base">{r.communication}</b>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 flex flex-col">
                <span className="text-gray-600 text-xs uppercase">
                  Teamwork
                </span>
                <b className="text-gray-900 text-base">{r.teamwork}</b>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 flex flex-col">
                <span className="text-gray-600 text-xs uppercase">
                  Punctuality
                </span>
                <b className="text-gray-900 text-base">{r.punctuality}</b>
              </div>
            </div>

            {/* Manager Comments */}
            {r.comments && (
              <div className="mt-4 text-gray-700 text-sm leading-relaxed">
                <span className="font-medium text-gray-900">
                  Manager comments:{" "}
                </span>
                {r.comments}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
