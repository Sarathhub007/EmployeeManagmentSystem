import React from "react";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <p className="text-gray-500 text-lg">No user data available.</p>
      </div>
    );
  }

  // Auto initials for avatar
  const initials = `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`;

  return (
    <div className="max-w-xl mx-auto mt-10 px-4">
      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold text-white backdrop-blur-sm">
              {initials}
            </div>
            <div>
              <h2 className="text-2xl font-semibold">{user.firstName} {user.lastName}</h2>
              <p className="text-sm text-blue-100">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="p-6 space-y-5">

          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-sm font-medium">Full Name</span>
            <span className="text-gray-900 text-sm font-semibold">
              {user.firstName} {user.lastName}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-sm font-medium">Email</span>
            <span className="text-gray-900 text-sm font-semibold">{user.email}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-sm font-medium">Role</span>
            <span className="text-gray-900 text-sm font-semibold capitalize">{user.role}</span>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-2"></div>

          <p className="text-gray-500 text-xs text-center">
            This information is synced with your account details.
          </p>

        </div>
      </div>
    </div>
  );
}

export default Profile;
