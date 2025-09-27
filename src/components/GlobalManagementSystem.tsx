import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { SearchIcon, ExternalLinkIcon, AlertTriangleIcon, InfoIcon, HeartPulseIcon, PlusIcon, BookOpenIcon, ActivityIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { MatchedCondition } from '@/types';

interface ManagementSystemProps {
  selectedConditions?: MatchedCondition[];
}

interface ManagementProtocol {
  id: string;
  condition: string;
  category: 'general' | 'emergency' | 'chronic' | 'acute';
  severity: 'mild' | 'moderate' | 'severe';
  protocols: {
    immediate: string[];
    shortTerm: string[];
    longTerm: string[];
    prevention: string[];
  };
  medications: {
    firstLine: string[];
    alternative: string[];
    contraindications: string[];
  };
  monitoring: {
    clinical: string[];
    laboratory: string[];
    imaging: string[];
    patient_reported: string[];
  };
  complications: {
    early: string[];
    late: string[];
    emergency: string[];
  };
  evidenceLevel: 'A' | 'B' | 'C' | 'D';
  lastUpdated: string;
}

export const GlobalManagementSystem: React.FC<ManagementSystemProps> = ({ selectedConditions }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [protocols, setProtocols] = useState<ManagementProtocol[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeProtocol, setActiveProtocol] = useState<ManagementProtocol | null>(null);
  const { toast } = useToast();

  // Pre-populate with selected conditions
  useEffect(() => {
    if (selectedConditions && selectedConditions.length > 0) {
      const conditionNames = selectedConditions.map(c => c.condition.name).join(', ');
      setSearchQuery(conditionNames);
    }
  }, [selectedConditions]);

  const searchProtocols = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Search Required",
        description: "Please enter a condition to search for management protocols.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate comprehensive medical protocol search
      const mockProtocols: ManagementProtocol[] = [
        {
          id: '1',
          condition: searchQuery,
          category: 'acute',
          severity: 'moderate',
          protocols: {
            immediate: [
              'Assess vital signs and patient stability',
              'Obtain focused history and physical examination', 
              'Order appropriate diagnostic tests',
              'Initiate symptom relief measures'
            ],
            shortTerm: [
              'Monitor response to initial treatment',
              'Adjust therapy based on clinical response',
              'Patient education and counseling',
              'Schedule appropriate follow-up'
            ],
            longTerm: [
              'Develop comprehensive care plan',
              'Coordinate with specialists if needed',
              'Implement preventive measures',
              'Regular monitoring and surveillance'
            ],
            prevention: [
              'Risk factor modification',
              'Lifestyle interventions',
              'Vaccination protocols if applicable',
              'Screening guidelines'
            ]
          },
          medications: {
            firstLine: [
              'Evidence-based first-line medications',
              'Dosing based on patient factors',
              'Duration of therapy protocols'
            ],
            alternative: [
              'Second-line treatment options',
              'Alternatives for intolerant patients',
              'Refractory case management'
            ],
            contraindications: [
              'Absolute contraindications',
              'Relative contraindications', 
              'Drug interaction warnings'
            ]
          },
          monitoring: {
            clinical: [
              'Symptom assessment protocols',
              'Physical examination schedules',
              'Functional status evaluation'
            ],
            laboratory: [
              'Routine laboratory monitoring',
              'Specific biomarker tracking',
              'Safety monitoring protocols'
            ],
            imaging: [
              'Baseline imaging requirements',
              'Follow-up imaging schedules',
              'Response assessment criteria'
            ],
            patient_reported: [
              'Quality of life assessments',
              'Symptom diaries and tracking',
              'Patient satisfaction measures'
            ]
          },
          complications: {
            early: [
              'Immediate complications to monitor',
              'Early warning signs',
              'Intervention thresholds'
            ],
            late: [
              'Long-term complications',
              'Surveillance protocols',
              'Prevention strategies'
            ],
            emergency: [
              'Life-threatening complications',
              'Emergency intervention protocols',
              'When to call emergency services'
            ]
          },
          evidenceLevel: 'A',
          lastUpdated: new Date().toLocaleDateString()
        }
      ];

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setProtocols(mockProtocols);
      setActiveProtocol(mockProtocols[0]);
      
      toast({
        title: "Protocols Retrieved",
        description: `Found ${mockProtocols.length} evidence-based management protocol(s)`,
      });
    } catch (error) {
      toast({
        title: "Search Error",
        description: "Unable to retrieve management protocols. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getEvidenceBadge = (level: 'A' | 'B' | 'C' | 'D') => {
    const variants = {
      A: 'bg-green-100 text-green-800 border-green-200',
      B: 'bg-blue-100 text-blue-800 border-blue-200',
      C: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      D: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    
    const descriptions = {
      A: 'High Quality Evidence - RCTs/Meta-analyses',
      B: 'Moderate Quality - Cohort Studies',
      C: 'Low Quality - Case-control Studies',
      D: 'Very Low Quality - Expert Opinion'
    };
    
    return (
      <Badge variant="outline" className={variants[level]} title={descriptions[level]}>
        Evidence Level {level}
      </Badge>
    );
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      emergency: <AlertTriangleIcon className="h-4 w-4 text-red-600" />,
      acute: <ActivityIcon className="h-4 w-4 text-orange-600" />,
      chronic: <HeartPulseIcon className="h-4 w-4 text-blue-600" />,
      general: <BookOpenIcon className="h-4 w-4 text-green-600" />
    };
    return icons[category as keyof typeof icons] || <InfoIcon className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
          <HeartPulseIcon className="h-7 w-7 text-primary" />
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Global Management System
          </h2>
        </div>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Access evidence-based treatment protocols, management guidelines, and clinical decision support 
          from international medical organizations and peer-reviewed literature.
        </p>
      </div>

      <Card className="border-2 border-primary/20 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <SearchIcon className="h-5 w-5" />
              <span>Search Management Protocols</span>
            </div>
            {selectedConditions && selectedConditions.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {selectedConditions.length} Selected
              </Badge>
            )}
          </CardTitle>
          <CardDescription>
            Enter any medical condition to retrieve evidence-based management protocols and treatment guidelines
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="e.g., diabetes mellitus, acute myocardial infarction, pneumonia..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && searchProtocols()}
              className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            />
            <Button 
              onClick={searchProtocols}
              disabled={isLoading}
              className="min-w-[140px] bg-gradient-to-r from-primary to-primary/80 hover:from-primary/80 hover:to-primary"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Searching...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <SearchIcon className="h-4 w-4" />
                  <span>Search Protocols</span>
                </div>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {protocols.length > 0 && (
        <div className="animate-fade-in">
          <div className="grid gap-4 mb-6">
            {protocols.map((protocol) => (
              <Card 
                key={protocol.id} 
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg border-l-4 ${
                  activeProtocol?.id === protocol.id 
                    ? 'border-l-primary bg-primary/5' 
                    : 'border-l-gray-200 hover:border-l-primary/50'
                }`}
                onClick={() => setActiveProtocol(protocol)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getCategoryIcon(protocol.category)}
                      <div>
                        <h3 className="font-semibold text-lg">{protocol.condition}</h3>
                        <p className="text-sm text-muted-foreground">
                          {protocol.category.charAt(0).toUpperCase() + protocol.category.slice(1)} • 
                          {protocol.severity.charAt(0).toUpperCase() + protocol.severity.slice(1)} Severity
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getEvidenceBadge(protocol.evidenceLevel)}
                      <Badge variant="outline" className="text-xs">
                        Updated {protocol.lastUpdated}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {activeProtocol && (
            <Card className="border-2 border-primary/10 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-primary/10 via-secondary/5 to-transparent">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                    <span>Management Protocol: {activeProtocol.condition}</span>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <ExternalLinkIcon className="h-4 w-4 mr-2" />
                        View Full Protocol
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Complete Management Protocol</DialogTitle>
                        <DialogDescription>
                          Comprehensive evidence-based protocol for {activeProtocol.condition}
                        </DialogDescription>
                      </DialogHeader>
                      {/* Full protocol content would go here */}
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          Full protocol details would be displayed here in a real implementation,
                          including detailed flowcharts, dosing charts, and reference citations.
                        </p>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Tabs defaultValue="protocols" className="w-full">
                  <TabsList className="grid grid-cols-4 w-full mb-6">
                    <TabsTrigger value="protocols">Treatment Protocols</TabsTrigger>
                    <TabsTrigger value="medications">Medications</TabsTrigger>
                    <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
                    <TabsTrigger value="complications">Complications</TabsTrigger>
                  </TabsList>

                  <TabsContent value="protocols" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base flex items-center space-x-2">
                            <AlertTriangleIcon className="h-4 w-4 text-red-600" />
                            <span>Immediate Actions</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ScrollArea className="h-32">
                            <ul className="space-y-2 text-sm">
                              {activeProtocol.protocols.immediate.map((item, index) => (
                                <li key={index} className="flex items-start space-x-2">
                                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </ScrollArea>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base flex items-center space-x-2">
                            <ActivityIcon className="h-4 w-4 text-orange-600" />
                            <span>Short-term Management</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ScrollArea className="h-32">
                            <ul className="space-y-2 text-sm">
                              {activeProtocol.protocols.shortTerm.map((item, index) => (
                                <li key={index} className="flex items-start space-x-2">
                                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </ScrollArea>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base flex items-center space-x-2">
                            <HeartPulseIcon className="h-4 w-4 text-blue-600" />
                            <span>Long-term Care</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ScrollArea className="h-32">
                            <ul className="space-y-2 text-sm">
                              {activeProtocol.protocols.longTerm.map((item, index) => (
                                <li key={index} className="flex items-start space-x-2">
                                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </ScrollArea>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base flex items-center space-x-2">
                            <BookOpenIcon className="h-4 w-4 text-green-600" />
                            <span>Prevention</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ScrollArea className="h-32">
                            <ul className="space-y-2 text-sm">
                              {activeProtocol.protocols.prevention.map((item, index) => (
                                <li key={index} className="flex items-start space-x-2">
                                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </ScrollArea>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="medications" className="space-y-4">
                    {/* Medication protocols content */}
                    <div className="grid gap-4">
                      <Card className="border-green-200 bg-green-50/50">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base text-green-800">First-line Medications</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2 text-sm">
                            {activeProtocol.medications.firstLine.map((med, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                                <span>{med}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="monitoring" className="space-y-4">
                    {/* Monitoring protocols content */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base">Clinical Monitoring</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2 text-sm">
                            {activeProtocol.monitoring.clinical.map((item, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="complications" className="space-y-4">
                    {/* Complications content */}
                    <div className="grid gap-4">
                      <Card className="border-red-200 bg-red-50/50">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base text-red-800 flex items-center space-x-2">
                            <AlertTriangleIcon className="h-4 w-4" />
                            <span>Emergency Complications</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2 text-sm">
                            {activeProtocol.complications.emergency.map((comp, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0" />
                                <span>{comp}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};