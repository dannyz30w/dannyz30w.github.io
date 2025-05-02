
import React from 'react';
import { Heart } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Heart className="h-6 w-6 text-medical-accent" />
          <h1 className="text-xl md:text-2xl font-heading font-bold text-medical-text">
            Ailment Aid Finder
          </h1>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-gray-600 hover:text-medical-text transition-colors">
            Home
          </a>
          <a href="#about" className="text-gray-600 hover:text-medical-text transition-colors">
            About
          </a>
          <a href="#contact" className="text-gray-600 hover:text-medical-text transition-colors">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
