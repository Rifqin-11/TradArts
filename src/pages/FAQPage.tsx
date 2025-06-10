import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  {
    question: "How do I get started with learning traditional instruments?",
    answer: "Start by exploring our instrument catalog and selecting an instrument that interests you. Each instrument has beginner-friendly tutorials and interactive lessons to help you learn the basics. We recommend starting with easier instruments like the angklung before progressing to more complex ones.",
    category: "Getting Started"
  },
  {
    question: "Are the tutorials suitable for complete beginners?",
    answer: "Yes! Our tutorials are designed for learners of all levels. We provide step-by-step guidance, starting from the very basics. Each tutorial includes clear instructions, practice exercises, and progress tracking to help you learn at your own pace.",
    category: "Tutorials"
  },
  {
    question: "Can I track my progress as I learn?",
    answer: "Absolutely! Our platform includes a comprehensive progress tracking system. You can monitor your advancement through tutorials, view completed lessons, track practice time, and earn achievements as you progress in your learning journey.",
    category: "Progress Tracking"
  },
  {
    question: "How often is new content added?",
    answer: "We regularly update our content library with new tutorials, instruments, and cultural information. New content is typically added weekly, including instrument tutorials, performance videos, and cultural articles.",
    category: "Content"
  },
  {
    question: "Can I interact with other learners?",
    answer: "Yes! Our community features allow you to connect with fellow learners, share experiences, and participate in discussions. You can join practice groups, share progress, and even collaborate on virtual performances.",
    category: "Community"
  },
  {
    question: "What technical requirements do I need?",
    answer: "Our platform works on most modern web browsers. For the best experience, we recommend using an updated version of Chrome, Firefox, or Safari. A stable internet connection is required for streaming tutorials and interactive features.",
    category: "Technical"
  },
  {
    question: "Are there offline learning options?",
    answer: "While most of our content requires an internet connection, some tutorials and resources can be downloaded for offline viewing. Premium members can access additional offline learning materials.",
    category: "Technical"
  },
  {
    question: "How can I contribute to the platform?",
    answer: "We welcome contributions from the community! You can share your knowledge by creating tutorials, writing articles, or participating in community discussions. Contact us if you're interested in becoming a contributor.",
    category: "Community"
  }
];

const FAQPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', ...new Set(faqs.map(faq => faq.category))];

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Frequently Asked Questions
        </h1>
        <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
          Find answers to common questions about learning traditional Indonesian arts and music.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="w-full md:w-48">
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
          </div>
        </div>
      </div>

      {/* FAQ List */}
      <div className="max-w-2xl mx-auto">
        <div className="space-y-4">
          {filteredFAQs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                onClick={() => toggleItem(index)}
              >
                <span className="font-medium text-gray-900 dark:text-white">
                  {faq.question}
                </span>
                {openItems.includes(index) ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              
              {openItems.includes(index) && (
                <div className="px-6 pb-4">
                  <div className="flex items-center mb-2">
                    <span className="bg-amber-100 dark:bg-amber-900/20 text-amber-800 dark:text-amber-400 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {faq.category}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredFAQs.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No FAQs found matching your search.
            </p>
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

        {/* Contact Support */}
        <div className="mt-12 text-center p-6 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Still have questions?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Can't find what you're looking for? Feel free to contact our support team.
          </p>
          <button className="px-6 py-2 bg-amber-500 text-white rounded-md font-medium hover:bg-amber-600 transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;