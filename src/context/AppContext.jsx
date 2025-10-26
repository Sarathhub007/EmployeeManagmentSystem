import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { 
  employeeAPI, 
  leaveAPI, 
  dashboardAPI, 
  performanceAPI, 
  attendanceAPI,
  departmentAPI  // ✅ ADD THIS IMPORT
} from '../services/api';

const initialState = {
  employees: [],
  departments: [],
  leaveRequests: [],
  dashboardStats: null,
  performanceReviews: [],
  loading: false,
  error: null,
};

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DEPARTMENTS':
      return { ...state, departments: action.payload, loading: false };
    case 'ADD_DEPARTMENT':
      return { ...state, departments: [...state.departments, action.payload] };
    case 'UPDATE_DEPARTMENT':
      return {
        ...state,
        departments: state.departments.map(d => d.id === action.payload.id ? action.payload : d)
      };
    case 'DELETE_DEPARTMENT':
      return { ...state, departments: state.departments.filter(d => d.id !== action.payload) };
    
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_EMPLOYEES':
      return { ...state, employees: action.payload, loading: false };
    case 'ADD_EMPLOYEE':
      return { ...state, employees: [...state.employees, action.payload] };
    case 'UPDATE_EMPLOYEE':
      return {
        ...state,
        employees: state.employees.map(emp =>
          emp.id === action.payload.id ? action.payload : emp
        ),
      };
    case 'DELETE_EMPLOYEE':
      return {
        ...state,
        employees: state.employees.filter(emp => emp.id !== action.payload),
      };
    case 'SET_LEAVE_REQUESTS':
      return { ...state, leaveRequests: action.payload };
    case 'ADD_LEAVE_REQUEST':
      return { ...state, leaveRequests: [...state.leaveRequests, action.payload] };
    case 'UPDATE_LEAVE_REQUEST':
      return {
        ...state,
        leaveRequests: state.leaveRequests.map(req =>
          req.id === action.payload.id ? action.payload : req
        ),
      };
    case 'SET_DASHBOARD_STATS':
      return { ...state, dashboardStats: action.payload };
    case 'SET_PERFORMANCE_REVIEWS':
      return { ...state, performanceReviews: action.payload };
    case 'ADD_PERFORMANCE_REVIEW':
      return { ...state, performanceReviews: [...state.performanceReviews, action.payload] };
    default:
      return state;
  }
};

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // ✅ Load initial data - ADD loadDepartments here
  useEffect(() => {
    loadEmployees();
    loadLeaveRequests();
    loadDashboardStats();
    loadPerformanceReviews();
    loadDepartments(); // ✅ ADD THIS LINE
  }, []);

  // Employee functions
  const loadEmployees = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await employeeAPI.getAll();
      dispatch({ type: 'SET_EMPLOYEES', payload: response.data });
    } catch (error) {
      console.error('Failed to load employees:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load employees' });
    }
  };

  const addEmployee = async (employee) => {
    try {
      const response = await employeeAPI.create(employee);
      dispatch({ type: 'ADD_EMPLOYEE', payload: response.data });
      return { success: true };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to add employee' });
      return { success: false, error: error.response?.data };
    }
  };

  const updateEmployee = async (employee) => {
    try {
      const response = await employeeAPI.update(employee.id, employee);
      dispatch({ type: 'UPDATE_EMPLOYEE', payload: response.data });
      return { success: true };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update employee' });
      return { success: false, error: error.response?.data };
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await employeeAPI.delete(id);
      dispatch({ type: 'DELETE_EMPLOYEE', payload: id });
      return { success: true };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to delete employee' });
      return { success: false, error: error.response?.data };
    }
  };

  // Leave functions
  const loadLeaveRequests = async () => {
    try {
      const response = await leaveAPI.getAll();
      dispatch({ type: 'SET_LEAVE_REQUESTS', payload: response.data });
    } catch (error) {
      console.error('Failed to load leave requests:', error);
    }
  };

  const addLeaveRequest = async (request) => {
    try {
      const response = await leaveAPI.create(request);
      dispatch({ type: 'ADD_LEAVE_REQUEST', payload: response.data });
      return { success: true };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to add leave request' });
      return { success: false, error: error.response?.data };
    }
  };

  const updateLeaveRequest = async (request) => {
    try {
      const response = await leaveAPI.update(request.id, request);
      dispatch({ type: 'UPDATE_LEAVE_REQUEST', payload: response.data });
      return { success: true };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update leave request' });
      return { success: false, error: error.response?.data };
    }
  };

  const approveLeaveRequest = async (id) => {
    try {
      const response = await leaveAPI.approve(id);
      dispatch({ type: 'UPDATE_LEAVE_REQUEST', payload: response.data });
      return { success: true };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to approve leave request' });
      return { success: false, error: error.response?.data };
    }
  };

  const rejectLeaveRequest = async (id) => {
    try {
      const response = await leaveAPI.reject(id);
      dispatch({ type: 'UPDATE_LEAVE_REQUEST', payload: response.data });
      return { success: true };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to reject leave request' });
      return { success: false, error: error.response?.data };
    }
  };

  // Attendance functions
  const addCheckIn = async (employeeId) => {
    try {
      const response = await attendanceAPI.addCheckIn(employeeId);
      return { success: true, message: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data };
    }
  };

  // Dashboard
  const loadDashboardStats = async () => {
    try {
      const response = await dashboardAPI.getStats();
      dispatch({ type: 'SET_DASHBOARD_STATS', payload: response.data });
    } catch (error) {
      console.error('Failed to load dashboard stats:', error);
    }
  };

  // Performance functions
  const loadPerformanceReviews = async () => {
    try {
      const response = await performanceAPI.getAll();
      dispatch({ type: 'SET_PERFORMANCE_REVIEWS', payload: response.data });
    } catch (error) {
      console.error('Failed to load performance reviews:', error);
    }
  };

  const addPerformanceReview = async (review) => {
    try {
      const response = await performanceAPI.create(review);
      dispatch({ type: 'ADD_PERFORMANCE_REVIEW', payload: response.data });
      return { success: true };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to add performance review' });
      return { success: false, error: error.response?.data };
    }
  };

  // ✅ Department functions
  const loadDepartments = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const response = await departmentAPI.getAll();
      console.log("Departments loaded:", response.data); // Debug log
      dispatch({ type: "SET_DEPARTMENTS", payload: response.data });
    } catch (error) {
      console.error("Failed to load departments:", error);
      dispatch({ type: "SET_ERROR", payload: "Failed to load departments" });
    }
  };

  const addDepartment = async (department) => {
    try {
      const response = await departmentAPI.create(department);
      dispatch({ type: "ADD_DEPARTMENT", payload: response.data });
      return { success: true };
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Failed to add department" });
      return { success: false, error: error.response?.data };
    }
  };

  const updateDepartment = async (department) => {
    try {
      const response = await departmentAPI.update(department.id, department);
      dispatch({ type: "UPDATE_DEPARTMENT", payload: response.data });
      return { success: true };
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Failed to update department" });
      return { success: false, error: error.response?.data };
    }
  };

  const deleteDepartment = async (id) => {
    try {
      await departmentAPI.delete(id);
      dispatch({ type: "DELETE_DEPARTMENT", payload: id });
      return { success: true };
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Failed to delete department" });
      return { success: false, error: error.response?.data };
    }
  };

  const value = {
    ...state,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    addLeaveRequest,
    updateLeaveRequest,
    approveLeaveRequest,
    rejectLeaveRequest,
    loadEmployees,
    loadLeaveRequests,
    loadDashboardStats,
    addCheckIn,
    loadPerformanceReviews,
    addPerformanceReview,
    loadDepartments,
    addDepartment,
    updateDepartment,
    deleteDepartment,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};