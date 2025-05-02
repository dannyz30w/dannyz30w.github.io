
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-medical-light mt-12 py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-heading font-semibold text-lg text-medical-text mb-4">
              Ailment Aid Finder
            </h3>
            <p className="text-gray-600 mb-4">
              This application is for informational purposes only. Always consult with a healthcare professional.
            </p>
          </div>
          
          <div>
            <h3 className="font-heading font-semibold text-lg text-medical-text mb-4">Links</h3>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#" className="hover:text-medical-accent transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-medical-accent transition-colors">About</a></li>
              <li><a href="#contact" className="hover:text-medical-accent transition-colors">Contact</a></li>
              <li><a href="#disclaimer" className="hover:text-medical-accent transition-colors">Disclaimer</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading font-semibold text-lg text-medical-text mb-4">Contact</h3>
            <p className="text-gray-600">
              For questions or feedback, please contact:
              <br />
              <a href="mailto:info@ailmentaid.com" className="text-medical-accent hover:underline">
                info@ailmentaid.com
              </a>
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Ailment Aid Finder. All rights reserved.</p>
          <p className="mt-2">
            Not a substitute for professional medical advice, diagnosis, or treatment.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
