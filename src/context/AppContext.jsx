import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { employeeAPI, leaveAPI, dashboardAPI } from '../services/api';

const initialState = {
  employees: [],
  departments: [
    {
      id: '1',
      name: 'Engineering',
      description: 'Software development and technical operations',
      managerId: '2',
      employeeCount: 15,
    },
    {
      id: '2',
      name: 'Marketing', 
      description: 'Brand management and customer acquisition',
      managerId: '3',
      employeeCount: 8,
    },
  ],
  leaveRequests: [],
  dashboardStats: null,
  loading: false,
  error: null,
};

const appReducer = (state, action) => {
  switch (action.type) {
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
      return {
        ...state,
        leaveRequests: [...state.leaveRequests, action.payload],
      };
    case 'UPDATE_LEAVE_REQUEST':
      return {
        ...state,
        leaveRequests: state.leaveRequests.map(req =>
          req.id === action.payload.id ? action.payload : req
        ),
      };
    case 'SET_DASHBOARD_STATS':
      return { ...state, dashboardStats: action.payload };
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

  // Load initial data
  useEffect(() => {
    loadEmployees();
    loadLeaveRequests();
    loadDashboardStats();
  }, []);

  const   loadEmployees = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await employeeAPI.getAll();
      dispatch({ type: 'SET_EMPLOYEES', payload: response.data });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load employees' });
    }
  };

  const loadLeaveRequests = async () => {
    try {
      const response = await leaveAPI.getAll();
      dispatch({ type: 'SET_LEAVE_REQUESTS', payload: response.data });
    } catch (error) {
      console.error('Failed to load leave requests:', error);
    }
  };

  const loadDashboardStats = async () => {
    try {
      const response = await dashboardAPI.getStats();
      dispatch({ type: 'SET_DASHBOARD_STATS', payload: response.data });
    } catch (error) {
      console.error('Failed to load dashboard stats:', error);
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

  const value = {
    ...state,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    addLeaveRequest,
    updateLeaveRequest,
    loadEmployees,
    loadLeaveRequests,
    loadDashboardStats,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
