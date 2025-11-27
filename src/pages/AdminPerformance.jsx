import React, { useEffect, useState, useMemo } from "react";
import { useApp } from "../context/AppContext";

export default function AdminPerformance() {
  const {
    employees,
    performanceReviews,
    refreshPerformanceReviews,
    addPerformanceReview,
    updatePerformanceReview,
    deletePerformanceReview,
  } = useApp();

  const [filterEmp, setFilterEmp] = useState("");
  const [filterMonth, setFilterMonth] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        await refreshPerformanceReviews();
      } catch (err) {
        console.error(err);
        showToast("Failed to load reviews", "error");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const filteredRows = useMemo(() => {
    return performanceReviews.filter((r) => {
      const matchEmp = filterEmp ? r.employeeId === Number(filterEmp) : true;
      const matchMonth = filterMonth ? r.period === filterMonth : true;
      return matchEmp && matchMonth;
    });
  }, [performanceReviews, filterEmp, filterMonth]);

  const [form, setForm] = useState({
    employeeId: "",
    period: "",
    productivity: 3,
    communication: 3,
    teamwork: 3,
    punctuality: 3,
    comments: "",
  });

  const openAdd = () => {
    setForm({
      employeeId: "",
      period: "",
      productivity: 3,
      communication: 3,
      teamwork: 3,
      punctuality: 3,
      comments: "",
    });
    setEditing(null);
    setShowModal(true);
  };

  const openEdit = (r) => {
    setForm({ ...r });
    setEditing(r);
    setShowModal(true);
  };

  const save = async () => {
    if (!form.employeeId || !form.period) {
      showToast("Please fill all required fields", "error");
      return;
    }

    try {
      const payload = { ...form };
      if (editing) {
        await updatePerformanceReview(editing.id, payload);
        showToast("Review updated successfully", "success");
      } else {
        await addPerformanceReview(payload);
        showToast("Review added successfully", "success");
      }
      setShowModal(false);
    } catch (err) {
      console.error(err);
      showToast("Failed to save review", "error");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await deletePerformanceReview(id);
      showToast("Review deleted successfully", "success");
    } catch (err) {
      console.error(err);
      showToast("Failed to delete review", "error");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pb-10 space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Performance Reviews
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage employee performance evaluations
          </p>
        </div>

        <button
          onClick={openAdd}
          className="px-6 py-2.5 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all font-medium"
        >
          + Add Review
        </button>
      </div>

      {/* FILTERS */}
      <div className="bg-white p-5 rounded-lg shadow-md flex flex-wrap gap-4 border border-gray-200">
        <select
          className="border border-gray-300 px-3 py-2 rounded-lg min-w-[220px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={filterEmp}
          onChange={(e) => setFilterEmp(e.target.value)}
        >
          <option value="">All Employees</option>
          {employees.map((e) => (
            <option key={e.employeeId} value={e.employeeId}>
              {e.firstName} {e.lastName} ({e.employeeId})
            </option>
          ))}
        </select>

        <input
          type="month"
          className="border border-gray-300 px-3 py-2 rounded-lg min-w-[200px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={filterMonth}
          onChange={(e) => setFilterMonth(e.target.value)}
        />
      </div>

      {/* LOADING STATE */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin h-8 w-8 border-4 border-blue-300 border-t-blue-600 rounded-full"></div>
        </div>
      )}

      {/* TABLE */}
      {!loading && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gradient-to-r from-purple-400 to-pink-400">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                  Period
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                  Scores
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                  Final
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                  Comments
                </th>
                <th className="px-6 py-4 text-right text-sm font-bold text-white uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {filteredRows.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {r.employeeId}
                  </td>
                  <td className="px-6 py-4 text-gray-700">{r.period}</td>
                  <td className="px-6 py-4">
                    <span className="text-gray-700 font-medium text-xs">
                      P:{r.productivity} C:{r.communication} T:{r.teamwork} Pu:
                      {r.punctuality}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-blue-600">
                    {r.finalScore}/5
                  </td>
                  <td className="px-6 py-4 text-gray-700 truncate">
                    {r.comments || "-"}
                  </td>

                  <td className="px-6 py-4 text-right space-x-3">
                    <button
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                      onClick={() => openEdit(r)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800 font-medium text-sm"
                      onClick={() => handleDelete(r.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {filteredRows.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No reviews found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-2xl border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-5">
              {editing ? "Edit Review" : "Add Review"}
            </h3>

            <div className="space-y-4">
              {/* EMPLOYEE */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Employee *
                </label>
                <select
                  className="border border-gray-300 px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={form.employeeId}
                  disabled={editing}
                  onChange={(e) =>
                    setForm({ ...form, employeeId: Number(e.target.value) })
                  }
                >
                  <option value="">Select Employee</option>
                  {employees.map((e) => (
                    <option key={e.employeeId} value={e.employeeId}>
                      {e.firstName} {e.lastName} ({e.employeeId})
                    </option>
                  ))}
                </select>
              </div>

              {/* PERIOD */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Period *
                </label>
                <input
                  type="month"
                  className="border border-gray-300 px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={form.period}
                  disabled={editing}
                  onChange={(e) => setForm({ ...form, period: e.target.value })}
                />
              </div>

              {/* SCORES GRID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Scores (1-5)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    ["productivity", "Productivity"],
                    ["communication", "Communication"],
                    ["teamwork", "Teamwork"],
                    ["punctuality", "Punctuality"],
                  ].map(([field, label]) => (
                    <div key={field}>
                      <label className="text-xs text-gray-600 mb-1 block">
                        {label}
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="5"
                        className="border border-gray-300 px-3 py-2 rounded-lg w-full text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={form[field]}
                        onChange={(e) =>
                          setForm({ ...form, [field]: Number(e.target.value) })
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* COMMENTS */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Comments
                </label>
                <textarea
                  className="border border-gray-300 px-3 py-2 rounded-lg w-full text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="2"
                  placeholder="Add any comments"
                  value={form.comments}
                  onChange={(e) =>
                    setForm({ ...form, comments: e.target.value })
                  }
                />
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition font-medium"
              >
                Cancel
              </button>

              <button
                onClick={save}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition font-medium"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div
          className={`fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-lg text-white font-medium transition-opacity ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}
