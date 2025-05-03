
import React, { useState } from 'react';
import HealthNews from './HealthNews';

const NewsSection: React.FC = () => {
  const [selectedCondition, setSelectedCondition] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSelectedCondition(searchQuery);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary mb-2">Latest Health News</h2>
        <p className="text-gray-600 mb-4">
          Stay informed with the latest developments in healthcare and medical research.
          Search for specific health topics or conditions to find relevant news.
        </p>
        
        <form onSubmit={handleSearch} className="flex space-x-2 mb-6">
          <input
            type="text"
            placeholder="Search health news topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button 
            type="submit" 
            className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search
          </button>
        </form>
      </div>
      
      <HealthNews condition={selectedCondition} />
    </div>
  );
};

export default NewsSection;
