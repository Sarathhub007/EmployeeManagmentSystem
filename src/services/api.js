import axios from 'axios';

const API_BASE_URL = 'http://localhost:8083/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Interceptor for auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/signin', credentials),
  register: (userData) => api.post('/auth/signup', userData),
};

// Dashboard API
export const dashboardAPI = {
  getStats: () => api.get('/dashboard/stats'),
  getRecentEmployees: () => api.get('/dashboard/recent-employees'),
  getActivities: () => api.get('/dashboard/activities'),
};

// Employee API
export const employeeAPI = {
  getAll: () => api.get('/employees'),
  getById: (id) => api.get(`/employees/${id}`),
  create: (employee) => api.post('/employees', employee),
  update: (id, employee) => api.put(`/employees/${id}`, employee),
  delete: (id) => api.delete(`/employees/${id}`),
  search: (query) => api.get(`/employees/search?q=${query}`),
};

// Leave API
export const leaveAPI = {
  getAll: () => api.get('/leave-requests'),
  getByEmployee: (employeeId) => api.get(`/leave-requests/employee/${employeeId}`),
  create: (leaveRequest) => api.post('/leave-requests', leaveRequest),
  update: (id, leaveRequest) => api.put(`/leave-requests/${id}`, leaveRequest),
  approve: (id) => api.put(`/leave-requests/${id}/approve`),
  reject: (id) => api.put(`/leave-requests/${id}/reject`),
};

export default api;
