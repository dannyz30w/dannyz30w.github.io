
import React, { useState } from 'react';
import { Compass, Menu, X, MessageSquareText } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-primary/10 to-secondary/10 shadow-lg py-4 px-6 sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-primary to-secondary p-2 rounded-full shadow-md">
            <Compass className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-xl md:text-2xl font-heading font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Health Compass
          </h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-gray-700 hover:text-primary transition-colors font-medium">
            Home
          </a>
          <a href="#disclaimer" className="text-gray-700 hover:text-primary transition-colors font-medium">
            Medical Disclaimer
          </a>
          <a href="#news" className="text-gray-700 hover:text-primary transition-colors font-medium">
            Health News
          </a>
          <a href="#about" className="text-gray-700 hover:text-primary transition-colors font-medium">
            About
          </a>
          <a href="#contact" className="text-gray-700 hover:text-primary transition-colors font-medium">
            Contact
          </a>
          <button className="bg-secondary hover:bg-secondary/80 text-white px-4 py-2 rounded-lg shadow transition-colors duration-300 font-medium text-sm flex items-center space-x-1">
            <span>Emergency Info</span>
          </button>
        </nav>
        
        <button className="md:hidden text-primary" onClick={toggleMenu}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 py-4 px-6 bg-white rounded-lg shadow-lg absolute w-full left-0 right-0 animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <a href="#" className="text-gray-700 hover:text-primary transition-colors font-medium py-2 border-b border-gray-100" onClick={toggleMenu}>
              Home
            </a>
            <a href="#disclaimer" className="text-gray-700 hover:text-primary transition-colors font-medium py-2 border-b border-gray-100" onClick={toggleMenu}>
              Medical Disclaimer
            </a>
            <a href="#news" className="text-gray-700 hover:text-primary transition-colors font-medium py-2 border-b border-gray-100" onClick={toggleMenu}>
              Health News
            </a>
            <a href="#about" className="text-gray-700 hover:text-primary transition-colors font-medium py-2 border-b border-gray-100" onClick={toggleMenu}>
              About
            </a>
            <a href="#contact" className="text-gray-700 hover:text-primary transition-colors font-medium py-2" onClick={toggleMenu}>
              Contact
            </a>
            <button className="bg-secondary hover:bg-secondary/80 text-white px-4 py-3 rounded-lg shadow transition-colors duration-300 font-medium text-sm flex items-center justify-center">
              <span>Emergency Info</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
