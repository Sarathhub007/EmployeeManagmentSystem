// src/context/AuthContext.jsx
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { authAPI } from "../services/api";

const initialState = {
  user: null, // For routing & auth
  employee: null, // For EMS modules (attendance, payroll, performance)
  token: null,
  isLoading: true,
  isAuthenticated: false,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, isLoading: true };

    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        employee: action.payload.employee,
        token: action.payload.token,
        isLoading: false,
        isAuthenticated: true,
      };

    case "LOGIN_FAILURE":
      return { ...initialState, isLoading: false };

    case "LOGOUT":
      return { ...initialState, isLoading: false };

    default:
      return state;
  }
};

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // ✅ Load saved session on refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const employee = localStorage.getItem("employee");

    if (token && user) {
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          token,
          user: JSON.parse(user),
          employee: employee ? JSON.parse(employee) : null,
        },
      });
    } else {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  }, []);

  // ✅ LOGIN FUNCTION — corrected mapping
  const login = async (email, password) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await authAPI.login({ email, password });

      const {
        token,
        id: employeeId, // employeeId from backend
        firstName,
        lastName,
        email: userEmail,
        roles,
      } = res.data;

      // Data used for routing & permissions
      const user = {
        email: userEmail,
        firstName,
        lastName,
        role: roles.includes("ROLE_ADMIN") ? "admin" : "employee",
      };

      // Data used for EMS modules (Pay, Attendance, etc.)
      const employee = {
        id: employeeId, // ✅ correct ID for payroll/attendance API
        firstName,
        lastName,
        email: userEmail,
      };

      // Save to storage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("employee", JSON.stringify(employee));

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { token, user, employee },
      });

      // Notify other parts of the app (AppProvider) that auth is available now
      try {
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("auth:login"));
        }
      } catch (e) {
        // ignore
      }

      return { success: true, user, employee };
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
      return {
        success: false,
        message: err.response?.data?.message || "Login failed",
      };
    }
  };

  // ✅ LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("employee");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
