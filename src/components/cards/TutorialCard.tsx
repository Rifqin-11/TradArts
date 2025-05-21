import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Eye, Play } from 'lucide-react';
import { Tutorial } from '../../types';

interface TutorialCardProps {
  tutorial: Tutorial;
}

const TutorialCard: React.FC<TutorialCardProps> = ({ tutorial }) => {
  return (
    <Link 
      to={`/tutorials/${tutorial.id}`}
      className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full border border-gray-100 dark:border-gray-700"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={tutorial.thumbnailUrl} 
          alt={tutorial.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-white/90 dark:bg-gray-900/90 rounded-full p-3">
            <Play className="h-8 w-8 text-amber-500" />
          </div>
        </div>
        <div className="absolute bottom-3 left-3 bg-amber-500 text-white text-xs font-medium px-2 py-1 rounded-full">
          {tutorial.category}
        </div>
      </div>
      <div className="p-4 flex-grow">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1 group-hover:text-amber-500 transition-colors line-clamp-2">
          {tutorial.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-2">
          {tutorial.description}
        </p>
        <div className="mt-auto pt-2 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>{tutorial.duration}</span>
          </div>
          <div className="flex items-center">
            <Eye className="h-3 w-3 mr-1" />
            <span>{tutorial.views} views</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TutorialCard;