
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from 'lucide-react';

const MedicalDisclaimer: React.FC = () => {
  return (
    <Alert className="bg-primary/5 border-l-4 border-primary my-6 shadow-md rounded-xl" id="disclaimer">
      <div className="flex items-start">
        <AlertTriangle className="h-6 w-6 text-primary mr-3 mt-0.5 flex-shrink-0" />
        <div>
          <AlertTitle className="text-primary font-heading text-xl mb-2">Important Medical Disclaimer</AlertTitle>
          <AlertDescription className="text-gray-700 space-y-3">
            <p className="leading-relaxed">
              The content provided by Health Compass is for <span className="font-semibold">informational purposes only</span> and is not intended to be a 
              substitute for professional medical advice, diagnosis, or treatment.
            </p>
            <p className="leading-relaxed">
              Always seek the advice of your physician or other qualified health provider with any questions you may 
              have regarding a medical condition. Never disregard professional medical advice or delay in seeking it 
              because of something you have read on this website.
            </p>
            <p className="leading-relaxed">
              If you think you may have a medical emergency, call your doctor, go to the emergency department, or call emergency services immediately.
            </p>
            <div className="pt-2 text-sm bg-white bg-opacity-50 p-3 rounded-lg mt-2">
              <p className="font-semibold">This tool:</p>
              <ul className="list-disc pl-5 space-y-1 mt-1">
                <li>Does not create a doctor-patient relationship</li>
                <li>Should not be used for self-diagnosis</li>
                <li>Provides general information, not personalized medical advice</li>
                <li>May not cover all possible symptoms or conditions</li>
              </ul>
            </div>
          </AlertDescription>
        </div>
      </div>
    </Alert>
  );
};

export default MedicalDisclaimer;
