import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import InstrumentCard from '../components/cards/InstrumentCard';
import { instruments } from '../data/instruments';

const InstrumentsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  // Get unique regions
  const regions = ['all', ...new Set(instruments.map(instrument => instrument.region))];
  const difficulties = ['all', 'Easy', 'Medium', 'Hard'];

  const filteredInstruments = instruments.filter(instrument => {
    const matchesSearch = instrument.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        instrument.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === 'all' || instrument.region === selectedRegion;
    const matchesDifficulty = selectedDifficulty === 'all' || instrument.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesRegion && matchesDifficulty;
  });

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Traditional Instruments</h1>
        <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
          Explore Indonesia's diverse traditional musical instruments and learn how to play them through interactive simulations.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Search instruments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-4">
            <div className="w-full md:w-auto">
              <label htmlFor="region-filter" className="sr-only">Filter by region</label>
              <div className="relative">
                <select
                  id="region-filter"
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
            
            <div className="w-full md:w-auto">
              <label htmlFor="difficulty-filter" className="sr-only">Filter by difficulty</label>
              <div className="relative">
                <select
                  id="difficulty-filter"
                  className="block w-full pl-3 pr-10 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 appearance-none"
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                >
                  <option value="all">All Difficulties</option>
                  {difficulties.filter(d => d !== 'all').map((difficulty) => (
                    <option key={difficulty} value={difficulty}>{difficulty}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Filter className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Instruments Grid */}
      {filteredInstruments.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredInstruments.map((instrument) => (
            <InstrumentCard key={instrument.id} instrument={instrument} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500 dark:text-gray-400 text-lg">No instruments found matching your criteria.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedRegion('all');
              setSelectedDifficulty('all');
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

export default InstrumentsPage;