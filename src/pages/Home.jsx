// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  UserGroupIcon,
  ClockIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

const Home = () => {
  const features = [
    {
      icon: UserGroupIcon,
      title: "Employee Records",
      desc: "Store and manage complete employee information with ease.",
    },
    {
      icon: ClockIcon,
      title: "Attendance & Leave",
      desc: "Track attendance and handle leave requests effortlessly.",
    },
    {
      icon: ChartBarIcon,
      title: "Performance & Payroll",
      desc: "Monitor performance and manage payroll securely.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      
      {/* =========================== HERO =========================== */}
      <header className="text-center py-24 px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
          Empower Your Workforce with{" "}
          <span className="text-blue-400">Efficiency</span>
        </h1>

        <p className="text-gray-300 max-w-2xl mx-auto mb-10 text-lg">
          A modern and intuitive solution to manage employees, attendance,
          leaves, payroll, and performance — all in one system.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/login"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold 
            shadow-lg hover:shadow-xl transition-all"
          >
            Sign In
          </Link>

          <Link
            to="/register"
            className="px-8 py-3 border border-white/40 hover:bg-white/10 rounded-xl 
            font-semibold transition-all"
          >
            Sign Up
          </Link>
        </div>
      </header>

      {/* ======================== FEATURES ========================== */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">
          What You Can Do
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-slate-800 rounded-2xl border border-slate-700 p-8 
              hover:border-blue-500/50 hover:bg-slate-750 
              shadow-lg hover:shadow-xl transition-all group"
            >
              <item.icon className="w-12 h-12 text-blue-400 mb-6 group-hover:text-blue-300 transition" />

              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>

              <p className="text-gray-300 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================== FOOTER ========================== */}
      <footer className="text-center py-6 border-t border-white/10 text-gray-400">
        © {new Date().getFullYear()} EMS — Built for Simplicity & Power
      </footer>
    </div>
  );
};

export default Home;
