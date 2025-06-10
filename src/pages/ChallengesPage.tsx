import React, { useState } from 'react';
import { Trophy, Clock, Star, ChevronRight, Filter, Search } from 'lucide-react';
import { Challenge } from '../types';
import ChallengeStart from '../components/challenges/ChallengeStart';

const challenges: Challenge[] = [
  {
    id: 'gamelan-basics',
    title: 'Master Gamelan Basics',
    description: 'Complete a series of basic gamelan exercises and earn your first achievement.',
    type: 'performance',
    difficulty: 'beginner',
    points: 100,
    timeLimit: 600, // 10 minutes
  },
  {
    id: 'angklung-quiz',
    title: 'Angklung History Quiz',
    description: 'Test your knowledge about the history and cultural significance of the Angklung.',
    type: 'quiz',
    difficulty: 'intermediate',
    points: 150,
  },
  {
    id: 'identify-instruments',
    title: 'Instrument Sound Recognition',
    description: 'Listen to different traditional instruments and identify them correctly.',
    type: 'listening',
    difficulty: 'intermediate',
    points: 200,
    timeLimit: 300, // 5 minutes
  },
  {
    id: 'advanced-gamelan',
    title: 'Advanced Gamelan Techniques',
    description: 'Show your mastery of complex gamelan patterns and rhythms.',
    type: 'performance',
    difficulty: 'advanced',
    points: 300,
    timeLimit: 900, // 15 minutes
  },
];

const ChallengesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);

  const filteredChallenges = challenges.filter(challenge => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         challenge.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'all' || challenge.difficulty === selectedDifficulty;
    const matchesType = selectedType === 'all' || challenge.type === selectedType;
    
    return matchesSearch && matchesDifficulty && matchesType;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'intermediate':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400';
      case 'advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'quiz':
        return <Star className="w-5 h-5" />;
      case 'performance':
        return <Trophy className="w-5 h-5" />;
      case 'listening':
        return <Clock className="w-5 h-5" />;
      default:
        return <Star className="w-5 h-5" />;
    }
  };

  const handleStartChallenge = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
  };

  const handleChallengeComplete = (score: number) => {
    if (selectedChallenge) {
      setCompletedChallenges([...completedChallenges, selectedChallenge.id]);
      // Here you would typically save the score to the backend
      console.log(`Challenge completed with score: ${score}`);
    }
    setSelectedChallenge(null);
  };

  if (selectedChallenge) {
    return (
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <ChallengeStart
          challenge={selectedChallenge}
          onClose={() => setSelectedChallenge(null)}
          onComplete={handleChallengeComplete}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Daily Challenges</h1>
        <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
          Test your knowledge and skills with our daily challenges. Complete them to earn points and unlock achievements!
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
              placeholder="Search challenges..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-4">
            <div className="w-full md:w-auto">
              <div className="relative">
                <select
                  className="block w-full pl-3 pr-10 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 appearance-none"
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                >
                  <option value="all">All Difficulties</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Filter className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-auto">
              <div className="relative">
                <select
                  className="block w-full pl-3 pr-10 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 appearance-none"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="quiz">Quiz</option>
                  <option value="performance">Performance</option>
                  <option value="listening">Listening</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Filter className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChallenges.map((challenge) => (
          <div
            key={challenge.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-700 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  {getTypeIcon(challenge.type)}
                </div>
              </div>
              <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getDifficultyColor(challenge.difficulty)}`}>
                {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {challenge.title}
            </h3>
            
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {challenge.description}
            </p>
            
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center">
                <Trophy className="w-4 h-4 text-amber-500 mr-1" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {challenge.points} points
                </span>
              </div>
              
              {challenge.timeLimit && (
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-gray-400 mr-1" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {Math.floor(challenge.timeLimit / 60)} min
                  </span>
                </div>
              )}
            </div>
            
            <button 
              onClick={() => handleStartChallenge(challenge)}
              className={`mt-4 w-full inline-flex items-center justify-center px-4 py-2 rounded-md font-medium transition-colors ${
                completedChallenges.includes(challenge.id)
                  ? 'bg-green-500 hover:bg-green-600 text-white'
                  : 'bg-amber-500 hover:bg-amber-600 text-white'
              }`}
            >
              {completedChallenges.includes(challenge.id) ? (
                'Completed'
              ) : (
                <>
                  Start Challenge
                  <ChevronRight className="ml-2 h-5 w-5" />
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {filteredChallenges.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 dark:text-gray-400 text-lg">No challenges found matching your criteria.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedDifficulty('all');
              setSelectedType('all');
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

export default ChallengesPage;