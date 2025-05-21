import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Music } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-12">
      <div className="text-center">
        <div className="flex justify-center mb-6 animate-pulse">
          <Music className="h-16 w-16 text-amber-500" />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
          Sorry, we couldn't find the page you're looking for. Perhaps you'd like to explore our collection of traditional instruments instead?
        </p>
        
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-amber-500 text-white rounded-md font-medium hover:bg-amber-600 transition-colors"
          >
            <Home className="mr-2 h-5 w-5" />
            Back to Home
          </Link>
          <Link
            to="/instruments"
            className="inline-flex items-center justify-center px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-md font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Music className="mr-2 h-5 w-5" />
            Explore Instruments
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;