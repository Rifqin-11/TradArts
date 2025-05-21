import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Info, BookOpen, Volume2, ChevronLeft, Star } from 'lucide-react';
import { instruments } from '../data/instruments';
import { tutorials } from '../data/tutorials';
import TutorialCard from '../components/cards/TutorialCard';
import { useAuth } from '../contexts/AuthContext';

const InstrumentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'play' | 'learn' | 'history'>('play');
  const [isPlaying, setIsPlaying] = useState(false);
  const { user } = useAuth();
  
  const instrument = instruments.find(i => i.id === id);
  
  const relatedTutorials = tutorials.filter(tutorial => 
    tutorial.relatedInstruments?.includes(id || '')
  );

  useEffect(() => {
    if (!instrument) return;
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Set page title
    document.title = `${instrument.name} - TradArts`;
    
    return () => {
      // Reset title when component unmounts
      document.title = 'TradArts';
    };
  }, [instrument]);

  if (!instrument) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Instrument not found</h2>
        <Link 
          to="/instruments" 
          className="inline-flex items-center text-amber-500 hover:text-amber-600"
        >
          <ChevronLeft className="mr-1 h-5 w-5" />
          Back to Instruments
        </Link>
      </div>
    );
  }

  const handlePlaySound = (note: string) => {
    console.log(`Playing ${note} on ${instrument.name}`);
    setIsPlaying(true);
    
    // Simulate playing sound
    setTimeout(() => {
      setIsPlaying(false);
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link 
          to="/instruments" 
          className="inline-flex items-center text-amber-500 hover:text-amber-600"
        >
          <ChevronLeft className="mr-1 h-5 w-5" />
          Back to Instruments
        </Link>
      </div>

      {/* Instrument Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md mb-8">
        <div className="relative h-64 sm:h-80 md:h-96">
          <img 
            src={instrument.imageUrl} 
            alt={instrument.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6 w-full">
            <div className="flex items-center mb-2">
              <span className="bg-amber-500 text-white text-xs font-medium px-2 py-1 rounded-full mr-2">
                {instrument.region}
              </span>
              <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full">
                {instrument.difficulty} to play
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{instrument.name}</h1>
            <p className="text-white/90 text-sm sm:text-base max-w-3xl">
              {instrument.description}
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-8">
        <button
          className={`px-4 py-2 font-medium text-sm flex items-center 
            ${activeTab === 'play' 
              ? 'text-amber-500 border-b-2 border-amber-500 dark:text-amber-400 dark:border-amber-400' 
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          onClick={() => setActiveTab('play')}
        >
          <Play className="w-4 h-4 mr-2" />
          Play Instrument
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm flex items-center 
            ${activeTab === 'learn' 
              ? 'text-amber-500 border-b-2 border-amber-500 dark:text-amber-400 dark:border-amber-400' 
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          onClick={() => setActiveTab('learn')}
        >
          <BookOpen className="w-4 h-4 mr-2" />
          Tutorials
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm flex items-center 
            ${activeTab === 'history' 
              ? 'text-amber-500 border-b-2 border-amber-500 dark:text-amber-400 dark:border-amber-400' 
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          onClick={() => setActiveTab('history')}
        >
          <Info className="w-4 h-4 mr-2" />
          History & Context
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
        {activeTab === 'play' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Interactive {instrument.name} Simulation
            </h2>
            
            <div className="bg-amber-50 dark:bg-gray-700/50 rounded-lg p-4 mb-6">
              <p className="text-gray-700 dark:text-gray-300 text-sm italic">
                Click on different parts of the instrument to play sounds. You can also try to play along with tutorial melodies.
              </p>
            </div>

            {/* Interactive Instrument Simulation */}
            <div className="relative aspect-[16/9] bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden mb-6">
              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src={instrument.imageUrl} 
                  alt={`Interactive ${instrument.name}`} 
                  className="w-full h-full object-contain"
                />
                
                {/* Interactive hotspots - this would be customized per instrument */}
                <div 
                  className={`absolute top-1/4 left-1/4 w-16 h-16 rounded-full cursor-pointer ${
                    isPlaying ? 'bg-amber-500/30' : 'bg-amber-500/10 hover:bg-amber-500/20'
                  } transition-colors`}
                  onClick={() => handlePlaySound('C')}
                >
                  <span className="absolute inset-0 flex items-center justify-center text-amber-600 dark:text-amber-400 font-medium">
                    C
                  </span>
                </div>
                
                <div 
                  className={`absolute top-1/3 left-1/2 w-16 h-16 rounded-full cursor-pointer ${
                    isPlaying ? 'bg-amber-500/30' : 'bg-amber-500/10 hover:bg-amber-500/20'
                  } transition-colors`}
                  onClick={() => handlePlaySound('D')}
                >
                  <span className="absolute inset-0 flex items-center justify-center text-amber-600 dark:text-amber-400 font-medium">
                    D
                  </span>
                </div>
                
                <div 
                  className={`absolute top-1/2 left-1/3 w-16 h-16 rounded-full cursor-pointer ${
                    isPlaying ? 'bg-amber-500/30' : 'bg-amber-500/10 hover:bg-amber-500/20'
                  } transition-colors`}
                  onClick={() => handlePlaySound('E')}
                >
                  <span className="absolute inset-0 flex items-center justify-center text-amber-600 dark:text-amber-400 font-medium">
                    E
                  </span>
                </div>
              </div>
            </div>

            {/* Basic Melodies */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Basic Melodies
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['Melody 1', 'Melody 2', 'Melody 3', 'Melody 4'].map((melody, index) => (
                  <button
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-md hover:bg-amber-50 dark:hover:bg-gray-600 transition-colors"
                    onClick={() => console.log(`Playing ${melody}`)}
                  >
                    <span className="font-medium text-gray-800 dark:text-gray-200">{melody}</span>
                    <Volume2 className="w-5 h-5 text-amber-500" />
                  </button>
                ))}
              </div>
            </div>

            {/* Achievement Section */}
            {user && (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <Star className="w-5 h-5 text-amber-500 mr-2" />
                  Your Progress
                </h3>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-4">
                  <div className="flex items-center mb-2">
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 mr-4">
                      <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">25%</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Complete more melodies to unlock achievements and progress to advanced techniques.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'learn' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {instrument.name} Tutorials
            </h2>
            
            {relatedTutorials.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedTutorials.map((tutorial) => (
                  <TutorialCard key={tutorial.id} tutorial={tutorial} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 dark:text-gray-400">
                  No tutorials available for this instrument yet. Check back soon!
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'history' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              History and Cultural Context
            </h2>
            
            <div className="prose prose-amber max-w-none dark:prose-invert">
              <p>
                The {instrument.name} is a traditional instrument from {instrument.region}, Indonesia.
                With a rich history dating back centuries, it plays an important role in cultural ceremonies,
                traditional performances, and community gatherings.
              </p>
              
              <h3>Origins and Development</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              
              <h3>Cultural Significance</h3>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              
              <h3>Construction</h3>
              <p>
                The instrument is traditionally crafted from [materials] by skilled artisans. The process involves [description of process],
                which can take several [time period] to complete. Each instrument is unique and carries the artistic signature of its maker.
              </p>
              
              <div className="not-prose my-6">
                <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Did You Know?</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    An interesting fact about the {instrument.name} is that it's featured in UNESCO's list of intangible cultural heritage.
                  </p>
                </div>
              </div>
              
              <h3>Modern Usage</h3>
              <p>
                Today, the {instrument.name} continues to be an important part of Indonesian cultural expression.
                It is featured in both traditional performances and contemporary musical fusion, demonstrating its
                enduring relevance and adaptability in modern times.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstrumentDetail;