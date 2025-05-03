
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SymptomChecker from '@/components/SymptomChecker';
import MedicalDisclaimer from '@/components/MedicalDisclaimer';
import NewsSection from '@/components/NewsSection';
import AIChat from '@/components/AIChat';

const Index = () => {
  useEffect(() => {
    const openChatButtons = document.querySelectorAll('#open-chat, #open-chat-mobile');
    openChatButtons.forEach(button => {
      button.addEventListener('click', () => {
        const chatWidget = document.querySelector('#ai-chat-widget') as HTMLElement;
        if (chatWidget) {
          chatWidget.classList.toggle('hidden');
        }
      });
    });
  }, []);
  
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
        
        <section id="news" className="mt-16 px-4 py-10 bg-white rounded-xl shadow-md">
          <NewsSection />
        </section>
        
        <section id="about" className="mt-16 px-4 py-10 bg-white rounded-xl shadow-md">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-primary mb-4">
              About Health Compass
            </h2>
            <p className="text-gray-600 mb-4">
              Health Compass uses information about your symptoms, personal details, and family history to suggest 
              potential health conditions that might match your situation.
            </p>
            <p className="text-gray-600 mb-4">
              Our advanced symptom checker analyzes the information you provide, comparing it with common 
              health conditions and their typical presentations. The results show possible matches 
              with recommendations on how to proceed.
            </p>
            <p className="text-gray-600 font-semibold mb-6">
              Remember that this tool is not a substitute for professional medical advice, 
              diagnosis, or treatment. Always consult with a qualified healthcare provider 
              for medical concerns.
            </p>
            
            <div className="border-t border-gray-200 pt-6 mt-6">
              <h3 className="text-xl font-bold text-primary mb-2">Contact Information</h3>
              <p className="text-gray-600 mb-2">
                <span className="font-bold">Developer:</span> Danny Zheng
              </p>
              <p className="text-gray-600">
                <span className="font-bold">Email:</span> <a href="mailto:dazzy0130@gmail.com" className="text-blue-600 hover:underline">dazzy0130@gmail.com</a>
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <AIChat />
    </div>
  );
};

export default Index;
