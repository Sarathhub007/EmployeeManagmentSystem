import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { differenceInDays } from 'date-fns';

const LeaveRequestForm = ({ onClose }) => {
  const { user } = useAuth();
  const { addLeaveRequest } = useApp();

  const [formData, setFormData] = useState({
    type: 'vacation',
    startDate: '',
    endDate: '',
    reason: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) return;

    const days =
      differenceInDays(new Date(formData.endDate), new Date(formData.startDate)) + 1;

    const leaveRequest = {
      // id: Date.now().toString(),
      employeeId: user.id,
      type: formData.type,
      startDate: formData.startDate,
      endDate: formData.endDate,
      days,
      reason: formData.reason,
      status: 'pending',
      appliedOn: new Date().toISOString().split('T')[0],
    };

    addLeaveRequest(leaveRequest);
    onClose();
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900">Request Leave</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Leave Type</label>
            <select
              name="type"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="vacation">Vacation</option>
              <option value="sick">Sick Leave</option>
              <option value="personal">Personal Leave</option>
              <option value="maternity">Maternity/Paternity</option>
              <option value="emergency">Emergency</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              name="startDate"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={formData.startDate}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <input
              type="date"
              name="endDate"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={formData.endDate}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Reason</label>
            <textarea
              name="reason"
              required
              rows="3"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Please provide a reason for your leave request..."
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700"
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
