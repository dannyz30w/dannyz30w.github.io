
import React, { useState } from 'react';
import { Activity, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md py-4 px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-primary to-secondary dark:from-blue-500 dark:to-blue-700 p-2 rounded-full shadow-md animate-pulse-subtle">
            <Activity className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-xl md:text-2xl font-heading font-bold bg-gradient-to-r from-primary to-medical-text dark:from-blue-400 dark:to-blue-200 bg-clip-text text-transparent">
            Symptora
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
