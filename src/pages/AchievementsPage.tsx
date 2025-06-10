import React from 'react';
import { Trophy, Star, Award, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  points: number;
  progress: number;
  unlocked: boolean;
}

const achievements: Achievement[] = [
  {
    id: '1',
    title: 'Gamelan Master',
    description: 'Complete all gamelan tutorials and challenges',
    icon: <Trophy className="w-6 h-6" />,
    points: 1000,
    progress: 75,
    unlocked: true
  },
  {
    id: '2',
    title: 'Cultural Explorer',
    description: 'Learn about instruments from 5 different regions',
    icon: <Star className="w-6 h-6" />,
    points: 500,
    progress: 60,
    unlocked: true
  },
  {
    id: '3',
    title: 'Performance Pro',
    description: 'Successfully complete 10 performance challenges',
    icon: <Award className="w-6 h-6" />,
    points: 750,
    progress: 30,
    unlocked: false
  }
];

const AchievementsPage: React.FC = () => {
  const { user } = useAuth();
  const totalPoints = achievements.reduce((sum, achievement) => 
    achievement.unlocked ? sum + achievement.points : sum, 0
  );

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Achievements</h1>
        <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
          Track your progress and unlock achievements as you explore Indonesian traditional arts and music.
        </p>
      </div>

      {/* User Stats */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-amber-500 to-red-500 flex items-center justify-center text-white text-2xl font-bold">
              {user?.name.charAt(0)}
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user?.name}</h2>
              <p className="text-gray-600 dark:text-gray-400">Cultural Explorer</p>
            </div>
          </div>
          <div className="flex items-center space-x-8">
            <div className="text-center">
              <p className="text-2xl font-bold text-amber-500">{totalPoints}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Points</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-amber-500">
                {achievements.filter(a => a.unlocked).length}/{achievements.length}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Achievements</p>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 ${
              !achievement.unlocked && 'opacity-75'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-lg ${
                achievement.unlocked
                  ? 'bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
              }`}>
                {achievement.icon}
              </div>
              {!achievement.unlocked && (
                <Lock className="w-5 h-5 text-gray-400" />
              )}
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              {achievement.title}
            </h3>
            
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {achievement.description}
            </p>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Progress</span>
                <span className="font-medium text-amber-500">{achievement.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-amber-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${achievement.progress}%` }}
                ></div>
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center">
                <Trophy className="w-4 h-4 text-amber-500 mr-1" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {achievement.points} points
                </span>
              </div>
              {achievement.unlocked && (
                <span className="text-sm text-green-500 font-medium">Unlocked</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsPage;