
import React, { useState } from 'react';
import HealthNews from './HealthNews';
import { Search } from 'lucide-react';

const NewsSection: React.FC = () => {
  const [selectedCondition, setSelectedCondition] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSelectedCondition(searchQuery);
  };

  // Popular health topics
  const popularTopics = [
    "Diabetes", "Heart Disease", "COVID-19", "Cancer", 
    "Mental Health", "Nutrition", "Fitness", "Pregnancy"
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-heading font-bold text-primary mb-3 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-medical-text">
          Latest Health News
        </h2>
        <p className="text-gray-600 mb-6 text-center max-w-2xl mx-auto">
          Stay informed with the latest developments in healthcare and medical research.
          Search for specific health topics to find relevant and recent news articles.
        </p>
        
        <form onSubmit={handleSearch} className="flex space-x-2 mb-8 shadow-md rounded-lg overflow-hidden">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search health news topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow pl-10 pr-4 py-3 border border-gray-200 rounded-l-lg w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <button 
            type="submit" 
            className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-r-lg font-medium hover:opacity-90 transition-all"
          >
            Search
          </button>
        </form>
        
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {popularTopics.map((topic, index) => (
            <button
              key={index}
              onClick={() => {
                setSearchQuery(topic);
                setSelectedCondition(topic);
              }}
              className="bg-medical-light bg-opacity-70 hover:bg-opacity-100 text-medical-text px-3 py-1.5 rounded-full text-sm transition-colors"
            >
              {topic}
            </button>
          ))}
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-md">
        <HealthNews condition={selectedCondition} />
      </div>
    </div>
  );
};

export default NewsSection;
