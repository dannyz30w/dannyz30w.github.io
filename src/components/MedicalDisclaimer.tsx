
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from 'lucide-react';

const MedicalDisclaimer: React.FC = () => {
  return (
    <Alert className="bg-medical-light border-medical-text my-6" id="disclaimer">
      <Info className="h-5 w-5 text-medical-text" />
      <AlertTitle className="text-medical-text font-heading">Medical Disclaimer</AlertTitle>
      <AlertDescription className="text-gray-700 mt-2">
        <p className="mb-2">
          The content provided by Ailment Aid Finder is for informational purposes only and is not intended to be a 
          substitute for professional medical advice, diagnosis, or treatment.
        </p>
        <p className="mb-2">
          Always seek the advice of your physician or other qualified health provider with any questions you may 
          have regarding a medical condition. Never disregard professional medical advice or delay in seeking it 
          because of something you have read on this website.
        </p>
        <p>
          If you think you may have a medical emergency, call your doctor or emergency services immediately.
        </p>
      </AlertDescription>
    </Alert>
  );
};

export default MedicalDisclaimer;
