
import React, { useState } from 'react';
import { Condition } from '@/data/conditions';
import { getSeverityColor, getMedicalAttentionText, getMedicalAttentionColor } from '@/utils/symptomMatcher';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Ambulance, ChevronDown, ChevronUp, Share2, Printer, AlertTriangle, Info } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getSymptomById } from '@/data/symptoms';
import { useToast } from '@/components/ui/use-toast';

interface ResultsDisplayProps {
  results: {
    condition: Condition;
    matchScore: number;
  }[];
  onReset: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, onReset }) => {
  const { toast } = useToast();
  const [expandedConditions, setExpandedConditions] = useState<string[]>([]);
  
  const hasEmergencyCondition = results.some(
    result => result.condition.seekMedicalAttention === 'immediately' && result.matchScore > 60
  );

  const hasUrgentCondition = results.some(
    result => result.condition.seekMedicalAttention === 'within24Hours' && result.matchScore > 70
  );

  const toggleConditionExpansion = (conditionId: string) => {
    setExpandedConditions(prev => 
      prev.includes(conditionId) 
        ? prev.filter(id => id !== conditionId) 
        : [...prev, conditionId]
    );
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Ailment Aid Finder Results',
        text: 'Check out my symptom analysis results from Ailment Aid Finder',
        url: window.location.href,
      })
      .catch(() => {
        toast({
          title: "Sharing not available",
          description: "Couldn't share the results. Try copying the URL manually.",
        });
      });
    } else {
      toast({
        title: "Sharing not supported",
        description: "Your browser doesn't support the Web Share API.",
      });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const getSeverityBadge = (severity: Condition['severity']) => {
    let bgColor = '';
    let textColor = '';
    
    switch(severity) {
      case 'mild':
        bgColor = 'bg-green-100';
        textColor = 'text-green-800';
        break;
      case 'moderate':
        bgColor = 'bg-yellow-100';
        textColor = 'text-yellow-800';
        break;
      case 'severe':
        bgColor = 'bg-red-100';
        textColor = 'text-red-800';
        break;
    }
    
    return (
      <Badge className={`${bgColor} ${textColor} border-0`}>
        {severity.charAt(0).toUpperCase() + severity.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-6 slide-in max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-medical-text mb-2">Analysis Results</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Based on your symptoms and information, these conditions might match your situation. Remember that this is not a diagnosis - consult with a healthcare professional for proper evaluation.
        </p>
      </div>

      <div className="flex justify-end space-x-2 print:hidden">
        <Button variant="outline" onClick={handleShare} className="flex items-center gap-1">
          <Share2 className="h-4 w-4" />
          <span>Share</span>
        </Button>
        <Button variant="outline" onClick={handlePrint} className="flex items-center gap-1">
          <Printer className="h-4 w-4" />
          <span>Print</span>
        </Button>
      </div>

      {hasEmergencyCondition && (
        <Alert className="border-medical-danger bg-red-50 mb-6 border-l-4 shadow-md">
          <div className="flex items-start">
            <Ambulance className="h-6 w-6 text-medical-danger mr-3 mt-0.5 flex-shrink-0" />
            <AlertDescription className="text-medical-danger font-semibold text-base">
              Based on your symptoms, you may need <span className="font-bold">immediate medical attention</span>. 
              Please call emergency services (911) or go to the nearest emergency room right away.
            </AlertDescription>
          </div>
        </Alert>
      )}

      {hasUrgentCondition && !hasEmergencyCondition && (
        <Alert className="border-medical-warning bg-amber-50 mb-6 border-l-4 shadow-md">
          <div className="flex items-start">
            <AlertTriangle className="h-6 w-6 text-medical-warning mr-3 mt-0.5 flex-shrink-0" />
            <AlertDescription className="text-medical-warning font-semibold text-base">
              Your symptoms suggest a condition that may require prompt medical attention. 
              Consider seeking care within the next 24 hours.
            </AlertDescription>
          </div>
        </Alert>
      )}

      {results.length === 0 ? (
        <div className="text-center p-10 border rounded-lg bg-gray-50">
          <h3 className="text-xl font-semibold text-gray-700">No Matching Conditions Found</h3>
          <p className="mt-2 text-gray-600">
            We couldn't find conditions that closely match your symptoms. Please consult a healthcare 
            professional for proper diagnosis as your symptoms may still indicate a health concern.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {results.map((result) => (
            <Card key={result.condition.id} className="border-l-4 overflow-hidden shadow-md hover:shadow-lg transition-shadow" style={{ 
              borderLeftColor: 
                result.condition.seekMedicalAttention === 'immediately' ? '#ef5350' :
                result.condition.seekMedicalAttention === 'within24Hours' ? '#ffa726' :
                result.condition.seekMedicalAttention === 'withinWeek' ? '#ffee58' : 
                '#4caf50'
            }}>
              <CardHeader className="pb-2">
                <div 
                  className="flex justify-between items-start cursor-pointer"
                  onClick={() => toggleConditionExpansion(result.condition.id)}
                >
                  <div>
                    <CardTitle className="text-xl font-bold text-medical-text flex items-center">
                      {result.condition.name}
                    </CardTitle>
                    <CardDescription className="mt-1 flex items-center space-x-2">
                      <span>Match: <strong className="text-medical-text">{result.matchScore}%</strong></span>
                      {getSeverityBadge(result.condition.severity)}
                    </CardDescription>
                  </div>
                  {expandedConditions.includes(result.condition.id) ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </div>
              </CardHeader>
              
              {/* Card content is always visible */}
              <CardContent className="pt-0">
                <p className="text-gray-600 mb-4">{result.condition.description}</p>
                
                <div className={`${expandedConditions.includes(result.condition.id) ? '' : 'hidden'}`}>
                  <Tabs defaultValue="symptoms" className="mt-4">
                    <TabsList className="grid grid-cols-3">
                      <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
                      <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                      <TabsTrigger value="details">Details</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="symptoms" className="pt-4">
                      <h4 className="font-semibold text-medical-text mb-2">Common symptoms:</h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {result.condition.symptoms.map(symptomId => {
                          const symptom = getSymptomById(symptomId);
                          return symptom ? (
                            <Badge key={symptomId} variant="outline" className="bg-medical-light border-0">
                              {symptom.name}
                            </Badge>
                          ) : (
                            <Badge key={symptomId} variant="outline" className="bg-medical-light border-0">
                              {symptomId.replace(/_/g, ' ')}
                            </Badge>
                          );
                        })}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="recommendations" className="pt-4">
                      <h4 className="font-semibold text-medical-text mb-2">Recommendations:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-600">
                        {result.condition.recommendations.map((recommendation, index) => (
                          <li key={index}>{recommendation}</li>
                        ))}
                      </ul>
                    </TabsContent>
                    
                    <TabsContent value="details" className="pt-4">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-medical-text mb-1">Risk Factors:</h4>
                          <ul className="list-disc pl-5 space-y-1 text-gray-600">
                            {result.condition.riskFactors.age && (
                              <li>
                                Age: {result.condition.riskFactors.age.min !== undefined ? result.condition.riskFactors.age.min : 'Any'} 
                                {result.condition.riskFactors.age.max !== undefined ? ` to ${result.condition.riskFactors.age.max}` : '+'} years
                              </li>
                            )}
                            {result.condition.riskFactors.gender && (
                              <li>
                                Gender: {result.condition.riskFactors.gender === 'any' ? 'All genders' : 
                                  result.condition.riskFactors.gender === 'male' ? 'More common in males' : 
                                  'More common in females'}
                              </li>
                            )}
                            {result.condition.riskFactors.regions && result.condition.riskFactors.regions.length > 0 && (
                              <li>
                                Regions: {result.condition.riskFactors.regions.join(', ')}
                              </li>
                            )}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-medical-text mb-1">Severity Level:</h4>
                          <p className="text-gray-600">
                            This condition is generally classified as 
                            <span className={`font-medium ${getSeverityColor(result.condition.severity)}`}>
                              {' ' + result.condition.severity}
                            </span>.
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </CardContent>
              
              <CardFooter className="border-t pt-4 flex flex-col items-start">
                <div className={`text-white px-3 py-1.5 rounded-full text-sm font-medium ${getMedicalAttentionColor(result.condition.seekMedicalAttention)}`}>
                  {getMedicalAttentionText(result.condition.seekMedicalAttention)}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      
      <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
        <div className="flex items-start space-x-3">
          <Info className="h-5 w-5 text-medical-text mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-medical-text">Important Information</h3>
            <p className="text-gray-600 text-sm mt-1">
              These results are based on the information you provided and are intended for informational purposes only.
              Always consult with a qualified healthcare professional for proper diagnosis and treatment.
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center mt-8 print:hidden">
        <Button 
          onClick={onReset}
          className="bg-medical-text hover:bg-medical-dark text-white px-8"
          size="lg"
        >
          Check Different Symptoms
        </Button>
      </div>
    </div>
  );
};

export default ResultsDisplay;
