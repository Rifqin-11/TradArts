import React, { useState } from 'react';
import { Search, Filter, Calendar, User, ChevronRight } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  category: string;
  imageUrl: string;
  readTime: number;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Evolution of Gamelan Music in Modern Indonesia',
    excerpt: 'Explore how traditional gamelan music is adapting to contemporary cultural landscapes while maintaining its rich heritage.',
    content: '...',
    author: {
      name: 'Dr. Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    date: '2024-03-15',
    category: 'History',
    imageUrl: 'https://images.pexels.com/photos/7857717/pexels-photo-7857717.jpeg',
    readTime: 5
  },
  {
    id: '2',
    title: 'Learning Angklung: A Beginner\'s Guide',
    excerpt: 'Everything you need to know about getting started with this beautiful bamboo instrument from West Java.',
    content: '...',
    author: {
      name: 'Maria Putri',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    date: '2024-03-10',
    category: 'Tutorial',
    imageUrl: 'https://images.pexels.com/photos/13278440/pexels-photo-13278440.jpeg',
    readTime: 8
  },
  {
    id: '3',
    title: 'The Sacred Sounds of Indonesian Ritual Music',
    excerpt: 'Discover the spiritual significance of traditional instruments in Indonesian ceremonies and rituals.',
    content: '...',
    author: {
      name: 'Budi Santoso',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    date: '2024-03-05',
    category: 'Culture',
    imageUrl: 'https://images.pexels.com/photos/2156311/pexels-photo-2156311.jpeg',
    readTime: 6
  }
];

const BlogPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', ...new Set(blogPosts.map(post => post.category))];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Blog</h1>
        <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
          Discover articles about Indonesian traditional arts, music, and culture.
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
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="w-full md:w-48">
            <div className="relative">
              <select
                className="block w-full pl-3 pr-10 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 appearance-none"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.filter(c => c !== 'all').map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Filter className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Post */}
      {filteredPosts.length > 0 && (
        <div className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <img
                  className="h-48 w-full md:h-full md:w-96 object-cover"
                  src={filteredPosts[0].imageUrl}
                  alt={filteredPosts[0].title}
                />
              </div>
              <div className="p-8">
                <div className="flex items-center mb-2">
                  <span className="bg-amber-100 dark:bg-amber-900/20 text-amber-800 dark:text-amber-400 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {filteredPosts[0].category}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {filteredPosts[0].title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {filteredPosts[0].excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      className="h-8 w-8 rounded-full mr-2"
                      src={filteredPosts[0].author.avatar}
                      alt={filteredPosts[0].author.name}
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {filteredPosts[0].author.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(filteredPosts[0].date)}
                      </p>
                    </div>
                  </div>
                  <button className="inline-flex items-center text-amber-500 hover:text-amber-600">
                    Read More
                    <ChevronRight className="ml-1 h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.slice(1).map((post) => (
          <article
            key={post.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img
              className="h-48 w-full object-cover"
              src={post.imageUrl}
              alt={post.title}
            />
            <div className="p-6">
              <div className="flex items-center mb-2">
                <span className="bg-amber-100 dark:bg-amber-900/20 text-amber-800 dark:text-amber-400 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {post.category}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {post.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    className="h-8 w-8 rounded-full mr-2"
                    src={post.author.avatar}
                    alt={post.author.name}
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {post.author.name}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(post.date)}
                    </div>
                  </div>
                </div>
              </div>
              <button className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 border border-amber-500 text-amber-500 rounded-md hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors">
                Read More
                <ChevronRight className="ml-1 h-5 w-5" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 dark:text-gray-400 text-lg">No articles found matching your criteria.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
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

export default BlogPage;