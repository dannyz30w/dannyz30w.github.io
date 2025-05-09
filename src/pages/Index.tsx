
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SymptomChecker from '@/components/SymptomChecker';
import MedicalDisclaimer from '@/components/MedicalDisclaimer';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Header />
      
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 md:px-6 py-8">
        <section className="mb-10">
          <div className="text-center max-w-2xl mx-auto animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary dark:from-blue-400 dark:to-blue-500 bg-clip-text text-transparent mb-6 transform transition-transform hover:scale-105 duration-300">
              Symptora
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl">
              Navigate your health journey with confidence. Identify potential health concerns based on your symptoms
              and get personalized guidance.
            </p>
          </div>
        </section>
        
        <MedicalDisclaimer />
        
        <section className="mt-12 animate-fade-in">
          <SymptomChecker />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
