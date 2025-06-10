import React from 'react';
import { Music, Users, Globe, Heart } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          About TradArts
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
          Preserving and celebrating Indonesia's rich cultural heritage through interactive digital experiences.
        </p>
      </div>

      {/* Mission Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            At TradArts, we're dedicated to making traditional Indonesian arts and music accessible to everyone through technology. 
            Our platform bridges the gap between centuries-old traditions and modern digital learning, ensuring these cultural treasures 
            are preserved and passed on to future generations.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
              <Music className="w-8 h-8 text-amber-500 mb-3" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Preserve Tradition
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Digitally document and archive traditional instruments, techniques, and cultural knowledge.
              </p>
            </div>
            <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
              <Globe className="w-8 h-8 text-amber-500 mb-3" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Global Access
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Make Indonesian cultural arts accessible to learners worldwide through digital platforms.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: 'Dr. Sarah Johnson',
              role: 'Ethnomusicologist',
              image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150'
            },
            {
              name: 'Budi Santoso',
              role: 'Master Musician',
              image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150'
            },
            {
              name: 'Maria Putri',
              role: 'Cultural Educator',
              image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
            }
          ].map((member, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {member.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Partners Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Our Partners</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((partner) => (
            <div
              key={partner}
              className="h-20 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center"
            >
              <span className="text-gray-400 dark:text-gray-500">Partner Logo</span>
            </div>
          ))}
        </div>
      </div>

      {/* Impact Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Our Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <Users className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">10,000+</h3>
            <p className="text-gray-600 dark:text-gray-400">Active Learners</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <Music className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">50+</h3>
            <p className="text-gray-600 dark:text-gray-400">Traditional Instruments</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <Globe className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">30+</h3>
            <p className="text-gray-600 dark:text-gray-400">Countries Reached</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-amber-500 to-red-600 rounded-lg p-8 text-center text-white">
        <Heart className="w-12 h-12 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">Join Our Cultural Journey</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Be part of our mission to preserve and celebrate Indonesian traditional arts and music.
        </p>
        <button className="bg-white text-amber-600 px-6 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default AboutPage;