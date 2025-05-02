
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SymptomChecker from '@/components/SymptomChecker';
import MedicalDisclaimer from '@/components/MedicalDisclaimer';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow medical-container py-8">
        <section className="mb-10">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-medical-text mb-4">
              Ailment Aid Finder
            </h1>
            <p className="text-gray-600 text-lg">
              A tool to help identify potential health conditions based on your symptoms.
              Get personalized recommendations and guidance on when to seek medical attention.
            </p>
          </div>
        </section>
        
        <MedicalDisclaimer />
        
        <section className="mt-10">
          <SymptomChecker />
        </section>
        
        <section id="about" className="mt-16 px-4 py-10 bg-white rounded-lg shadow">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-medical-text mb-4">
              About This Tool
            </h2>
            <p className="text-gray-600 mb-4">
              Ailment Aid Finder uses information about your symptoms and personal details to suggest 
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
