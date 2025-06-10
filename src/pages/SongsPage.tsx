import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Music, Clock, ChevronRight } from 'lucide-react';
import { songs } from '../data/songs';

const SongsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');

  const regions = ['all', ...new Set(songs.map(song => song.region))];

  const filteredSongs = songs.filter(song => {
    const matchesSearch = song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         song.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === 'all' || song.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Songs Library</h1>
        <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
          Explore traditional Indonesian songs and learn their cultural significance, lyrics, and melodies.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Search songs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="w-full md:w-48">
            <div className="relative">
              <select
                className="block w-full pl-3 pr-10 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 appearance-none"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
              >
                <option value="all">All Regions</option>
                {regions.filter(r => r !== 'all').map((region) => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Filter className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Song */}
      {filteredSongs.length > 0 && (
        <div className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <img
                  className="h-48 w-full md:h-full md:w-96 object-cover"
                  src={filteredSongs[0].imageUrl}
                  alt={filteredSongs[0].title}
                />
              </div>
              <div className="p-8">
                <div className="flex items-center mb-2">
                  <span className="bg-amber-100 dark:bg-amber-900/20 text-amber-800 dark:text-amber-400 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {filteredSongs[0].region}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {filteredSongs[0].title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {filteredSongs[0].description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {filteredSongs[0].instruments.map((instrument, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-300"
                    >
                      <Music className="w-4 h-4 mr-1" />
                      {instrument}
                    </span>
                  ))}
                </div>
                <Link
                  to={`/songs/${filteredSongs[0].id}`}
                  className="inline-flex items-center text-amber-500 hover:text-amber-600"
                >
                  Learn More
                  <ChevronRight className="ml-1 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Songs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSongs.slice(1).map((song) => (
          <Link
            key={song.id}
            to={`/songs/${song.id}`}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative h-48">
              <img
                src={song.imageUrl}
                alt={song.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-3 left-3 bg-amber-500 text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
                {song.region}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {song.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {song.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {song.instruments.map((instrument, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-300"
                  >
                    <Music className="w-4 h-4 mr-1" />
                    {instrument}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredSongs.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 dark:text-gray-400 text-lg">No songs found matching your criteria.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedRegion('all');
            }}
            className="mt-4 px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default SongsPage;