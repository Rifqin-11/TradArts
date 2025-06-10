import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Play, Pause, Volume2, VolumeX, Maximize, Minimize, BookOpen } from 'lucide-react';
import { tutorials } from '../data/tutorials';

const TutorialPlayerPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const tutorial = tutorials.find(t => t.id === id);

  useEffect(() => {
    if (!tutorial) return;
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Set page title
    document.title = `${tutorial.title} - TradArts Tutorial`;
    
    return () => {
      document.title = 'TradArts';
    };
  }, [tutorial]);

  if (!tutorial) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Tutorial not found</h2>
        <Link 
          to="/tutorials" 
          className="inline-flex items-center text-amber-500 hover:text-amber-600"
        >
          <ChevronLeft className="mr-1 h-5 w-5" />
          Back to Tutorials
        </Link>
      </div>
    );
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProgress(Number(e.target.value));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Convert duration string to seconds for progress bar
  const durationInSeconds = tutorial.duration.split(':').reduce((acc, time) => (60 * acc) + +time, 0);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Video Player Section */}
      <div className="bg-black">
        <div className="container mx-auto px-4">
          <div className="relative pt-[56.25%]">
            {/* Video Player */}
            <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
              <img 
                src={tutorial.thumbnailUrl} 
                alt={tutorial.title}
                className="w-full h-full object-contain"
              />
              
              {/* Play Button Overlay */}
              {!isPlaying && (
                <button
                  onClick={togglePlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/50 group"
                >
                  <div className="bg-white/90 dark:bg-gray-900/90 rounded-full p-6 group-hover:scale-110 transition-transform">
                    <Play className="h-12 w-12 text-amber-500" />
                  </div>
                </button>
              )}

              {/* Video Controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                {/* Progress Bar */}
                <div className="flex items-center mb-4">
                  <span className="text-white text-sm mr-2">{formatTime(progress)}</span>
                  <input
                    type="range"
                    min="0"
                    max={durationInSeconds}
                    value={progress}
                    onChange={handleProgressChange}
                    className="flex-grow h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-amber-500 [&::-webkit-slider-thumb]:rounded-full"
                  />
                  <span className="text-white text-sm ml-2">{tutorial.duration}</span>
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={togglePlay}
                      className="text-white hover:text-amber-500 transition-colors"
                    >
                      {isPlaying ? (
                        <Pause className="w-6 h-6" />
                      ) : (
                        <Play className="w-6 h-6" />
                      )}
                    </button>
                    <button
                      onClick={toggleMute}
                      className="text-white hover:text-amber-500 transition-colors"
                    >
                      {isMuted ? (
                        <VolumeX className="w-6 h-6" />
                      ) : (
                        <Volume2 className="w-6 h-6" />
                      )}
                    </button>
                  </div>
                  <button
                    onClick={toggleFullscreen}
                    className="text-white hover:text-amber-500 transition-colors"
                  >
                    {isFullscreen ? (
                      <Minimize className="w-6 h-6" />
                    ) : (
                      <Maximize className="w-6 h-6" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tutorial Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {tutorial.title}
              </h1>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                <span className="bg-amber-100 dark:bg-amber-900/20 text-amber-800 dark:text-amber-400 px-2 py-1 rounded-full text-xs font-medium">
                  {tutorial.category}
                </span>
                <span className="mx-2">•</span>
                <span>{tutorial.views.toLocaleString()} views</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                {tutorial.description}
              </p>
            </div>

            {/* Tutorial Notes */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Tutorial Notes
              </h2>
              <div className="prose prose-amber max-w-none dark:prose-invert">
                <p>
                  This tutorial covers the following topics:
                </p>
                <ul>
                  <li>Basic techniques and proper form</li>
                  <li>Traditional playing styles</li>
                  <li>Common patterns and variations</li>
                  <li>Practice exercises</li>
                </ul>
                <p>
                  Practice along with the video and make sure to pause and repeat sections as needed.
                  Remember to start slowly and gradually increase your speed as you become more comfortable
                  with the movements.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Related Tutorials */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Related Tutorials
              </h3>
              <div className="space-y-4">
                {tutorials
                  .filter(t => t.id !== tutorial.id && t.category === tutorial.category)
                  .slice(0, 3)
                  .map(relatedTutorial => (
                    <Link
                      key={relatedTutorial.id}
                      to={`/tutorials/${relatedTutorial.id}`}
                      className="flex items-start space-x-3 group"
                    >
                      <div className="relative flex-shrink-0 w-24 h-16">
                        <img
                          src={relatedTutorial.thumbnailUrl}
                          alt={relatedTutorial.title}
                          className="w-full h-full object-cover rounded"
                        />
                        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                          <Play className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-amber-500 transition-colors line-clamp-2">
                          {relatedTutorial.title}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {relatedTutorial.duration}
                        </p>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialPlayerPage;