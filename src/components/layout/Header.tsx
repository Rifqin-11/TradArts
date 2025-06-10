import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Music, BookOpen, Users, Award, Sun, Moon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { name: 'Instruments', path: '/instruments', icon: <Music className="w-5 h-5" /> },
    { name: 'Tutorials', path: '/tutorials', icon: <BookOpen className="w-5 h-5" /> },
    { name: 'Songs', path: '/songs', icon: <Music className="w-5 h-5" /> },
    { name: 'Community', path: '/community', icon: <Users className="w-5 h-5" /> },
    { name: 'Challenges', path: '/challenges', icon: <Award className="w-5 h-5" /> },
  ];

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md dark:bg-gray-900 dark:shadow-gray-800/20' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <Music className="w-8 h-8 text-amber-500" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-red-600">
              TradArts
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-1.5 px-2 py-1 rounded-md transition-colors ${
                  location.pathname === link.path
                    ? 'text-amber-500 font-medium'
                    : 'hover:text-amber-500'
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {user ? (
              <div className="flex items-center space-x-3">
                <Link
                  to="/profile"
                  className="flex items-center space-x-2"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-red-500 flex items-center justify-center text-white font-medium">
                    {user.name.charAt(0)}
                  </div>
                </Link>
                <button
                  onClick={logout}
                  className="text-sm hover:text-amber-500 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="px-4 py-2 rounded-md bg-gradient-to-r from-amber-500 to-red-500 text-white font-medium hover:opacity-90 transition-opacity"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center p-2 rounded-md ${
                    location.pathname === link.path
                      ? 'bg-amber-50 dark:bg-gray-800 text-amber-500'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                  onClick={closeMenu}
                >
                  {link.icon}
                  <span className="ml-2">{link.name}</span>
                </Link>
              ))}

              <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
                <button
                  onClick={toggleTheme}
                  className="w-full flex items-center p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  <span className="ml-2">
                    {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                  </span>
                </button>

                {user ? (
                  <>
                    <Link
                      to="/profile"
                      className="w-full flex items-center p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
                      onClick={closeMenu}
                    >
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-amber-500 to-red-500 flex items-center justify-center text-white font-medium text-xs">
                        {user.name.charAt(0)}
                      </div>
                      <span className="ml-2">Profile</span>
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        closeMenu();
                      }}
                      className="w-full flex items-center p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <span className="ml-2">Logout</span>
                    </button>
                  </>
                ) : (
                  <Link
                    to="/auth"
                    className="w-full flex items-center p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
                    onClick={closeMenu}
                  >
                    <span className="ml-2">Sign In</span>
                  </Link>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;