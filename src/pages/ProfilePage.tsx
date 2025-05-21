import React from 'react';

function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <p className="mt-1 text-gray-900">John Doe</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-gray-900">john.doe@example.com</p>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-2">Musical Journey</h2>
            <div className="space-y-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Instruments</label>
                <p className="mt-1 text-gray-900">Guitar, Piano</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Experience Level</label>
                <p className="mt-1 text-gray-900">Intermediate</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Progress</h2>
            <div className="space-y-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Completed Tutorials</label>
                <p className="mt-1 text-gray-900">12</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Songs Learned</label>
                <p className="mt-1 text-gray-900">8</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;