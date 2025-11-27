// src/context/AppContext.jsx
import React, { createContext, useContext, useReducer, useEffect } from "react";
import {
  employeeAPI,
  leaveAPI,
  dashboardAPI,
  performanceAPI,
  attendanceAPI,
  departmentAPI,
} from "../services/api";

const initialState = {
  employees: [],
  departments: [],
  leaveRequests: [],
  dashboardStats: null,
  performanceReviews: [],
  loading: false,
  error: null,
};

const AppContext = createContext();

const appReducer = (state, action) => {
  switch (action.type) {
    case "SET_DEPARTMENTS":
      return { ...state, departments: action.payload, loading: false };
    case "ADD_DEPARTMENT":
      return { ...state, departments: [...state.departments, action.payload] };
    case "UPDATE_DEPARTMENT":
      return {
        ...state,
        departments: state.departments.map((d) =>
          d.id === action.payload.id ? action.payload : d
        ),
      };
    case "DELETE_DEPARTMENT":
      return {
        ...state,
        departments: state.departments.filter((d) => d.id !== action.payload),
      };

    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };

    case "SET_EMPLOYEES":
      return { ...state, employees: action.payload, loading: false };
    case "ADD_EMPLOYEE":
      return { ...state, employees: [...state.employees, action.payload] };
    case "UPDATE_EMPLOYEE":
      return {
        ...state,
        employees: state.employees.map((emp) =>
          emp.id === action.payload.id ? action.payload : emp
        ),
      };
    case "DELETE_EMPLOYEE":
      return {
        ...state,
        employees: state.employees.filter((emp) => emp.id !== action.payload),
      };

    case "SET_LEAVE_REQUESTS":
      return { ...state, leaveRequests: action.payload };
    case "ADD_LEAVE_REQUEST":
      return {
        ...state,
        leaveRequests: [...state.leaveRequests, action.payload],
      };
    case "UPDATE_LEAVE_REQUEST":
      return {
        ...state,
        leaveRequests: state.leaveRequests.map((req) =>
          req.id === action.payload.id ? action.payload : req
        ),
      };

    case "SET_DASHBOARD_STATS":
      return { ...state, dashboardStats: action.payload };

    // Performance
    case "SET_PERFORMANCE_REVIEWS":
      return { ...state, performanceReviews: action.payload };
    case "ADD_PERFORMANCE_REVIEW":
      return {
        ...state,
        performanceReviews: [...state.performanceReviews, action.payload],
      };

    default:
      return state;
  }
};

// Avoid StrictMode double init
let appInitialized = false;

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within an AppProvider");
  return ctx;
};

