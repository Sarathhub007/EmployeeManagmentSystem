// src/context/AuthContext.jsx
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { authAPI } from "../services/api";

const initialState = {
  user: null,
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
        token: action.payload.token,
        isLoading: false,
        isAuthenticated: true,
      };
    case "LOGIN_FAILURE":
      return { ...initialState, isLoading: false };
    case "LOGOUT":
      return { ...initialState, isLoading: false };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
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

  // Load token + user on refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      try {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { token, user: JSON.parse(user) },
        });
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch({ type: "LOGIN_FAILURE" });
      }
    } else {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, []);

  // Login function
  const login = async (email, password) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await authAPI.login({ email, password });
      console.log("Full API Response:", res.data);
      
      const {
        token,
        id,
        firstName,    // Note: Changed from first_name
        lastName,     // Note: Changed from last_name
        email: userEmail,
        roles,
      } = res.data;

      console.log("First Name:", firstName);
      console.log("Last Name:", lastName);

      const user = {
        id,
        first_name: firstName,  // Map to frontend naming convention
        last_name: lastName,    // Map to frontend naming convention
        email: userEmail,
        role: roles.includes("ROLE_ADMIN") ? "admin" : "employee",
      };

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      dispatch({ type: "LOGIN_SUCCESS", payload: { token, user } });
      return { success: true, user };
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
      return {
        success: false,
        message: err.response?.data?.message || "Login failed",
      };
    }
  };

  // Register function
  const register = async (username, email, password) => {
    try {
      await authAPI.register({ username, email, password });
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Registration failed",
      };
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};