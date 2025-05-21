import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, link }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100 dark:border-gray-700 flex flex-col h-full">
      <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-full w-fit mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">{description}</p>
      <Link 
        to={link} 
        className="text-amber-500 hover:text-amber-600 inline-flex items-center mt-auto font-medium text-sm"
      >
        Explore
        <ChevronRight className="ml-1 h-4 w-4" />
      </Link>
    </div>
  );
};

export default FeatureCard;