// Helper: ensure localStorage.employee for EMPLOYEE role
const ensureEmployeeInLocalStorage = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user) return;

    // Skip for admin
    if (user.role && user.role.toUpperCase() === "ADMIN") return;

    // Already present
    const existing = JSON.parse(localStorage.getItem("employee") || "null");
    if (existing?.id) return;

    // Try to find employee record by email (fallback to name if needed)
    if (user.email) {
      const res = await employeeAPI.search(user.email);
      const list = res.data || [];
      // Choose exact email match if available, else first result
      const match =
        list.find(
          (e) => (e.email || "").toLowerCase() === user.email.toLowerCase()
        ) || list[0];

      if (match) {
        localStorage.setItem(
          "employee",
          JSON.stringify({
            id: match.id, // DB PK
            employeeId: match.employeeId, // business id
            firstName: match.firstName,
            lastName: match.lastName,
          })
        );
      }
    }
  } catch {
    // ignore
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    if (appInitialized) return;
    // If token present at mount, initialize now.
    const hasToken = !!localStorage.getItem("token");
    if (hasToken) {
      appInitialized = true;
      (async () => {
        await ensureEmployeeInLocalStorage(); // <- critical for non-admin

        const user = JSON.parse(localStorage.getItem("user") || "null");
        const isAdmin = user?.role?.toUpperCase() === "ADMIN";

        // Load only what's needed based on role
        const promises = [];

        // Only admins need all employees
        if (isAdmin) {
          promises.push(loadEmployees());
        }

        // All users need leave requests (filtered by role in component)
        promises.push(loadLeaveRequests());

        // All users need dashboard stats
        promises.push(loadDashboardStats());

        // All users need performance reviews (filtered by role)
        promises.push(refreshPerformanceReviews());

        // Only admins need departments for management
        if (isAdmin) {
          promises.push(loadDepartments());
        }

        await Promise.all(promises);
      })();
      return;
    }

    // Otherwise listen for an auth:login event so we can initialize when the
    // user logs in without requiring a full page reload (fixes "reload to see
    // dashboard after login" issue).
    const onAuthLogin = () => {
      if (appInitialized) return;
      appInitialized = true;
      (async () => {
        await ensureEmployeeInLocalStorage();

        const user = JSON.parse(localStorage.getItem("user") || "null");
        const isAdmin = user?.role?.toUpperCase() === "ADMIN";

        // Load only what's needed based on role
        const promises = [];

        // Only admins need all employees
        if (isAdmin) {
          promises.push(loadEmployees());
        }

        // All users need leave requests (filtered by role in component)
        promises.push(loadLeaveRequests());

        // All users need dashboard stats
        promises.push(loadDashboardStats());

        // All users need performance reviews (filtered by role)
        promises.push(refreshPerformanceReviews());

        // Only admins need departments for management
        if (isAdmin) {
          promises.push(loadDepartments());
        }

        await Promise.all(promises);
      })();
    };

    try {
      window.addEventListener("auth:login", onAuthLogin);
    } catch (e) {
      // ignore (non-browser env)
    }

    return () => {
      try {
        window.removeEventListener("auth:login", onAuthLogin);
      } catch (e) {
        // ignore
      }
    };
  }, []);

  // Employees
  const loadEmployees = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const response = await employeeAPI.getAll();
      dispatch({ type: "SET_EMPLOYEES", payload: response.data });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Failed to load employees" });
    }
  };

  const addEmployee = async (employee) => {
    try {
      const response = await employeeAPI.create(employee);
      dispatch({ type: "ADD_EMPLOYEE", payload: response.data });
      return { success: true };
    } catch (error) {
      console.error("addEmployee error", error.response || error);
      dispatch({ type: "SET_ERROR", payload: "Failed to add employee" });
      return {
        success: false,
        error: error.response?.data || { message: error.message },
      };
    }
  };

  const updateEmployee = async (employee) => {
    try {
      const response = await employeeAPI.update(employee.id, employee);
      dispatch({ type: "UPDATE_EMPLOYEE", payload: response.data });
      return { success: true };
    } catch (error) {
      console.error("updateEmployee error", error.response || error);
      dispatch({ type: "SET_ERROR", payload: "Failed to update employee" });
      return {
        success: false,
        error: error.response?.data || { message: error.message },
      };
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await employeeAPI.delete(id);
      dispatch({ type: "DELETE_EMPLOYEE", payload: id });
      return { success: true };
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Failed to delete employee" });
      return { success: false, error: error.response?.data };
    }
  };

  // Leave
  const loadLeaveRequests = async () => {
    try {
      const response = await leaveAPI.getAll();
      dispatch({ type: "SET_LEAVE_REQUESTS", payload: response.data });
    } catch {
      /* noop */
    }
  };

  const addLeaveRequest = async (request) => {
    try {
      const response = await leaveAPI.create(request);
      dispatch({ type: "ADD_LEAVE_REQUEST", payload: response.data });
      return { success: true };
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Failed to add leave request" });
      return { success: false, error: error.response?.data };
    }
  };

  const updateLeaveRequest = async (request) => {
    try {
      const response = await leaveAPI.update(request.id, request);
      dispatch({ type: "UPDATE_LEAVE_REQUEST", payload: response.data });
      return { success: true };
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: "Failed to update leave request",
      });
      return { success: false, error: error.response?.data };
    }
  };

  const approveLeaveRequest = async (id) => {
    try {
      const response = await leaveAPI.approve(id);
      dispatch({ type: "UPDATE_LEAVE_REQUEST", payload: response.data });
      return { success: true };
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: "Failed to approve leave request",
      });
      return { success: false, error: error.response?.data };
    }
  };

  const rejectLeaveRequest = async (id) => {
    try {
      const response = await leaveAPI.reject(id);
      dispatch({ type: "UPDATE_LEAVE_REQUEST", payload: response.data });
      return { success: true };
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: "Failed to reject leave request",
      });
      return { success: false, error: error.response?.data };
    }
  };

  // Attendance
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
      dispatch({ type: "SET_DASHBOARD_STATS", payload: response.data });
    } catch {
      /* noop */
    }
  };

  // Departments
  const loadDepartments = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const response = await departmentAPI.getAll();
      dispatch({ type: "SET_DEPARTMENTS", payload: response.data });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Failed to load departments" });
    }
  };

  // inside AppProvider
  const refreshPerformanceReviews = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "null");
      const employee = JSON.parse(localStorage.getItem("employee") || "null");

      if (!user) {
        dispatch({ type: "SET_PERFORMANCE_REVIEWS", payload: [] });
        return;
      }

      if (user.role && user.role.toUpperCase() === "ADMIN") {
        const res = await performanceAPI.getAll();
        dispatch({ type: "SET_PERFORMANCE_REVIEWS", payload: res.data || [] });
      } else if (employee?.employeeId) {
        // ✅ fetch by business employeeId
        const res = await performanceAPI.getByEmployee(employee.employeeId);
        dispatch({ type: "SET_PERFORMANCE_REVIEWS", payload: res.data || [] });
      } else {
        dispatch({ type: "SET_PERFORMANCE_REVIEWS", payload: [] });
      }
    } catch (err) {
      console.error(
        "refreshPerformanceReviews error:",
        err.response?.status,
        err.response?.data || err.message
      );
      dispatch({ type: "SET_PERFORMANCE_REVIEWS", payload: [] });
    }
  };

  const addPerformanceReview = async (review) => {
    const res = await performanceAPI.create(review);
    await refreshPerformanceReviews();
    return res;
  };

  const updatePerformanceReview = async (id, review) => {
    const res = await performanceAPI.update(id, review);
    await refreshPerformanceReviews();
    return res;
  };

  const deletePerformanceReview = async (id) => {
    const res = await performanceAPI.remove(id);
    await refreshPerformanceReviews();
    return res;
  };

  const value = {
    ...state,
    // employees
    addEmployee,
    updateEmployee,
    deleteEmployee,
    loadEmployees,
    // leave
    addLeaveRequest,
    updateLeaveRequest,
    approveLeaveRequest,
    rejectLeaveRequest,
    loadLeaveRequests,
    // dashboard
    loadDashboardStats,
    // attendance
    addCheckIn,
    // departments
    loadDepartments,
    addDepartment: async (d) => {
      const res = await departmentAPI.create(d);
      dispatch({ type: "ADD_DEPARTMENT", payload: res.data });
      return { success: true };
    },
    updateDepartment: async (d) => {
      const res = await departmentAPI.update(d.id, d);
      dispatch({ type: "UPDATE_DEPARTMENT", payload: res.data });
      return { success: true };
    },
    deleteDepartment: async (id) => {
      await departmentAPI.delete(id);
      dispatch({ type: "DELETE_DEPARTMENT", payload: id });
      return { success: true };
    },
    // performance
    refreshPerformanceReviews,
    addPerformanceReview,
    updatePerformanceReview,
    deletePerformanceReview,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
