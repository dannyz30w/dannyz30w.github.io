
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
import { AlertCircle, AlertTriangle, CheckCircle, ChevronDown, ChevronUp, Newspaper, X, Search, Pill, AlertOctagon, Users } from 'lucide-react';
import HealthNews from './HealthNews';
import { Input } from "./ui/input";

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
  const [newsSearchQuery, setNewsSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<string>("overview");

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
    setNewsSearchQuery(condition.name);
    
    // Scroll to news section
    setTimeout(() => {
      document.getElementById('health-news-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Check if the user has any medical factors that affect the analysis
  const hasMedicalFactors = userData.medications?.length > 0 || 
                           userData.allergies?.length > 0 || 
                           userData.pastMedicalConditions?.length > 0 || 
                           userData.familyHistory?.length > 0;

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-medical-text mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Symptom Analysis Results</h2>
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

      {hasMedicalFactors && (
        <div className="mb-6 bg-white rounded-lg shadow p-5 border-l-4 border-l-medical-text">
          <h3 className="text-lg font-semibold text-medical-text mb-2">Factors Considered in Analysis</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userData.familyHistory?.length > 0 && (
              <div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-medical-text" />
                  <h4 className="font-medium text-sm text-gray-700">Family History</h4>
                </div>
                <div className="mt-1 flex flex-wrap gap-1">
                  {userData.familyHistory.map((condition: string, i: number) => (
                    <Badge key={i} variant="outline" className="bg-medical-light/20">
                      {condition}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {userData.pastMedicalConditions?.length > 0 && (
              <div>
                <div className="flex items-center gap-2">
                  <AlertOctagon className="h-4 w-4 text-medical-text" />
                  <h4 className="font-medium text-sm text-gray-700">Past Medical Conditions</h4>
                </div>
                <div className="mt-1 flex flex-wrap gap-1">
                  {userData.pastMedicalConditions.map((condition: string, i: number) => (
                    <Badge key={i} variant="outline" className="bg-medical-light/20">
                      {condition}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {userData.medications?.length > 0 && (
              <div>
                <div className="flex items-center gap-2">
                  <Pill className="h-4 w-4 text-medical-text" />
                  <h4 className="font-medium text-sm text-gray-700">Current Medications</h4>
                </div>
                <div className="mt-1 flex flex-wrap gap-1">
                  {userData.medications.map((med: string, i: number) => (
                    <Badge key={i} variant="outline" className="bg-medical-light/20">
                      {med}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {userData.allergies?.length > 0 && (
              <div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-medical-text" />
                  <h4 className="font-medium text-sm text-gray-700">Allergies</h4>
                </div>
                <div className="mt-1 flex flex-wrap gap-1">
                  {userData.allergies.map((allergy: string, i: number) => (
                    <Badge key={i} variant="outline" className="bg-medical-light/20">
                      {allergy}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="space-y-6">
        {results.length > 0 ? (
          results.map(({ condition, matchScore }, index) => {
            const isExpanded = expandedCondition === condition.id;
            const matchedSymptoms = condition.symptoms.filter(s => userData.symptoms.includes(s));
            const unmatchedSymptoms = condition.symptoms.filter(s => !userData.symptoms.includes(s));
            const familyHistoryMatch = userData.familyHistory && userData.familyHistory.some(history => 
              condition.name.toLowerCase().includes(history.toLowerCase())
            );
            
            // Check for medical history matches
            const pastConditionMatch = userData.pastMedicalConditions && 
              userData.pastMedicalConditions.some(history => 
                condition.name.toLowerCase().includes(history.toLowerCase()) ||
                (condition.description && condition.description.toLowerCase().includes(history.toLowerCase()))
              );
            
            // Apply family history bonus for UI display
            const displayScore = Math.min(100, familyHistoryMatch ? matchScore + 5 : matchScore);
            
            return (
              <Card key={`${condition.id}-${index}`} className={`overflow-hidden border-l-4 transition-all duration-300 ${isExpanded ? "shadow-md" : ""} ${
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
                      {pastConditionMatch && (
                        <Badge className="bg-amber-100 text-amber-700 border border-amber-300">Medical History</Badge>
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
                  <CardContent className="bg-gray-50 border-t border-gray-100 p-0">
                    <Tabs 
                      value={activeTab} 
                      onValueChange={setActiveTab} 
                      className="w-full"
                    >
                      <TabsList className="w-full rounded-none border-b bg-white">
                        <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
                        <TabsTrigger value="symptoms" className="flex-1">Symptoms</TabsTrigger>
                        <TabsTrigger value="management" className="flex-1">Management</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="overview" className="p-5 pt-4">
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
                      </TabsContent>
                      
                      <TabsContent value="symptoms" className="p-5 pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                          </div>

                          <div>
                            <h4 className="font-semibold text-gray-700 mb-2">Other Common Symptoms</h4>
                            <div className="grid grid-cols-1 gap-2">
                              {unmatchedSymptoms.length > 0 ? (
                                unmatchedSymptoms.slice(0, 5).map(symptomId => {
                                  const symptom = getSymptomById(symptomId);
                                  return symptom ? (
                                    <div key={symptomId} className="flex items-start space-x-2">
                                      <AlertCircle className="h-4 w-4 text-gray-400 mt-0.5" />
                                      <span className="text-sm text-gray-500">{symptom.name}</span>
                                    </div>
                                  ) : null;
                                })
                              ) : (
                                <p className="text-sm text-gray-500">No additional symptoms to show.</p>
                              )}
                              {unmatchedSymptoms.length > 5 && (
                                <div className="text-sm text-gray-500 italic">
                                  + {unmatchedSymptoms.length - 5} more symptoms
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="management" className="p-5 pt-4">
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
                        
                        {/* Add medical attention info again on this tab */}
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <h4 className="font-semibold text-gray-700 mb-2">When to Seek Medical Care</h4>
                          <div className="bg-gray-100 p-3 rounded-md border border-gray-200">
                            <div className="flex items-start gap-2">
                              <AlertCircle className="h-5 w-5 mt-0.5 text-medical-text" />
                              <p className="text-sm text-gray-600">
                                <strong className="text-medical-text">
                                  {getMedicalAttentionText(condition.seekMedicalAttention)}
                                </strong>
                                <br />
                                {condition.seekMedicalAttention === 'immediately' && (
                                  <span className="text-red-600">If you're experiencing severe symptoms, please contact emergency services or visit your nearest emergency room.</span>
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
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

      {showNews && (
        <div id="health-news-section" className="mt-10">
          <Card>
            <CardHeader className="bg-gradient-to-r from-blue-50 to-white border-b border-blue-100">
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-medical-text">
                    Health News: {selectedNewsCondition?.name}
                  </h3>
                  <Button variant="ghost" size="sm" onClick={() => setShowNews(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search health topics..."
                    value={newsSearchQuery}
                    onChange={(e) => setNewsSearchQuery(e.target.value)}
                    className="pl-10 bg-white"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <HealthNews condition={newsSearchQuery || selectedNewsCondition?.name || ''} />
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
