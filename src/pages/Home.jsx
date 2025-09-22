// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  UserGroupIcon, 
  ClockIcon, 
  ChartBarIcon, 
  SparklesIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  StarIcon
} from "@heroicons/react/24/outline";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: UserGroupIcon,
      title: "Employee Records",
      description: "Maintain employee details, departments, and roles in one central system with advanced search and filtering.",
      color: "from-blue-500 to-cyan-500",
      stats: "1000+ Records",
      delay: "0ms"
    },
    {
      icon: ClockIcon,
      title: "Attendance & Leave",
      description: "Track daily attendance and manage leave requests efficiently with automated notifications and approvals.",
      color: "from-purple-500 to-pink-500",
      stats: "Real-time Tracking",
      delay: "200ms"
    },
    {
      icon: ChartBarIcon,
      title: "Performance & Payroll",
      description: "Review employee performance and automate payroll with ease using intelligent analytics and reporting.",
      color: "from-emerald-500 to-teal-500",
      stats: "Analytics Driven",
      delay: "400ms"
    }
  ];

  const stats = [
    { label: "Active Employees", value: "2,500+", icon: UserGroupIcon },
    { label: "Companies Trust Us", value: "150+", icon: StarIcon },
    { label: "Time Saved Daily", value: "4hrs", icon: ClockIcon },
    { label: "Accuracy Rate", value: "99.9%", icon: CheckCircleIcon }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <header className="relative z-10 pt-20 pb-32 text-center px-6">
        <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/20 rounded-full mb-8">
            <SparklesIcon className="w-5 h-5 text-yellow-400 mr-2" />
            <span className="text-white/90 text-sm font-medium">Next-Generation HR Management</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight">
            Employee Management
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Reimagined
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Manage employees, track attendance, approve leaves, and monitor performance — all in one place.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to="/login"
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
            >
              <span>Sign In</span>
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              to="/register"
              className="group px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-2xl hover:bg-white/20 transition-all duration-300 flex items-center space-x-2"
            >
              <span>Sign Up</span>
              <SparklesIcon className="w-5 h-5 text-yellow-400" />
            </Link>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="relative z-10 -mt-16 mb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="inline-flex p-3 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-gray-300 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <main className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Powerful Features for
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Modern Teams</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to manage your workforce efficiently and drive organizational success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                style={{ animationDelay: feature.delay }}
              >
                <div className={`inline-flex p-4 bg-gradient-to-br ${feature.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                    {feature.title}
                  </h3>
                  <span className={`px-3 py-1 bg-gradient-to-r ${feature.color} text-white text-xs font-semibold rounded-full`}>
                    {feature.stats}
                  </span>
                </div>
                
                <p className="text-gray-300 leading-relaxed mb-6">
                  {feature.description}
                </p>
                
                <div className="flex items-center text-blue-400 font-semibold group-hover:text-purple-400 transition-colors duration-300">
                  <span>Learn more</span>
                  <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-black/20 backdrop-blur-xl border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-3">
              <UserGroupIcon className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">EMS Pro</span>
          </div>
          <p className="text-gray-400 mb-8">
            © {new Date().getFullYear()} Employee Management System. Empowering teams worldwide.
          </p>
          <div className="flex justify-center space-x-8 text-gray-400 text-sm">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#support" className="hover:text-white transition-colors">Support</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Home;
