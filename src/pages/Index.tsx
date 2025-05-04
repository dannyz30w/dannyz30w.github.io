
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SymptomChecker from '@/components/SymptomChecker';
import MedicalDisclaimer from '@/components/MedicalDisclaimer';
import NewsSection from '@/components/NewsSection';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Header />
      
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 md:px-6 py-8">
        <section className="mb-10">
          <div className="text-center max-w-2xl mx-auto slide-in">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary dark:from-blue-400 dark:to-blue-500 bg-clip-text text-transparent mb-6">
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
        
        <section id="news" className="mt-20 px-6 py-12 bg-white dark:bg-gray-800/50 rounded-xl shadow-lg animate-fade-in">
          <NewsSection />
        </section>
        
        <section id="about" className="mt-16 px-6 py-12 bg-white dark:bg-gray-800/50 rounded-xl shadow-lg animate-fade-in">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-primary dark:text-blue-400 mb-6 text-center">
              About Symptora
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Symptora uses information about your symptoms, personal details, and family history to suggest 
              potential health conditions that might match your situation.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Our advanced symptom checker analyzes the information you provide, comparing it with common 
              health conditions and their typical presentations. The results show possible matches 
              with recommendations on how to proceed.
            </p>
            <p className="text-gray-600 dark:text-gray-300 font-semibold mb-6">
              Remember that this tool is not a substitute for professional medical advice, 
              diagnosis, or treatment. Always consult with a qualified healthcare provider 
              for medical concerns.
            </p>
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
              <h3 className="text-xl font-bold text-primary dark:text-blue-400 mb-2">Contact Information</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                <span className="font-bold">Developer:</span> Danny Zheng
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-bold">Email:</span> <a href="mailto:dazzy0130@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">dazzy0130@gmail.com</a>
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
