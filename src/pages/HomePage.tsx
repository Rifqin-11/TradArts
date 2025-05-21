import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Music, BookOpen, Users, Award, ChevronRight, Play } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import FeatureCard from '../components/ui/FeatureCard';
import InstrumentCard from '../components/cards/InstrumentCard';
import TutorialCard from '../components/cards/TutorialCard';
import { instruments } from '../data/instruments';
import { tutorials } from '../data/tutorials';

const HomePage: React.FC = () => {
  const { user } = useAuth();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (heroRef.current) {
        // Parallax effect for hero image
        heroRef.current.style.transform = `translateY(${scrollPosition * 0.2}px)`;
        heroRef.current.style.opacity = `${1 - scrollPosition / 1000}`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const features = [
    {
      title: 'Interactive Instruments',
      description: 'Play and learn traditional musical instruments through interactive simulations',
      icon: <Music className="h-6 w-6 text-amber-500" />,
      link: '/instruments',
    },
    {
      title: 'Video Tutorials',
      description: 'Follow step-by-step video tutorials created by skilled musicians and artists',
      icon: <BookOpen className="h-6 w-6 text-amber-500" />,
      link: '/tutorials',
    },
    {
      title: 'Community Hub',
      description: 'Connect with enthusiasts and share your journey learning traditional arts',
      icon: <Users className="h-6 w-6 text-amber-500" />,
      link: '/community',
    },
    {
      title: 'Daily Challenges',
      description: 'Test your knowledge and skills with gamified daily challenges and quests',
      icon: <Award className="h-6 w-6 text-amber-500" />,
      link: '/challenges',
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <div className="relative min-h-[70vh] sm:h-[70vh] flex items-center overflow-hidden bg-gradient-to-r from-amber-700 to-red-800">
        <div 
          ref={heroRef}
          className="absolute inset-0 z-0 bg-black opacity-40"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/2034851/pexels-photo-2034851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        ></div>
        
        <div className="container mx-auto px-4 z-10 sm:px-6 lg:px-8 py-12 sm:py-0">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
              Discover Indonesia's Rich Cultural Heritage
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mb-8">
              Learn, play, and experience traditional Indonesian arts and music through interactive digital experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/instruments"
                className="inline-flex items-center justify-center px-6 py-3 bg-amber-500 text-white rounded-md font-medium hover:bg-amber-600 transition-colors"
              >
                Explore Instruments
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/tutorials"
                className="inline-flex items-center justify-center px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-md font-medium hover:bg-white/20 transition-colors"
              >
                Watch Tutorials
                <Play className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Experience the Beauty of Indonesian Arts
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
              Our platform provides immersive ways to explore and learn traditional arts and music from across the Indonesian archipelago.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                link={feature.link}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Instruments Preview */}
      <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Traditional Instruments
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Explore and play Indonesia's rich variety of musical instruments
              </p>
            </div>
            <Link
              to="/instruments"
              className="text-amber-500 hover:text-amber-600 inline-flex items-center font-medium"
            >
              View All
              <ChevronRight className="ml-1 h-5 w-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {instruments.slice(0, 3).map((instrument) => (
              <InstrumentCard
                key={instrument.id}
                instrument={instrument}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Tutorials Section */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Featured Tutorials
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Learn from master artists and musicians through our comprehensive tutorials
              </p>
            </div>
            <Link
              to="/tutorials"
              className="text-amber-500 hover:text-amber-600 inline-flex items-center font-medium"
            >
              View All
              <ChevronRight className="ml-1 h-5 w-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutorials.slice(0, 3).map((tutorial) => (
              <TutorialCard
                key={tutorial.id}
                tutorial={tutorial}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-amber-500 to-red-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Begin Your Cultural Journey?</h2>
              <p className="text-white/90 text-lg">
                Join our community of culture enthusiasts and start exploring Indonesia's rich artistic heritage today.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              {user ? (
                <Link
                  to="/instruments"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-white text-amber-600 rounded-md font-medium hover:bg-gray-100 transition-colors"
                >
                  Start Exploring
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              ) : (
                <>
                  <Link
                    to="/auth"
                    className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-white text-amber-600 rounded-md font-medium hover:bg-gray-100 transition-colors"
                  >
                    Sign Up Now
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Link>
                  <Link
                    to="/instruments"
                    className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-transparent border border-white text-white rounded-md font-medium hover:bg-white/10 transition-colors"
                  >
                    Browse as Guest
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;