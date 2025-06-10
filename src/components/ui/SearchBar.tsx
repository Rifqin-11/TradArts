import React, { useState, useEffect } from 'react';
import { Search, X, Music, BookOpen, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { instruments } from '../../data/instruments';
import { tutorials } from '../../data/tutorials';
import { songs } from '../../data/songs';

interface SearchResult {
  id: string;
  title: string;
  type: 'instrument' | 'tutorial' | 'song';
  description: string;
  url: string;
  imageUrl?: string;
}

interface SearchBarProps {
  onClose?: () => void;
  autoFocus?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onClose, autoFocus = false }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const searchResults: SearchResult[] = [];
    const lowercaseQuery = query.toLowerCase();

    // Search instruments
    instruments.forEach(instrument => {
      if (
        instrument.name.toLowerCase().includes(lowercaseQuery) ||
        instrument.description.toLowerCase().includes(lowercaseQuery) ||
        instrument.region.toLowerCase().includes(lowercaseQuery)
      ) {
        searchResults.push({
          id: instrument.id,
          title: instrument.name,
          type: 'instrument',
          description: `${instrument.region} • ${instrument.difficulty}`,
          url: `/instruments/${instrument.id}`,
          imageUrl: instrument.imageUrl
        });
      }
    });

    // Search tutorials
    tutorials.forEach(tutorial => {
      if (
        tutorial.title.toLowerCase().includes(lowercaseQuery) ||
        tutorial.description.toLowerCase().includes(lowercaseQuery) ||
        tutorial.category.toLowerCase().includes(lowercaseQuery)
      ) {
        searchResults.push({
          id: tutorial.id,
          title: tutorial.title,
          type: 'tutorial',
          description: `${tutorial.category} • ${tutorial.duration}`,
          url: `/tutorials/${tutorial.id}`,
          imageUrl: tutorial.thumbnailUrl
        });
      }
    });

    // Search songs
    songs.forEach(song => {
      if (
        song.title.toLowerCase().includes(lowercaseQuery) ||
        song.description.toLowerCase().includes(lowercaseQuery) ||
        song.region.toLowerCase().includes(lowercaseQuery)
      ) {
        searchResults.push({
          id: song.id,
          title: song.title,
          type: 'song',
          description: `${song.region} • Traditional Song`,
          url: `/songs/${song.id}`,
          imageUrl: song.imageUrl
        });
      }
    });

    setResults(searchResults.slice(0, 8)); // Limit to 8 results
    setIsOpen(true);
  }, [query]);

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  const handleResultClick = () => {
    setIsOpen(false);
    setQuery('');
    onClose?.();
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'instrument':
        return <Music className="w-4 h-4 text-amber-500" />;
      case 'tutorial':
        return <BookOpen className="w-4 h-4 text-blue-500" />;
      case 'song':
        return <Users className="w-4 h-4 text-green-500" />;
      default:
        return <Search className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'instrument':
        return 'Instrument';
      case 'tutorial':
        return 'Tutorial';
      case 'song':
        return 'Song';
      default:
        return '';
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          autoFocus={autoFocus}
          className="block w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          placeholder="Search instruments, tutorials, songs..."
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <X className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          <div className="p-2">
            <div className="text-xs text-gray-500 dark:text-gray-400 px-3 py-2 border-b border-gray-100 dark:border-gray-700">
              Found {results.length} result{results.length !== 1 ? 's' : ''}
            </div>
            {results.map((result) => (
              <Link
                key={`${result.type}-${result.id}`}
                to={result.url}
                onClick={handleResultClick}
                className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
                {result.imageUrl && (
                  <img
                    src={result.imageUrl}
                    alt={result.title}
                    className="w-10 h-10 object-cover rounded-md mr-3"
                  />
                )}
                <div className="flex-grow min-w-0">
                  <div className="flex items-center mb-1">
                    {getTypeIcon(result.type)}
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-1 uppercase tracking-wide">
                      {getTypeLabel(result.type)}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {result.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {result.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {isOpen && query.length >= 2 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
          <div className="p-4 text-center">
            <Search className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No results found for "{query}"
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              Try searching for instruments, tutorials, or songs
            </p>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default SearchBar;