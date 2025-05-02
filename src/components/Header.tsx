
import React, { useState } from 'react';
import { Heart, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-medical-light to-white shadow-md py-4 px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-white p-2 rounded-full shadow-sm">
            <Heart className="h-6 w-6 text-medical-text" />
          </div>
          <h1 className="text-xl md:text-2xl font-heading font-bold text-medical-text">
            Ailment Aid Finder
          </h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-gray-600 hover:text-medical-text transition-colors font-medium">
            Home
          </a>
          <a href="#disclaimer" className="text-gray-600 hover:text-medical-text transition-colors font-medium">
            Medical Disclaimer
          </a>
          <a href="#about" className="text-gray-600 hover:text-medical-text transition-colors font-medium">
            About
          </a>
          <a href="#contact" className="text-gray-600 hover:text-medical-text transition-colors font-medium">
            Contact
          </a>
          <button className="bg-medical-text hover:bg-medical-dark text-white px-4 py-2 rounded-full transition-colors duration-300 font-medium text-sm flex items-center space-x-1">
            <span>Emergency Info</span>
          </button>
        </nav>
        
        <button className="md:hidden text-medical-text" onClick={toggleMenu}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 py-4 px-6 bg-white rounded-md shadow-lg animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <a href="#" className="text-gray-600 hover:text-medical-text transition-colors font-medium py-2 border-b border-gray-100" onClick={toggleMenu}>
              Home
            </a>
            <a href="#disclaimer" className="text-gray-600 hover:text-medical-text transition-colors font-medium py-2 border-b border-gray-100" onClick={toggleMenu}>
              Medical Disclaimer
            </a>
            <a href="#about" className="text-gray-600 hover:text-medical-text transition-colors font-medium py-2 border-b border-gray-100" onClick={toggleMenu}>
              About
            </a>
            <a href="#contact" className="text-gray-600 hover:text-medical-text transition-colors font-medium py-2" onClick={toggleMenu}>
              Contact
            </a>
            <button className="bg-medical-text hover:bg-medical-dark text-white px-4 py-3 rounded-full transition-colors duration-300 font-medium text-sm flex items-center justify-center mt-2">
              <span>Emergency Info</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
