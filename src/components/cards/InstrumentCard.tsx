import React from 'react';
import { Link } from 'react-router-dom';
import { Music } from 'lucide-react';
import { Instrument } from '../../types';

interface InstrumentCardProps {
  instrument: Instrument;
}

const InstrumentCard: React.FC<InstrumentCardProps> = ({ instrument }) => {
  return (
    <Link 
      to={`/instruments/${instrument.id}`}
      className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full border border-gray-100 dark:border-gray-700"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={instrument.imageUrl} 
          alt={instrument.name} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-3 left-3 bg-amber-500 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center">
          <Music className="w-3 h-3 mr-1" />
          {instrument.region}
        </div>
      </div>
      <div className="p-4 flex-grow">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1 group-hover:text-amber-500 transition-colors">
          {instrument.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-2">
          {instrument.description}
        </p>
        <div className="mt-auto pt-2 flex justify-between items-center">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {instrument.difficulty} to play
          </span>
          <span className="text-amber-500 font-medium text-sm">
            Try it out
          </span>
        </div>
      </div>
    </Link>
  );
};

export default InstrumentCard;