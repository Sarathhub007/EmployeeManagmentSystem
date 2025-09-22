// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Hero Section */}
      <header className="bg-blue-600 text-white py-12">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-4xl font-extrabold mb-4">
            Employee Management System
          </h1>
          <p className="text-lg mb-6">
            Manage employees, track attendance, approve leaves, and monitor
            performance — all in one place.
          </p>
          <div className="space-x-4">
            <Link
              to="/login"
              className="px-6 py-2 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-gray-100"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-6 py-2 bg-blue-700 text-white font-semibold rounded-lg shadow hover:bg-blue-800"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <main className="flex-grow py-16">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-xl font-semibold mb-2">Employee Records</h3>
            <p className="text-gray-600">
              Maintain employee details, departments, and roles in one central
              system.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-xl font-semibold mb-2">Attendance & Leave</h3>
            <p className="text-gray-600">
              Track daily attendance and manage leave requests efficiently.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-xl font-semibold mb-2">Performance & Payroll</h3>
            <p className="text-gray-600">
              Review employee performance and automate payroll with ease.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-6 text-center">
        <p>© {new Date().getFullYear()} Employee Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
