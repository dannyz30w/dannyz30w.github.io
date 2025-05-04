
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
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-blue-400 transition-colors font-medium relative group">
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary dark:bg-blue-400 transition-all group-hover:w-full"></span>
          </a>
          <a href="#news" className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-blue-400 transition-colors font-medium relative group">
            Health News
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary dark:bg-blue-400 transition-all group-hover:w-full"></span>
          </a>
          <a href="#about" className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-blue-400 transition-colors font-medium relative group">
            About
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary dark:bg-blue-400 transition-all group-hover:w-full"></span>
          </a>
        </nav>
        
        <button className="md:hidden text-primary dark:text-blue-400" onClick={toggleMenu}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 py-4 px-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg absolute w-full left-0 right-0 animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <a href="#" className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-blue-400 transition-colors font-medium py-2 border-b border-gray-100 dark:border-gray-700" onClick={toggleMenu}>
              Home
            </a>
            <a href="#news" className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-blue-400 transition-colors font-medium py-2 border-b border-gray-100 dark:border-gray-700" onClick={toggleMenu}>
              Health News
            </a>
            <a href="#about" className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-blue-400 transition-colors font-medium py-2" onClick={toggleMenu}>
              About
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
