import React, { useState } from 'react';
import { MessageSquare, Heart, Share2, Image, Send, Filter, Search } from 'lucide-react';
import { CommunityPost } from '../types';
import { useAuth } from '../contexts/AuthContext';

const samplePosts: CommunityPost[] = [
  {
    id: '1',
    userId: '1',
    userName: 'Sarah Johnson',
    userAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    content: 'Just finished my first gamelan performance! The experience was incredible. Thanks to everyone in the community for your support and guidance. 🎵 #GamelanJourney',
    mediaUrls: ['https://images.pexels.com/photos/7857717/pexels-photo-7857717.jpeg?auto=compress&cs=tinysrgb&w=600'],
    likes: 24,
    comments: 5,
    createdAt: '2024-03-15T10:30:00Z'
  },
  {
    id: '2',
    userId: '2',
    userName: 'Ahmad Rahman',
    userAvatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
    content: 'Looking for fellow angklung enthusiasts in Jakarta! Would love to form a practice group. Anyone interested? 🎋 #AngklungCommunity',
    likes: 15,
    comments: 8,
    createdAt: '2024-03-14T15:45:00Z'
  },
  {
    id: '3',
    userId: '3',
    userName: 'Maria Putri',
    userAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    content: 'Check out this amazing sasando performance I witnessed in Rote! The sound is absolutely mesmerizing. 🎵 #TraditionalMusic #Sasando',
    mediaUrls: ['https://images.pexels.com/photos/15908930/pexels-photo-15908930/free-photo-of-sasando-traditional-musical-instrument-of-rote-island-east-nusa-tenggara-indonesia.jpeg?auto=compress&cs=tinysrgb&w=600'],
    likes: 42,
    comments: 12,
    createdAt: '2024-03-13T09:20:00Z'
  }
];

const CommunityPage: React.FC = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<CommunityPost[]>(samplePosts);
  const [newPost, setNewPost] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('latest');

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim() || !user) return;

    const post: CommunityPost = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      content: newPost,
      likes: 0,
      comments: 0,
      createdAt: new Date().toISOString()
    };

    setPosts([post, ...posts]);
    setNewPost('');
  };

  const filteredPosts = posts.filter(post =>
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Community</h1>
        <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
          Connect with fellow enthusiasts, share your journey, and learn from others in our vibrant community.
        </p>
      </div>

      {/* Create Post */}
      {user && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handlePostSubmit}>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-red-500 flex items-center justify-center text-white font-medium">
                  {user.name.charAt(0)}
                </div>
              </div>
              <div className="flex-grow">
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="Share your thoughts, experiences, or ask a question..."
                  className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  rows={3}
                />
                <div className="mt-3 flex justify-between items-center">
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-1 border border-gray-300 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <Image className="w-5 h-5 mr-1" />
                      Add Image
                    </button>
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 bg-amber-500 text-white rounded-md font-medium hover:bg-amber-600 transition-colors"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Post
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Search and Filter */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="w-full md:w-48">
            <div className="relative">
              <select
                className="block w-full pl-3 pr-10 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 appearance-none"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="latest">Latest</option>
                <option value="popular">Most Popular</option>
                <option value="discussed">Most Discussed</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Filter className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              {post.userAvatar ? (
                <img
                  src={post.userAvatar}
                  alt={post.userName}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-red-500 flex items-center justify-center text-white font-medium">
                  {post.userName.charAt(0)}
                </div>
              )}
              <div className="ml-3">
                <p className="font-medium text-gray-900 dark:text-white">{post.userName}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(post.createdAt)}</p>
              </div>
            </div>
            
            <p className="text-gray-800 dark:text-gray-200 mb-4">{post.content}</p>
            
            {post.mediaUrls && post.mediaUrls.length > 0 && (
              <div className="mb-4">
                <img
                  src={post.mediaUrls[0]}
                  alt="Post content"
                  className="rounded-lg w-full object-cover max-h-96"
                />
              </div>
            )}
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
              <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-amber-500 dark:hover:text-amber-400">
                <Heart className="w-5 h-5 mr-1" />
                <span>{post.likes}</span>
              </button>
              
              <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-amber-500 dark:hover:text-amber-400">
                <MessageSquare className="w-5 h-5 mr-1" />
                <span>{post.comments}</span>
              </button>
              
              <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-amber-500 dark:hover:text-amber-400">
                <Share2 className="w-5 h-5 mr-1" />
                <span>Share</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 dark:text-gray-400 text-lg">No posts found matching your search.</p>
          <button
            onClick={() => setSearchTerm('')}
            className="mt-4 px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors"
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
};

export default CommunityPage;