import React, { useState, useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import { useApp } from "../../context/AppContext";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { differenceInDays } from "date-fns";

const LeaveRequestForm = ({ onClose }) => {
  const { user } = useAuth();
  const { addLeaveRequest } = useApp();

  const [formData, setFormData] = useState({
    type: "vacation",
    startDate: "",
    endDate: "",
    reason: "",
  });

  // preview calculated days
  const totalDays = useMemo(() => {
    if (!formData.startDate || !formData.endDate) return 0;
    const diff =
      differenceInDays(
        new Date(formData.endDate),
        new Date(formData.startDate)
      ) + 1;
    return diff > 0 ? diff : 0;
  }, [formData.startDate, formData.endDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user || totalDays <= 0) return;

    const leaveRequest = {
      employeeId: user.id,
      type: formData.type,
      startDate: formData.startDate,
      endDate: formData.endDate,
      days: totalDays,
      reason: formData.reason,
      status: "pending",
      appliedOn: new Date().toISOString().split("T")[0],
    };

    addLeaveRequest(leaveRequest);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 animate-in fade-in zoom-in duration-150">

        {/* Header */}
        <div className="flex items-center justify-between border-b pb-3 mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Request Leave</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Leave Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Leave Type
            </label>
            <select
              name="type"
              required
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
            >
              <option value="vacation">Vacation</option>
              <option value="sick">Sick Leave</option>
              <option value="personal">Personal Leave</option>
              <option value="maternity">Maternity/Paternity</option>
              <option value="emergency">Emergency</option>
            </select>
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              required
              min={new Date().toISOString().split("T")[0]}
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.startDate}
              onChange={(e) =>
                setFormData({ ...formData, startDate: e.target.value })
              }
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              required
              min={formData.startDate}
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.endDate}
              onChange={(e) =>
                setFormData({ ...formData, endDate: e.target.value })
              }
            />
          </div>

          {/* Days Preview */}
          {totalDays > 0 && (
            <p className="text-sm text-gray-700 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
              Total Days: <span className="font-semibold">{totalDays}</span>
            </p>
          )}

          {/* Reason */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Reason
            </label>
            <textarea
              name="reason"
              required
              rows="3"
              placeholder="Provide a clear reason..."
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.reason}
              onChange={(e) =>
                setFormData({ ...formData, reason: e.target.value })
              }
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={totalDays <= 0}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeaveRequestForm;
