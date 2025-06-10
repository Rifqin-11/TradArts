import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Info, BookOpen, Volume2, ChevronLeft, Star, Share2, Heart, Download } from 'lucide-react';
import { instruments } from '../data/instruments';
import { tutorials } from '../data/tutorials';
import TutorialCard from '../components/cards/TutorialCard';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const InstrumentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'play' | 'learn' | 'history'>('play');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentNote, setCurrentNote] = useState<string | null>(null);
  const [userProgress, setUserProgress] = useState(25);
  const [isFavorited, setIsFavorited] = useState(false);
  const { user } = useAuth();
  
  const instrument = instruments.find(i => i.id === id);
  
  const relatedTutorials = tutorials.filter(tutorial => 
    tutorial.relatedInstruments?.includes(id || '')
  );

  // Interactive notes for different instruments
  const instrumentNotes = {
    gamelan: [
      { note: 'Do', position: { top: '20%', left: '15%' }, sound: 'gamelan-do' },
      { note: 'Re', position: { top: '25%', left: '30%' }, sound: 'gamelan-re' },
      { note: 'Mi', position: { top: '30%', left: '45%' }, sound: 'gamelan-mi' },
      { note: 'Fa', position: { top: '35%', left: '60%' }, sound: 'gamelan-fa' },
      { note: 'Sol', position: { top: '40%', left: '75%' }, sound: 'gamelan-sol' }
    ],
    angklung: [
      { note: 'C', position: { top: '30%', left: '20%' }, sound: 'angklung-c' },
      { note: 'D', position: { top: '35%', left: '35%' }, sound: 'angklung-d' },
      { note: 'E', position: { top: '40%', left: '50%' }, sound: 'angklung-e' },
      { note: 'F', position: { top: '45%', left: '65%' }, sound: 'angklung-f' }
    ],
    sasando: [
      { note: 'String 1', position: { top: '25%', left: '25%' }, sound: 'sasando-1' },
      { note: 'String 2', position: { top: '35%', left: '35%' }, sound: 'sasando-2' },
      { note: 'String 3', position: { top: '45%', left: '45%' }, sound: 'sasando-3' },
      { note: 'String 4', position: { top: '55%', left: '55%' }, sound: 'sasando-4' }
    ]
  };

  const currentInstrumentNotes = instrumentNotes[id as keyof typeof instrumentNotes] || [];

  useEffect(() => {
    if (!instrument) return;
    
    window.scrollTo(0, 0);
    document.title = `${instrument.name} - TradArts`;
    
    return () => {
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

  const handlePlaySound = (note: string, soundFile: string) => {
    console.log(`Playing ${note} (${soundFile}) on ${instrument.name}`);
    setCurrentNote(note);
    setIsPlaying(true);
    
    // Simulate playing sound with audio feedback
    try {
      // In a real app, you would play actual audio files here
      // const audio = new Audio(`/sounds/${soundFile}.mp3`);
      // audio.play();
      
      toast.success(`Playing ${note}`, {
        duration: 1000,
        icon: '🎵'
      });
    } catch (error) {
      console.log('Audio playback not available in demo');
    }
    
    setTimeout(() => {
      setIsPlaying(false);
      setCurrentNote(null);
    }, 1000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Learn ${instrument.name} - TradArts`,
          text: instrument.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    toast.success(isFavorited ? 'Removed from favorites' : 'Added to favorites');
  };

  const handleDownloadGuide = () => {
    toast.success('Downloading practice guide...');
    // In a real app, this would download a PDF guide
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
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <span className="bg-amber-500 text-white text-xs font-medium px-2 py-1 rounded-full mr-2">
                  {instrument.region}
                </span>
                <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full">
                  {instrument.difficulty} to play
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleFavorite}
                  className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                    isFavorited 
                      ? 'bg-red-500/80 text-white' 
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={handleShare}
                  className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
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
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Interactive {instrument.name} Simulation
              </h2>
              <button
                onClick={handleDownloadGuide}
                className="inline-flex items-center px-3 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Practice Guide
              </button>
            </div>
            
            <div className="bg-amber-50 dark:bg-gray-700/50 rounded-lg p-4 mb-6">
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                <strong>How to play:</strong> Click on the highlighted areas of the instrument to play different notes. 
                Try following along with the basic melodies below to practice your technique.
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
                
                {/* Interactive hotspots */}
                {currentInstrumentNotes.map((noteData, index) => (
                  <div 
                    key={index}
                    className={`absolute w-12 h-12 rounded-full cursor-pointer transition-all duration-200 ${
                      currentNote === noteData.note && isPlaying 
                        ? 'bg-amber-500/60 scale-125' 
                        : 'bg-amber-500/20 hover:bg-amber-500/40 hover:scale-110'
                    } flex items-center justify-center`}
                    style={noteData.position}
                    onClick={() => handlePlaySound(noteData.note, noteData.sound)}
                  >
                    <span className="text-amber-700 dark:text-amber-300 font-bold text-xs">
                      {noteData.note}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Basic Melodies */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Practice Melodies
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['Traditional Melody 1', 'Traditional Melody 2', 'Folk Song Pattern', 'Ceremonial Rhythm'].map((melody, index) => (
                  <button
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-amber-50 dark:hover:bg-gray-600 transition-colors group"
                    onClick={() => {
                      toast.success(`Playing ${melody}`, { icon: '🎵' });
                      console.log(`Playing ${melody}`);
                    }}
                  >
                    <div className="text-left">
                      <span className="font-medium text-gray-800 dark:text-gray-200 block">{melody}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Difficulty: {index < 2 ? 'Beginner' : 'Intermediate'}
                      </span>
                    </div>
                    <Volume2 className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
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
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {instrument.name} Mastery
                    </span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {userProgress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 mb-3">
                    <div 
                      className="bg-amber-500 h-2.5 rounded-full transition-all duration-500" 
                      style={{ width: `${userProgress}%` }}
                    ></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Melodies Learned:</span>
                      <span className="font-medium text-gray-900 dark:text-white ml-1">3/12</span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Practice Time:</span>
                      <span className="font-medium text-gray-900 dark:text-white ml-1">2.5 hrs</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                    Complete more melodies and tutorials to unlock achievements and progress to advanced techniques.
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
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No tutorials available yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  We're working on creating comprehensive tutorials for the {instrument.name}. Check back soon!
                </p>
                <Link
                  to="/tutorials"
                  className="inline-flex items-center px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors"
                >
                  Browse All Tutorials
                </Link>
              </div>
            )}
          </div>
        )}

        {activeTab === 'history' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              History and Cultural Context
            </h2>
            
            <div className="prose prose-amber max-w-none dark:prose-invert">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h3>Origins and Development</h3>
                  <p>
                    The {instrument.name} is a traditional instrument from {instrument.region}, Indonesia, 
                    with a rich history dating back centuries. This remarkable instrument has been an integral 
                    part of Indonesian cultural heritage, playing important roles in ceremonial events, 
                    traditional performances, and community gatherings.
                  </p>
                  
                  <h3>Cultural Significance</h3>
                  <p>
                    In Indonesian culture, the {instrument.name} represents more than just a musical instrument. 
                    It embodies the spiritual and social values of the community, often used in religious ceremonies, 
                    harvest festivals, and important life events such as weddings and coming-of-age rituals.
                  </p>
                  
                  <h3>Construction and Materials</h3>
                  <p>
                    Traditional {instrument.name} instruments are crafted by skilled artisans using time-honored 
                    techniques passed down through generations. The construction process requires careful selection 
                    of materials and can take several weeks to complete, with each instrument carrying the unique 
                    artistic signature of its maker.
                  </p>
                  
                  <h3>Modern Usage and Preservation</h3>
                  <p>
                    Today, the {instrument.name} continues to be an important part of Indonesian cultural expression. 
                    It is featured in both traditional performances and contemporary musical fusion, demonstrating 
                    its enduring relevance and adaptability in modern times. Educational programs and cultural 
                    preservation efforts ensure that this musical tradition continues to thrive.
                  </p>
                </div>
                
                <div className="lg:col-span-1">
                  <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-6 mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Quick Facts</h4>
                    <ul className="space-y-2 text-sm">
                      <li><strong>Origin:</strong> {instrument.region}</li>
                      <li><strong>Type:</strong> Traditional Indonesian Instrument</li>
                      <li><strong>Difficulty:</strong> {instrument.difficulty}</li>
                      <li><strong>UNESCO Status:</strong> Intangible Cultural Heritage</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Did You Know?</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      The {instrument.name} is not just an instrument but a symbol of community unity. 
                      In traditional settings, playing this instrument often requires cooperation between 
                      multiple musicians, representing the importance of harmony in Indonesian society.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstrumentDetail;