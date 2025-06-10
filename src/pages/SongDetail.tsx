import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Music, MapPin, Play } from 'lucide-react';
import { songs } from '../data/songs';

const SongDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const song = songs.find(s => s.id === id);

  if (!song) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Song not found</h2>
        <Link 
          to="/songs" 
          className="inline-flex items-center text-amber-500 hover:text-amber-600"
        >
          <ChevronLeft className="mr-1 h-5 w-5" />
          Back to Songs
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link 
          to="/songs" 
          className="inline-flex items-center text-amber-500 hover:text-amber-600"
        >
          <ChevronLeft className="mr-1 h-5 w-5" />
          Back to Songs
        </Link>
      </div>

      {/* Song Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md mb-8">
        <div className="relative h-64 sm:h-80 md:h-96">
          <img 
            src={song.imageUrl} 
            alt={song.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6 w-full">
            <div className="flex items-center mb-2">
              <span className="bg-amber-500 text-white text-xs font-medium px-2 py-1 rounded-full mr-2">
                {song.region}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{song.title}</h1>
            <p className="text-white/90 text-sm sm:text-base max-w-3xl">
              {song.description}
            </p>
          </div>
        </div>
      </div>

      {/* Song Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Lyrics Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Lyrics</h2>
            <div className="prose prose-amber max-w-none dark:prose-invert">
              <pre className="whitespace-pre-wrap font-sans text-gray-600 dark:text-gray-400">
                {song.lyrics}
              </pre>
            </div>
          </div>

          {/* Cultural Context */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Cultural Context</h2>
            <div className="prose prose-amber max-w-none dark:prose-invert">
              <p className="text-gray-600 dark:text-gray-400">
                This traditional song originates from {song.region}, where it plays an important role in local cultural practices.
                It is often performed during ceremonies and celebrations, accompanied by traditional instruments like
                {song.instruments.join(' and ')}.
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Info */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Song Details</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-amber-500 mr-2" />
                <span className="text-gray-600 dark:text-gray-400">{song.region}</span>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Instruments</h4>
                <div className="flex flex-wrap gap-2">
                  {song.instruments.map((instrument, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-300"
                    >
                      <Music className="w-4 h-4 mr-1" />
                      {instrument}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Practice Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Practice Tools</h3>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-center px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors">
                <Play className="w-5 h-5 mr-2" />
                Play Melody
              </button>
              <button className="w-full flex items-center justify-center px-4 py-2 border border-amber-500 text-amber-500 rounded-md hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors">
                Download Sheet Music
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongDetail;