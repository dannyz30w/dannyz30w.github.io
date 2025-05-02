
import React from 'react';
import { Condition } from '@/data/conditions';
import { getSeverityColor, getMedicalAttentionText, getMedicalAttentionColor } from '@/utils/symptomMatcher';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Ambulance } from 'lucide-react';

interface ResultsDisplayProps {
  results: {
    condition: Condition;
    matchScore: number;
  }[];
  onReset: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, onReset }) => {
  const hasEmergencyCondition = results.some(
    result => result.condition.seekMedicalAttention === 'immediately' && result.matchScore > 60
  );

  return (
    <div className="space-y-6 slide-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-medical-text mb-2">Potential Conditions</h2>
        <p className="text-gray-600">
          Based on your symptoms and information, these conditions might match your situation
        </p>
      </div>

      {hasEmergencyCondition && (
        <Alert className="border-medical-danger bg-red-50 mb-6">
          <Ambulance className="h-5 w-5 text-medical-danger" />
          <AlertDescription className="text-medical-danger font-semibold">
            Based on your symptoms, you may need immediate medical attention. 
            Please call emergency services or go to the nearest emergency room.
          </AlertDescription>
        </Alert>
      )}

      {results.length === 0 ? (
        <div className="text-center p-10 border rounded-lg bg-gray-50">
          <h3 className="text-xl font-semibold text-gray-700">No Matching Conditions Found</h3>
          <p className="mt-2 text-gray-600">
            We couldn't find conditions that match your symptoms. Please consult a healthcare 
            professional for proper diagnosis.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {results.map((result) => (
            <Card key={result.condition.id} className="border-l-4" style={{ borderLeftColor: 
              result.condition.seekMedicalAttention === 'immediately' ? '#ef5350' :
              result.condition.seekMedicalAttention === 'within24Hours' ? '#ffa726' :
              result.condition.seekMedicalAttention === 'withinWeek' ? '#ffee58' : 
              '#4caf50'
            }}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl font-bold text-medical-text">
                      {result.condition.name}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Match score: {result.matchScore}%
                    </CardDescription>
                  </div>
                  <Badge className={`${getSeverityColor(result.condition.severity)} bg-opacity-20`}>
                    {result.condition.severity.charAt(0).toUpperCase() + result.condition.severity.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{result.condition.description}</p>
                
                <h4 className="font-semibold text-medical-text mb-2">Common symptoms:</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {result.condition.symptoms.map(symptom => (
                    <Badge key={symptom} variant="outline" className="bg-medical-light">
                      {symptom.replace(/_/g, ' ')}
                    </Badge>
                  ))}
                </div>
                
                <h4 className="font-semibold text-medical-text mb-2">Recommendations:</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  {result.condition.recommendations.map((recommendation, index) => (
                    <li key={index}>{recommendation}</li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="border-t pt-4 flex flex-col items-start">
                <div className={`text-white px-3 py-1 rounded-full text-sm font-medium ${getMedicalAttentionColor(result.condition.seekMedicalAttention)}`}>
                  {getMedicalAttentionText(result.condition.seekMedicalAttention)}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      
      <div className="flex justify-center mt-8">
        <Button 
          onClick={onReset}
          className="bg-medical-text hover:bg-medical-dark text-white px-8"
        >
          Check Different Symptoms
        </Button>
      </div>
    </div>
  );
};

export default ResultsDisplay;
