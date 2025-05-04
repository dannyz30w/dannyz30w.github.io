
import React, { useState } from 'react';
import HealthNews from './HealthNews';
import { Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from 'lucide-react';

const NewsSection: React.FC = () => {
  const [selectedCondition, setSelectedCondition] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [apiErrorShown, setApiErrorShown] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSelectedCondition(searchQuery);
  };

  // Show error message about NewsAPI limitations
  const showApiErrorInfo = () => {
    setApiErrorShown(true);
  };

  // Popular health topics
  const popularTopics = [
    "Diabetes", "Heart Disease", "COVID-19", "Cancer", 
    "Mental Health", "Nutrition", "Fitness", "Pregnancy",
    "Alzheimer's", "Arthritis", "Asthma", "Autism",
    "Cholesterol", "Depression", "Eczema", "GERD"
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
            onClick={showApiErrorInfo}
          >
            Search
          </button>
        </form>
        
        {apiErrorShown && (
          <Alert className="mb-6 bg-amber-50 border-amber-200">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertTitle className="text-amber-800">News API Limitation</AlertTitle>
            <AlertDescription className="text-amber-700">
              NewsAPI's developer plan only allows requests from localhost. In a production environment, this would be handled through a server-side API.
              For this demo, we're showing sample news articles instead.
            </AlertDescription>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2 text-amber-800 border-amber-300"
              onClick={() => setApiErrorShown(false)}
            >
              Dismiss
            </Button>
          </Alert>
        )}
        
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {popularTopics.map((topic, index) => (
            <button
              key={index}
              onClick={() => {
                setSearchQuery(topic);
                setSelectedCondition(topic);
                if (!apiErrorShown) {
                  showApiErrorInfo();
                }
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
