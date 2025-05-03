
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getSymptomById } from '@/data/symptoms';
import { Condition } from '@/data/conditions';
import { getMedicalAttentionText, getMedicalAttentionColor, getSeverityColor } from '@/utils/symptomMatcher';
import { AlertCircle, AlertTriangle, CheckCircle, ChevronDown, ChevronUp, Newspaper, X } from 'lucide-react';
import HealthNews from './HealthNews';

interface ResultsDisplayProps {
  results: {
    condition: Condition;
    matchScore: number;
  }[];
  userData: any;
  onReset: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, userData, onReset }) => {
  const [expandedCondition, setExpandedCondition] = useState<string | null>(null);
  const [selectedNewsCondition, setSelectedNewsCondition] = useState<Condition | null>(null);
  const [showNews, setShowNews] = useState(false);

  useEffect(() => {
    // If there are results, expand the first one by default
    if (results.length > 0) {
      setExpandedCondition(results[0].condition.id);
    }
  }, [results]);

  const toggleConditionExpanded = (conditionId: string) => {
    setExpandedCondition(prev => prev === conditionId ? null : conditionId);
  };

  const showNewsFor = (condition: Condition) => {
    setSelectedNewsCondition(condition);
    setShowNews(true);
    
    // Scroll to news section
    setTimeout(() => {
      document.getElementById('health-news-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-medical-text mb-3">Symptom Analysis Results</h2>
        <p className="text-gray-600">Based on the information you provided, here are potential conditions that may match your symptoms</p>
      </div>

      <Alert className="mb-6 bg-medical-light/30 border-medical-light">
        <AlertTriangle className="h-4 w-4 text-medical-text" />
        <AlertTitle className="text-medical-text font-medium">Important Medical Disclaimer</AlertTitle>
        <AlertDescription className="text-gray-700">
          This information is for educational purposes only and is not a substitute for professional medical advice.
          Always consult with a qualified healthcare provider for proper diagnosis and treatment.
        </AlertDescription>
      </Alert>

      <div className="space-y-6">
        {results.length > 0 ? (
          results.map(({ condition, matchScore }) => {
            const isExpanded = expandedCondition === condition.id;
            const matchedSymptoms = condition.symptoms.filter(s => userData.symptoms.includes(s));
            const unmatchedSymptoms = condition.symptoms.filter(s => !userData.symptoms.includes(s));
            const familyHistoryMatch = userData.familyHistory && userData.familyHistory.some(history => 
              condition.name.toLowerCase().includes(history.toLowerCase())
            );
            
            // Apply family history bonus for UI display
            const displayScore = Math.min(100, familyHistoryMatch ? matchScore + 5 : matchScore);
            
            return (
              <Card key={condition.id} className={`overflow-hidden border-l-4 transition-all duration-300 ${isExpanded ? "shadow-md" : ""} ${
                displayScore > 75 ? "border-l-medical-danger" : displayScore > 50 ? "border-l-medical-warning" : "border-l-medical"
              }`}>
                <div 
                  className={`p-4 flex justify-between items-center cursor-pointer ${isExpanded ? "bg-gray-50" : ""}`}
                  onClick={() => toggleConditionExpanded(condition.id)}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <h3 className="text-lg font-semibold">{condition.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge className={`${getSeverityColor(condition.severity)} bg-opacity-15`}>
                        {condition.severity.charAt(0).toUpperCase() + condition.severity.slice(1)} Severity
                      </Badge>
                      {familyHistoryMatch && (
                        <Badge className="bg-purple-100 text-purple-700 border border-purple-300">Family History</Badge>
                      )}
                      {userData.symptoms.length > 0 && (
                        <Badge className="bg-gray-100 text-gray-700 border border-gray-300">
                          {matchedSymptoms.length}/{condition.symptoms.length} Symptoms Match
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="hidden md:flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={(e) => {
                          e.stopPropagation(); 
                          showNewsFor(condition);
                        }}
                        className="text-xs bg-white"
                      >
                        <Newspaper className="h-3 w-3 mr-1" />
                        Recent News
                      </Button>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className={`text-lg font-bold ${
                        displayScore > 75 ? "text-medical-danger" : 
                        displayScore > 50 ? "text-medical-warning" : 
                        "text-medical-text"
                      }`}>
                        {displayScore}%
                      </div>
                      <div className="text-xs text-gray-500">Match</div>
                    </div>
                    {isExpanded ? 
                      <ChevronUp className="h-5 w-5 text-gray-400" /> : 
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    }
                  </div>
                </div>

                {isExpanded && (
                  <CardContent className="bg-gray-50 border-t border-gray-100 p-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">Description</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{condition.description}</p>
                        
                        <div className="mt-4">
                          <h4 className="font-semibold text-gray-700 mb-2">Medical Attention</h4>
                          <Badge 
                            className={`${getMedicalAttentionColor(condition.seekMedicalAttention)} text-white`}
                          >
                            {getMedicalAttentionText(condition.seekMedicalAttention)}
                          </Badge>
                        </div>
                        
                        <div className="mt-6">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={(e) => {
                              e.stopPropagation(); 
                              showNewsFor(condition);
                            }}
                            className="md:hidden text-xs"
                          >
                            <Newspaper className="h-3 w-3 mr-1" />
                            See Recent News
                          </Button>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">Matching Symptoms</h4>
                        <div className="grid grid-cols-1 gap-2">
                          {matchedSymptoms.length > 0 ? (
                            matchedSymptoms.map(symptomId => {
                              const symptom = getSymptomById(symptomId);
                              return symptom ? (
                                <div key={symptomId} className="flex items-start space-x-2">
                                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                                  <div>
                                    <span className="text-sm text-gray-700">{symptom.name}</span>
                                    {symptom.description && (
                                      <p className="text-xs text-gray-500">{symptom.description}</p>
                                    )}
                                  </div>
                                </div>
                              ) : null;
                            })
                          ) : (
                            <p className="text-sm text-gray-500">No matching symptoms found.</p>
                          )}
                        </div>

                        {unmatchedSymptoms.length > 0 && (
                          <>
                            <h4 className="font-semibold text-gray-700 mt-4 mb-2">Other Common Symptoms</h4>
                            <div className="grid grid-cols-1 gap-2">
                              {unmatchedSymptoms.slice(0, 5).map(symptomId => {
                                const symptom = getSymptomById(symptomId);
                                return symptom ? (
                                  <div key={symptomId} className="flex items-start space-x-2">
                                    <AlertCircle className="h-4 w-4 text-gray-400 mt-0.5" />
                                    <span className="text-sm text-gray-500">{symptom.name}</span>
                                  </div>
                                ) : null;
                              })}
                              {unmatchedSymptoms.length > 5 && (
                                <div className="text-sm text-gray-500 italic">
                                  + {unmatchedSymptoms.length - 5} more symptoms
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-700 mb-2">Prevention & Management</h4>
                      {condition.preventionTips && condition.preventionTips.length > 0 ? (
                        <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
                          {condition.preventionTips.map((tip, index) => (
                            <li key={index}>{tip}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-gray-500">No specific prevention tips available for this condition.</p>
                      )}
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })
        ) : (
          <Card className="p-6 text-center">
            <div className="flex flex-col items-center space-y-4">
              <AlertCircle className="h-12 w-12 text-gray-400" />
              <h3 className="text-xl font-semibold text-gray-700">No Matches Found</h3>
              <p className="text-gray-600 max-w-md">
                Based on the information you provided, we couldn't find any conditions that match your symptoms.
                Consider adding more symptoms or details for better results.
              </p>
            </div>
          </Card>
        )}
      </div>

      {showNews && selectedNewsCondition && (
        <div id="health-news-section" className="mt-10">
          <Card>
            <CardHeader className="bg-gradient-to-r from-blue-50 to-white border-b border-blue-100">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-medical-text">Recent Health News: {selectedNewsCondition.name}</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowNews(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <HealthNews condition={selectedNewsCondition.name} />
            </CardContent>
          </Card>
        </div>
      )}

      <div className="mt-8 flex justify-center">
        <Button
          onClick={onReset}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-8 py-2"
        >
          Start New Analysis
        </Button>
      </div>
    </div>
  );
};

export default ResultsDisplay;
