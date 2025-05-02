
import React from 'react';
import { Compass } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-primary/10 to-secondary/10 mt-12 py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Compass className="h-5 w-5 text-primary" />
              <h3 className="font-heading font-semibold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Health Compass
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              Your guide to understanding symptoms and potential health concerns. Always consult with a healthcare professional.
            </p>
          </div>
          
          <div>
            <h3 className="font-heading font-semibold text-lg text-gray-700 mb-4">Links</h3>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-primary transition-colors">About</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#disclaimer" className="hover:text-primary transition-colors">Disclaimer</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading font-semibold text-lg text-gray-700 mb-4">Contact</h3>
            <p className="text-gray-600">
              For questions or feedback, please contact:
              <br />
              <a href="mailto:info@healthcompass.com" className="text-primary hover:underline">
                info@healthcompass.com
              </a>
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Health Compass. All rights reserved.</p>
          <p className="mt-2">
            Not a substitute for professional medical advice, diagnosis, or treatment.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
