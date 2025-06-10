import React, { useState } from 'react';
import { MessageSquare, Heart, Share2, Image, Send, Filter, Search, Facebook, Twitter, Instagram, Link as LinkIcon } from 'lucide-react';
import { CommunityPost } from '../types';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

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
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

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
    toast.success('Post shared successfully!');
  };

  const handleLike = (postId: string) => {
    const newLikedPosts = new Set(likedPosts);
    const isLiked = likedPosts.has(postId);
    
    if (isLiked) {
      newLikedPosts.delete(postId);
    } else {
      newLikedPosts.add(postId);
    }
    
    setLikedPosts(newLikedPosts);
    
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + (isLiked ? -1 : 1) }
        : post
    ));

    toast.success(isLiked ? 'Removed from likes' : 'Post liked!', {
      icon: isLiked ? '💔' : '❤️'
    });
  };

  const handleShare = async (post: CommunityPost, platform?: string) => {
    const shareData = {
      title: `${post.userName} on TradArts`,
      text: post.content,
      url: window.location.href,
    };

    if (platform) {
      let shareUrl = '';
      const encodedText = encodeURIComponent(post.content);
      const encodedUrl = encodeURIComponent(window.location.href);
      
      switch (platform) {
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
          break;
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
          break;
        case 'instagram':
          // Instagram doesn't support direct URL sharing, so copy to clipboard
          navigator.clipboard.writeText(`${post.content} ${window.location.href}`);
          toast.success('Content copied to clipboard for Instagram!');
          return;
        default:
          navigator.clipboard.writeText(window.location.href);
          toast.success('Link copied to clipboard!');
          return;
      }
      
      window.open(shareUrl, '_blank', 'width=600,height=400');
    } else if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const filteredPosts = posts.filter(post =>
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
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

      <div className="max-w-2xl mx-auto">
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
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                    rows={3}
                  />
                  <div className="mt-3 flex justify-between items-center">
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-1 border border-gray-300 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <Image className="w-5 h-5 mr-1" />
                        Add Image
                      </button>
                    </div>
                    <button
                      type="submit"
                      disabled={!newPost.trim()}
                      className="inline-flex items-center px-4 py-2 bg-amber-500 text-white rounded-md font-medium hover:bg-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
              
              <p className="text-gray-800 dark:text-gray-200 mb-4 whitespace-pre-wrap">{post.content}</p>
              
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
                <button 
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center transition-colors ${
                    likedPosts.has(post.id)
                      ? 'text-red-500'
                      : 'text-gray-500 dark:text-gray-400 hover:text-red-500'
                  }`}
                >
                  <Heart className={`w-5 h-5 mr-1 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                  <span>{post.likes}</span>
                </button>
                
                <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
                  <MessageSquare className="w-5 h-5 mr-1" />
                  <span>{post.comments}</span>
                </button>
                
                <div className="relative group">
                  <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
                    <Share2 className="w-5 h-5 mr-1" />
                    <span>Share</span>
                  </button>
                  
                  {/* Share Dropdown */}
                  <div className="absolute bottom-full right-0 mb-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                    <div className="p-2">
                      <button
                        onClick={() => handleShare(post, 'facebook')}
                        className="w-full flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                      >
                        <Facebook className="w-4 h-4 mr-2 text-blue-600" />
                        Facebook
                      </button>
                      <button
                        onClick={() => handleShare(post, 'twitter')}
                        className="w-full flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                      >
                        <Twitter className="w-4 h-4 mr-2 text-blue-400" />
                        Twitter
                      </button>
                      <button
                        onClick={() => handleShare(post, 'instagram')}
                        className="w-full flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                      >
                        <Instagram className="w-4 h-4 mr-2 text-pink-600" />
                        Instagram
                      </button>
                      <button
                        onClick={() => handleShare(post)}
                        className="w-full flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                      >
                        <LinkIcon className="w-4 h-4 mr-2 text-gray-500" />
                        Copy Link
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No posts found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              {searchTerm ? 'Try adjusting your search terms' : 'Be the first to share something with the community!'}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors"
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityPage;