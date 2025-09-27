import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { SearchIcon, ExternalLinkIcon, AlertTriangleIcon, InfoIcon, HeartPulseIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ManagementInfo {
  condition: string;
  treatmentOptions: string[];
  medications: string[];
  lifestyle: string[];
  monitoring: string[];
  complications: string[];
  prognosis: string;
  sources: { title: string; url: string; reliability: 'high' | 'medium' | 'low' }[];
}

export const ManagementTab: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [managementData, setManagementData] = useState<ManagementInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const searchManagementInfo = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Search Required",
        description: "Please enter a condition or disease to search for management information.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate comprehensive medical database search
      // In a real implementation, this would integrate with medical APIs
      const mockData: ManagementInfo = {
        condition: searchQuery,
        treatmentOptions: [
          "First-line therapy based on current clinical guidelines",
          "Alternative treatment options for refractory cases", 
          "Combination therapy protocols",
          "Surgical interventions when indicated",
          "Supportive care measures"
        ],
        medications: [
          "Evidence-based pharmacological interventions",
          "Dosage adjustments based on patient factors",
          "Drug interaction considerations",
          "Monitoring requirements for medications"
        ],
        lifestyle: [
          "Dietary modifications and nutritional counseling",
          "Exercise recommendations and activity limitations",
          "Stress management techniques",
          "Sleep hygiene protocols",
          "Environmental modifications"
        ],
        monitoring: [
          "Laboratory testing schedules",
          "Clinical follow-up intervals",
          "Symptom tracking parameters",
          "Imaging surveillance protocols",
          "Patient-reported outcome measures"
        ],
        complications: [
          "Early recognition of disease progression",
          "Management of acute exacerbations",
          "Prevention of complications",
          "Emergency situations requiring immediate care"
        ],
        prognosis: "Treatment outcomes vary based on disease stage, patient compliance, and individual factors. Early intervention typically improves long-term prognosis.",
        sources: [
          { title: "UpToDate Clinical Decision Support", url: "https://uptodate.com", reliability: 'high' },
          { title: "Mayo Clinic Disease Management", url: "https://mayoclinic.org", reliability: 'high' },
          { title: "NEJM Evidence-Based Medicine", url: "https://nejm.org", reliability: 'high' },
          { title: "WHO Treatment Guidelines", url: "https://who.int", reliability: 'high' },
          { title: "Cochrane Systematic Reviews", url: "https://cochrane.org", reliability: 'high' }
        ]
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setManagementData(mockData);
      
      toast({
        title: "Search Complete",
        description: `Found comprehensive management information for ${searchQuery}`,
      });
    } catch (error) {
      toast({
        title: "Search Error", 
        description: "Unable to retrieve management information. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getReliabilityBadge = (reliability: 'high' | 'medium' | 'low') => {
    const variants = {
      high: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      medium: 'bg-amber-100 text-amber-800 border-amber-200', 
      low: 'bg-red-100 text-red-800 border-red-200'
    };
    
    return (
      <Badge variant="outline" className={variants[reliability]}>
        {reliability.toUpperCase()} EVIDENCE
      </Badge>
    );
  };

  return (
    <div className="space-y-6 p-6">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 p-3 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg">
          <HeartPulseIcon className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Disease Management Center
          </h2>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Search for evidence-based treatment protocols, medication guidelines, and management strategies 
          from trusted medical sources worldwide.
        </p>
      </div>

      <Card className="border border-primary/20 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
          <CardTitle className="flex items-center space-x-2">
            <SearchIcon className="h-5 w-5" />
            <span>Search Medical Conditions</span>
          </CardTitle>
          <CardDescription>
            Enter any disease, condition, or syndrome to find comprehensive management protocols
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="e.g., diabetes, hypertension, asthma, COVID-19..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && searchManagementInfo()}
              className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            />
            <Button 
              onClick={searchManagementInfo}
              disabled={isLoading}
              className="min-w-[120px] bg-gradient-to-r from-primary to-primary/80 hover:from-primary/80 hover:to-primary"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Searching...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <SearchIcon className="h-4 w-4" />
                  <span>Search</span>
                </div>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {managementData && (
        <div className="animate-fade-in">
          <Card className="border-2 border-primary/10 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
              <CardTitle className="text-xl flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span>Management Protocol: {managementData.condition}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="treatment" className="w-full">
                <TabsList className="grid grid-cols-6 w-full mb-6">
                  <TabsTrigger value="treatment">Treatment</TabsTrigger>
                  <TabsTrigger value="medications">Medications</TabsTrigger>
                  <TabsTrigger value="lifestyle">Lifestyle</TabsTrigger>
                  <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
                  <TabsTrigger value="complications">Complications</TabsTrigger>
                  <TabsTrigger value="prognosis">Prognosis</TabsTrigger>
                </TabsList>

                <TabsContent value="treatment">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <HeartPulseIcon className="h-5 w-5 text-primary" />
                        <span>Treatment Options</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-64">
                        <div className="space-y-3">
                          {managementData.treatmentOptions.map((option, index) => (
                            <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                              <span className="text-sm leading-relaxed">{option}</span>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="medications">
                  <Card>
                    <CardHeader>
                      <CardTitle>Pharmacological Management</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-64">
                        <div className="space-y-3">
                          {managementData.medications.map((med, index) => (
                            <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                              <span className="text-sm leading-relaxed">{med}</span>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="lifestyle">
                  <Card>
                    <CardHeader>
                      <CardTitle>Lifestyle Modifications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-64">
                        <div className="space-y-3">
                          {managementData.lifestyle.map((lifestyle, index) => (
                            <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                              <span className="text-sm leading-relaxed">{lifestyle}</span>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="monitoring">
                  <Card>
                    <CardHeader>
                      <CardTitle>Monitoring & Follow-up</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-64">
                        <div className="space-y-3">
                          {managementData.monitoring.map((monitor, index) => (
                            <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors">
                              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                              <span className="text-sm leading-relaxed">{monitor}</span>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="complications">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <AlertTriangleIcon className="h-5 w-5 text-amber-600" />
                        <span>Complications & Emergency Care</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-64">
                        <div className="space-y-3">
                          {managementData.complications.map((complication, index) => (
                            <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-amber-50 hover:bg-amber-100 transition-colors border-l-4 border-amber-300">
                              <AlertTriangleIcon className="h-4 w-4 text-amber-600 mt-1 flex-shrink-0" />
                              <span className="text-sm leading-relaxed">{complication}</span>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="prognosis">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <InfoIcon className="h-5 w-5 text-blue-600" />
                        <span>Prognosis & Outcomes</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                        <p className="text-sm leading-relaxed text-blue-900">{managementData.prognosis}</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <Separator className="my-6" />

              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                  <ExternalLinkIcon className="h-5 w-5" />
                  <span>Evidence Sources</span>
                </h3>
                <div className="grid gap-3">
                  {managementData.sources.map((source, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/30 transition-colors">
                      <div className="flex items-center space-x-3">
                        <ExternalLinkIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{source.title}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getReliabilityBadge(source.reliability)}
                        <Button variant="outline" size="sm" asChild>
                          <a href={source.url} target="_blank" rel="noopener noreferrer">
                            Visit
                          </a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};