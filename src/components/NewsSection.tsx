
import React, { useState } from 'react';
import HealthNews from './HealthNews';

const NewsSection: React.FC = () => {
  const [selectedCondition, setSelectedCondition] = useState('general');

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary mb-2">Latest Health News</h2>
        <p className="text-gray-600">
          Stay informed with the latest developments in healthcare and medical research.
          Search for specific health topics or conditions to find relevant news.
        </p>
      </div>
      
      <HealthNews condition={selectedCondition} />
    </div>
  );
};

export default NewsSection;
