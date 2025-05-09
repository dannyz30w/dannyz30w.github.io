
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getSymptomById } from '@/data/symptoms';
import { getMedicalAttentionText, getMedicalAttentionColor, getSeverityColor } from '@/utils/symptomMatcher';
import { AlertCircle, AlertTriangle, CheckCircle, ChevronDown, ChevronUp, X, Search, Pill, AlertOctagon, Users, Clock } from 'lucide-react';
import { Input } from "./ui/input";
import { MatchedCondition, UserData } from '@/types';

interface ResultsDisplayProps {
  results: MatchedCondition[];
  userData: UserData;
  onReset: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, userData, onReset }) => {
  const [expandedCondition, setExpandedCondition] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // If there are results, expand the first one by default
    if (results.length > 0) {
      setExpandedCondition(results[0].condition.id);
    }
  }, [results]);

  const toggleConditionExpanded = (conditionId: string) => {
    setExpandedCondition(prev => prev === conditionId ? null : conditionId);
  };

  // Filtered results based on search term
  const filteredResults = searchTerm.trim() === "" 
    ? results 
    : results.filter(result => 
        result.condition.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        result.matchedSymptoms.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
      );

  // Check if the user has any medical factors that affect the analysis
  const hasMedicalFactors = userData.medications?.length > 0 || 
                           userData.allergies?.length > 0 || 
                           userData.pastMedicalConditions?.length > 0 || 
                           userData.familyHistory?.length > 0;

  // Format duration text from userData
  const getDurationText = () => {
    if (!userData.duration) return "Not specified";
    
    if (userData.duration < 7) {
      return `${userData.duration} day${userData.duration !== 1 ? 's' : ''}`;
    } else if (userData.duration < 30) {
      const weeks = Math.floor(userData.duration / 7);
      return `${weeks} week${weeks !== 1 ? 's' : ''}`;
    } else {
      const months = Math.floor(userData.duration / 30);
      return `${months} month${months !== 1 ? 's' : ''}`;
    }
  };

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

      {/* User Profile Summary Card */}
      <Card className="mb-6 border-medical-light/50 shadow-sm overflow-hidden">
        <div className="bg-medical-light/10 p-4 border-b border-medical-light/30">
          <h3 className="font-medium text-medical-text flex items-center gap-2">
            <Users className="h-4 w-4" /> Patient Profile Summary
          </h3>
        </div>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-gray-500">Age</p>
              <p className="font-medium">{userData.age || "Not specified"}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-gray-500">Gender</p>
              <p className="font-medium">{userData.gender ? userData.gender.charAt(0).toUpperCase() + userData.gender.slice(1) : "Not specified"}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-gray-500">Duration of Symptoms</p>
              <p className="font-medium flex items-center gap-1">
                <Clock className="h-3 w-3 text-medical-text" />
                {getDurationText()}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-gray-500">Reported Symptoms</p>
              <p className="font-medium">{userData.symptoms.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>

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

      {/* Results search and filter bar */}
      {results.length > 2 && (
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search conditions or symptoms..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-gray-300 focus:border-medical-text"
            />
          </div>
          {searchTerm && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setSearchTerm("")}
              className="h-10"
            >
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      )}

      <div className="space-y-6">
        {filteredResults.length > 0 ? (
          filteredResults.map(({ condition, matchPercentage, matchedSymptoms, notMatchedSymptoms, score }, index) => {
            const isExpanded = expandedCondition === condition.id;
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
            const displayScore = Math.min(100, familyHistoryMatch ? matchPercentage + 5 : matchPercentage);
            
            return (
              <Card 
                key={`${condition.id}-${index}`} 
                className={`overflow-hidden border-l-4 transition-all duration-300 hover:shadow-md ${
                  isExpanded ? "shadow-md" : ""
                } ${
                  displayScore > 75 ? "border-l-medical-danger" : 
                  displayScore > 50 ? "border-l-medical-warning" : 
                  "border-l-medical"
                }`}
              >
                <div 
                  className={`p-4 flex justify-between items-center cursor-pointer ${
                    isExpanded ? "bg-gray-50" : ""
                  } hover:bg-gray-50/80 transition-colors duration-200`}
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

                        {condition.ageRange && (
                          <div className="mt-4">
                            <h4 className="font-semibold text-gray-700 mb-2">Typical Age Range</h4>
                            <p className="text-sm">
                              This condition typically affects people between <span className="font-medium">{condition.ageRange.min}</span> and <span className="font-medium">{condition.ageRange.max}</span> years old.
                              {userData.age && !isNaN(Number(userData.age)) && (
                                <span className={`ml-2 ${
                                  Number(userData.age) >= condition.ageRange.min && Number(userData.age) <= condition.ageRange.max
                                    ? "text-green-600 font-medium"
                                    : "text-gray-500"
                                }`}>
                                  {Number(userData.age) >= condition.ageRange.min && Number(userData.age) <= condition.ageRange.max
                                    ? "(Your age is within this range)"
                                    : "(Your age is outside this range)"}
                                </span>
                              )}
                            </p>
                          </div>
                        )}

                        {condition.gender && condition.gender !== 'any' && (
                          <div className="mt-4">
                            <h4 className="font-semibold text-gray-700 mb-2">Gender Consideration</h4>
                            <p className="text-sm">
                              This condition primarily affects {condition.gender === 'male' ? 'males' : 'females'}.
                              {userData.gender && (
                                <span className={`ml-2 ${
                                  userData.gender === condition.gender
                                    ? "text-green-600 font-medium"
                                    : "text-gray-500"
                                }`}>
                                  {userData.gender === condition.gender
                                    ? "(Relevant to your gender)"
                                    : "(Less common for your gender)"}
                                </span>
                              )}
                            </p>
                          </div>
                        )}
                      </TabsContent>
                      
                      <TabsContent value="symptoms" className="p-5 pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-gray-700 mb-2">Matching Symptoms</h4>
                            <div className="grid grid-cols-1 gap-2">
                              {matchedSymptoms.length > 0 ? (
                                matchedSymptoms.map(symptomName => (
                                  <div key={symptomName} className="flex items-start space-x-2">
                                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                                    <div>
                                      <span className="text-sm text-gray-700">{symptomName}</span>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <p className="text-sm text-gray-500">No matching symptoms found.</p>
                              )}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold text-gray-700 mb-2">Other Common Symptoms</h4>
                            <div className="grid grid-cols-1 gap-2">
                              {notMatchedSymptoms.length > 0 ? (
                                notMatchedSymptoms.slice(0, 5).map(symptomName => (
                                  <div key={symptomName} className="flex items-start space-x-2">
                                    <AlertCircle className="h-4 w-4 text-gray-400 mt-0.5" />
                                    <span className="text-sm text-gray-500">{symptomName}</span>
                                  </div>
                                ))
                              ) : (
                                <p className="text-sm text-gray-500">No additional symptoms to show.</p>
                              )}
                              {notMatchedSymptoms.length > 5 && (
                                <div className="text-sm text-gray-500 italic">
                                  + {notMatchedSymptoms.length - 5} more symptoms
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {condition.typicalDuration && (
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <h4 className="font-semibold text-gray-700 mb-2">Typical Duration</h4>
                            <p className="text-sm text-gray-600">
                              This condition typically lasts for about {condition.typicalDuration} days.
                              {userData.duration > 0 && (
                                <span className={`ml-2 ${
                                  Math.abs(userData.duration - condition.typicalDuration) <= 7
                                    ? "text-green-600 font-medium"
                                    : "text-gray-500"
                                }`}>
                                  {Math.abs(userData.duration - condition.typicalDuration) <= 7
                                    ? "(Similar to your reported duration)"
                                    : userData.duration < condition.typicalDuration
                                      ? "(Your symptoms are more recent than typical)"
                                      : "(Your symptoms have lasted longer than typical)"}
                                </span>
                              )}
                            </p>
                          </div>
                        )}
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
                        
                        {/* Related medications section */}
                        {condition.medicationConsiderations && condition.medicationConsiderations.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <h4 className="font-semibold text-gray-700 mb-2">Medication Considerations</h4>
                            <div className="space-y-2">
                              {condition.medicationConsiderations.map((med, idx) => {
                                const userHasMed = userData.medications?.some(m => 
                                  m.toLowerCase().includes(med.name.toLowerCase()) || 
                                  med.name.toLowerCase().includes(m.toLowerCase())
                                );
                                
                                return (
                                  <div key={idx} className={`p-2 rounded-md text-sm ${
                                    userHasMed ? "bg-blue-50 border border-blue-100" : "bg-gray-50 border border-gray-100"
                                  }`}>
                                    <div className="flex items-start">
                                      <Pill className={`h-4 w-4 mt-0.5 mr-2 ${userHasMed ? "text-blue-500" : "text-gray-400"}`} />
                                      <div>
                                        <span className={`font-medium ${userHasMed ? "text-blue-700" : "text-gray-700"}`}>
                                          {med.name}
                                        </span>
                                        <span className={`ml-2 ${
                                          med.effect === 'positive' ? "text-green-600" : "text-amber-600"
                                        }`}>
                                          ({med.effect === 'positive' ? "May help" : "May worsen symptoms"})
                                        </span>
                                        {userHasMed && (
                                          <p className="text-xs text-blue-600 mt-1">You reported taking this or a similar medication</p>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
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

      <div className="mt-8 flex justify-center">
        <Button
          onClick={onReset}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-8 py-2 transform hover:scale-105 transition-all duration-200"
        >
          Start New Analysis
        </Button>
      </div>
    </div>
  );
};

export default ResultsDisplay;
