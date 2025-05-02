
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SymptomChecker from '@/components/SymptomChecker';
import MedicalDisclaimer from '@/components/MedicalDisclaimer';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 md:px-6 py-8">
        <section className="mb-10">
          <div className="text-center max-w-2xl mx-auto slide-in">
            <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
              Health Compass
            </h1>
            <p className="text-gray-600 text-lg md:text-xl">
              Navigate your health journey with confidence. Identify potential health concerns based on your symptoms
              and get personalized guidance.
            </p>
          </div>
        </section>
        
        <MedicalDisclaimer />
        
        <section className="mt-10">
          <SymptomChecker />
        </section>
        
        <section id="about" className="mt-16 px-4 py-10 bg-white rounded-xl shadow-md">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-primary mb-4">
              About Health Compass
            </h2>
            <p className="text-gray-600 mb-4">
              Health Compass uses information about your symptoms and personal details to suggest 
              potential health conditions that might match your situation.
            </p>
            <p className="text-gray-600 mb-4">
              Our symptom checker analyzes the information you provide, comparing it with common 
              health conditions and their typical presentations. The results show possible matches 
              with recommendations on how to proceed.
            </p>
            <p className="text-gray-600 font-semibold">
              Remember that this tool is not a substitute for professional medical advice, 
              diagnosis, or treatment. Always consult with a qualified healthcare provider 
              for medical concerns.
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
