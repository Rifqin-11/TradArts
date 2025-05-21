import React from 'react';

function CommunityPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Community</h1>
      <div className="grid gap-8">
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Join Our Music Community</h2>
          <p className="text-gray-600 mb-4">
            Connect with fellow musicians, share your progress, and learn from others in our vibrant community.
          </p>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium mb-2">Discussion Forums</h3>
              <p className="text-sm text-gray-500">
                Engage in discussions about music theory, technique, and more.
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium mb-2">Practice Groups</h3>
              <p className="text-sm text-gray-500">
                Find practice partners and join group sessions.
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium mb-2">Share Your Progress</h3>
              <p className="text-sm text-gray-500">
                Post videos, get feedback, and celebrate achievements.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default CommunityPage;