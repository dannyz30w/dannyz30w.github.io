
import React from 'react';
import { Activity } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-blue-900/40 dark:to-blue-800/40 mt-12 py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Activity className="h-5 w-5 text-primary dark:text-blue-300" />
              <h3 className="font-heading font-semibold text-lg bg-gradient-to-r from-primary to-secondary dark:from-blue-300 dark:to-blue-200 bg-clip-text text-transparent">
                Symptora
              </h3>
            </div>
            <p className="text-gray-700 dark:text-white mb-4">
              Your guide to understanding symptoms and potential health concerns. Always consult with a healthcare professional.
            </p>
          </div>
          
          <div>
            <h3 className="font-heading font-semibold text-lg text-gray-700 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-100">
              <li><a href="#" className="hover:text-primary dark:hover:text-blue-300 transition-colors">Home</a></li>
              <li><a href="#news" className="hover:text-primary dark:hover:text-blue-300 transition-colors">Health News</a></li>
              <li><a href="#disclaimer" className="hover:text-primary dark:hover:text-blue-300 transition-colors">Disclaimer</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6 text-center text-gray-600 dark:text-gray-200 text-sm">
          <p>© {new Date().getFullYear()} Symptora. All rights reserved.</p>
          <p className="mt-2">
            Not a substitute for professional medical advice, diagnosis, or treatment.
          </p>
          <p className="mt-2">
            <a href="mailto:dazzy0130@gmail.com" className="text-primary dark:text-blue-300 hover:underline">
              dazzy0130@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
