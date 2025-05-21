import React from 'react';
import { useParams } from 'react-router-dom';

const SongDetail = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Song Details</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Song details will be implemented later */}
        <p className="text-gray-600">Coming soon: Detailed view for song {id}</p>
      </div>
    </div>
  );
};

export default SongDetail;