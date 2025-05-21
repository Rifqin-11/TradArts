import React from 'react';

const SongsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Songs Library</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Song list will be implemented later */}
        <p className="text-gray-600">Coming soon: Browse and learn your favorite songs!</p>
      </div>
    </div>
  );
};

export default SongsPage;