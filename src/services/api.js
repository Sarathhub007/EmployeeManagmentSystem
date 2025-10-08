import axios from "axios";

const API_BASE_URL = "http://localhost:8083/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Interceptor for auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log(localStorage.getItem("token"));
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth API
export const authAPI = {
  login: (credentials) => api.post("/auth/signin", credentials),
  register: (userData) => api.post("/auth/signup", userData),
};

// Dashboard API
export const dashboardAPI = {
  getStats: () => api.get("/dashboard/stats"),
  getRecentEmployees: () => api.get("/dashboard/recent-employees"),
  getActivities: () => api.get("/dashboard/activities"),
};

// Employee API
export const employeeAPI = {
  getAll: () => api.get("/employees"),
  getById: (id) => api.get(`/employees/${id}`),
  create: (employee) => api.post("/employees", employee),
  update: (id, employee) => api.put(`/employees/${id}`, employee),
  delete: (id) => api.delete(`/employees/${id}`),
  search: (query) => api.get(`/employees/search?q=${query}`),
};


export const leaveAPI = {
  getAll: () => api.get("/leave-requests/leave"),
  getByEmployee: (employeeId) => api.get(`/leave-requests/${employeeId}`),
  create: (leaveRequest) =>
    api.post("/leave-requests/post/leave", leaveRequest),
  approve: (id) => api.put(`/leave-requests/${id}/approve`),
  reject: (id) => api.put(`/leave-requests/${id}/reject`),
  update: (id, leaveRequest) => api.put(`/leave-requests/${id}`, leaveRequest),
};

export const attendanceAPI = {
  mark: (employeeId, status) => api.put(`/attendance/mark/${employeeId}?status=${status}`),
  addCheckIn: (employeeId) => api.put(`/attendance/addcheckin/${employeeId}`),
  getTodayAttendance: () => api.get(`/attendance/today`),
  saveAll: (attendanceList) => Promise.all(
    attendanceList.map(emp => api.put(`/attendance/mark/${emp.employeeId}?status=${emp.status}`))
  ),
};


// src/services/api.js

export const payrollAPI = {
  getAll: () => api.get("/payrolls"),
  getByEmployee: (employeeId) => api.get(`/payrolls/employee/${employeeId}`),
  getByStatus: (status) => api.get(`/payrolls/status/${status}`),
  updateStatus: (id, status) => api.put(`/payrolls/${id}/status?status=${status}`),
};

// Performance API
export const performanceAPI = {
  getAll: () => api.get("/performance-reviews"),  // <-- backend endpoint
  getByEmployee: (employeeId) => api.get(`/performance-reviews/employee/${employeeId}`),
  create: (review) => api.post("/performance-reviews", review),
};

export const departmentAPI = {
  getAll: () => api.get("/departments"),
  getById: (id) => api.get(`/departments/${id}`),
  create: (department) => api.post("/departments", department),
  update: (id, department) => api.put(`/departments/${id}`, department),
  delete: (id) => api.delete(`/departments/${id}`),
  getEmployees: (id) => api.get(`/departments/${id}/employees`),
};




export default api;
