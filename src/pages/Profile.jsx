import React from 'react';
import { useAuth } from '../context/AuthContext';

function Profile() {
  const { user } = useAuth();

  if (!user) {
    return <div className="text-center py-8">No user data available.</div>;
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-blue-600">My Profile</h2>
      <div className="space-y-4">
        <div>
          <span className="font-medium text-gray-700">Name:</span>
          <span className="ml-2 text-gray-900">{user.firstName} {user.lastName}</span>
        </div>
        <div>
          <span className="font-medium text-gray-700">Email:</span>
          <span className="ml-2 text-gray-900">{user.email}</span>
        </div>
        <div>
          <span className="font-medium text-gray-700">Role:</span>
          <span className="ml-2 text-gray-900 capitalize">{user.role}</span>
        </div>
        {/* Add more user info here if available */}
      </div>
    </div>
  );
}

export default Profile;