
import React, { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getSymptomsByCategory, getAllSymptoms, getSymptomById } from "@/data/symptoms";
import { conditions } from "@/data/conditions";
import { matchConditions } from "@/utils/symptomMatcher";
import ResultsDisplay from "./ResultsDisplay";
import { useToast } from "@/components/ui/use-toast";
import { Search, Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const symptomsByCategory = getSymptomsByCategory();
const allSymptoms = getAllSymptoms();

const SymptomChecker: React.FC = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    age: '',
    gender: '',
    location: '',
    symptoms: [] as string[],
    duration: 0,
  });

  // UI state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [results, setResults] = useState<ReturnType<typeof matchConditions>>([]);

  // Search symptom functionality
  const filteredSymptoms = useMemo(() => {
    if (!searchQuery && !selectedCategory) {
      return null;
    }

    return allSymptoms.filter((symptom) => {
      const matchesSearch = searchQuery 
        ? symptom.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (symptom.description && symptom.description.toLowerCase().includes(searchQuery.toLowerCase()))
        : true;
      
      const matchesCategory = selectedCategory 
        ? symptom.category === selectedCategory 
        : true;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const toggleExpandCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId) 
        : [...prev, categoryId]
    );
  };

  const handleSymptomToggle = (symptomId: string) => {
    setUserData(prev => {
      const isSelected = prev.symptoms.includes(symptomId);
      if (isSelected) {
        return {
          ...prev,
          symptoms: prev.symptoms.filter(id => id !== symptomId)
        };
      } else {
        return {
          ...prev,
          symptoms: [...prev.symptoms, symptomId]
        };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (userData.symptoms.length === 0) {
      toast({
        title: "No symptoms selected",
        description: "Please select at least one symptom to proceed.",
        variant: "destructive",
      });
      return;
    }
    
    if (!userData.age || !userData.gender || !userData.duration) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // Process the form data
    const matchedConditions = matchConditions(
      {
        ...userData,
        age: parseInt(userData.age),
        gender: userData.gender as 'male' | 'female' | 'other',
        duration: parseInt(userData.duration.toString()),
      },
      conditions
    );
    
    setResults(matchedConditions);
    setStep(2);

    // Scroll to top for results
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setUserData({
      age: '',
      gender: '',
      location: '',
      symptoms: [],
      duration: 0,
    });
    setResults([]);
    setStep(1);
    setSearchQuery('');
    setSelectedCategory(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getSelectedSymptomsDisplay = () => {
    if (userData.symptoms.length === 0) return null;
    
    return (
      <div className="mt-4 p-4 bg-medical-light bg-opacity-50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-medical-text">Selected Symptoms ({userData.symptoms.length})</h3>
          {userData.symptoms.length > 0 && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setUserData({...userData, symptoms: []})}
              className="text-xs h-7 px-2"
            >
              Clear All
            </Button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {userData.symptoms.map(symptomId => {
            const symptom = getSymptomById(symptomId);
            return symptom ? (
              <Badge 
                key={symptomId} 
                className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 py-1 pl-2 pr-1 flex items-center gap-1"
              >
                {symptom.name}
                <button 
                  onClick={() => handleSymptomToggle(symptomId)}
                  className="ml-1 rounded-full hover:bg-gray-200 p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ) : null;
          })}
        </div>
      </div>
    );
  };

  if (step === 2) {
    return <ResultsDisplay results={results} onReset={resetForm} />;
  }

  return (
    <div className="max-w-4xl mx-auto slide-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-medical-text">Advanced Symptom Checker</h2>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          Provide information about your symptoms and personal details to get possible conditions and recommendations from our database of over 100 medical conditions
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <Card className="overflow-hidden border-medical-light shadow-md">
          <div className="bg-gradient-to-r from-medical-light to-white p-4 border-b border-medical-light">
            <h3 className="text-lg font-semibold text-medical-text">Personal Information</h3>
            <p className="text-sm text-gray-500">This helps us provide more accurate results</p>
          </div>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="age" className="text-medical-text">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  value={userData.age}
                  onChange={(e) => setUserData({ ...userData, age: e.target.value })}
                  className="border-gray-300 focus:border-medical-text focus:ring-medical-light"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="gender" className="text-medical-text">Gender</Label>
                <Select
                  value={userData.gender}
                  onValueChange={(value) => setUserData({ ...userData, gender: value })}
                >
                  <SelectTrigger id="gender" className="border-gray-300 focus:border-medical-text">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location" className="text-medical-text">Location (optional)</Label>
                <Input
                  id="location"
                  placeholder="City or region"
                  value={userData.location}
                  onChange={(e) => setUserData({ ...userData, location: e.target.value })}
                  className="border-gray-300 focus:border-medical-text focus:ring-medical-light"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="duration" className="text-medical-text">How long have you had these symptoms?</Label>
                <RadioGroup 
                  value={userData.duration.toString()} 
                  onValueChange={(value) => setUserData({ ...userData, duration: parseInt(value) })}
                  className="grid grid-cols-2 gap-2 pt-2"
                >
                  <div className="flex items-center space-x-2 bg-white border border-gray-200 rounded-md p-2 hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value="1" id="duration-1" className="text-medical-text" />
                    <Label htmlFor="duration-1" className="cursor-pointer w-full">1-2 days</Label>
                  </div>
                  <div className="flex items-center space-x-2 bg-white border border-gray-200 rounded-md p-2 hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value="3" id="duration-3" className="text-medical-text" />
                    <Label htmlFor="duration-3" className="cursor-pointer w-full">3-7 days</Label>
                  </div>
                  <div className="flex items-center space-x-2 bg-white border border-gray-200 rounded-md p-2 hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value="14" id="duration-14" className="text-medical-text" />
                    <Label htmlFor="duration-14" className="cursor-pointer w-full">1-2 weeks</Label>
                  </div>
                  <div className="flex items-center space-x-2 bg-white border border-gray-200 rounded-md p-2 hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value="30" id="duration-30" className="text-medical-text" />
                    <Label htmlFor="duration-30" className="cursor-pointer w-full">Over 2 weeks</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden border-medical-light shadow-md">
          <div className="bg-gradient-to-r from-medical-light to-white p-4 border-b border-medical-light">
            <h3 className="text-lg font-semibold text-medical-text">Select Your Symptoms</h3>
            <p className="text-sm text-gray-500">Choose all symptoms you've been experiencing</p>
          </div>
          <CardContent className="p-6">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search symptoms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-gray-300 focus:border-medical-text focus:ring-medical-light"
                />
              </div>

              <div className="flex items-center mt-4 space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center">
                      <Filter className="h-4 w-4 mr-2" />
                      {selectedCategory ? 'Category: ' + symptomsByCategory.find(c => c.category.id === selectedCategory)?.category.name : 'Filter by category'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Filter by category</h4>
                      <div className="grid gap-1.5 max-h-60 overflow-y-auto pr-2">
                        <button
                          className={`text-left px-2 py-1 rounded-md text-sm hover:bg-gray-100 ${!selectedCategory ? 'bg-medical-light text-medical-text font-medium' : ''}`}
                          onClick={() => setSelectedCategory(null)}
                        >
                          All Categories
                        </button>
                        {symptomsByCategory.map(({ category }) => (
                          <button
                            key={category.id}
                            className={`text-left px-2 py-1 rounded-md text-sm hover:bg-gray-100 ${selectedCategory === category.id ? 'bg-medical-light text-medical-text font-medium' : ''}`}
                            onClick={() => setSelectedCategory(category.id)}
                          >
                            {category.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
                
                {selectedCategory && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setSelectedCategory(null)}
                    className="text-xs h-8"
                  >
                    <X className="h-3 w-3 mr-1" />
                    Clear filter
                  </Button>
                )}
              </div>

              {getSelectedSymptomsDisplay()}
            </div>
            
            <Tabs defaultValue="browse" className="mt-6">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="browse">Browse by Category</TabsTrigger>
                <TabsTrigger value="search">Search Results</TabsTrigger>
              </TabsList>
              
              <TabsContent value="browse" className="space-y-6">
                {symptomsByCategory.map(({ category, symptoms }) => (
                  <Card key={category.id} className="overflow-hidden">
                    <div 
                      className="bg-medical-light p-3 font-semibold text-medical-text flex justify-between items-center cursor-pointer"
                      onClick={() => toggleExpandCategory(category.id)}
                    >
                      <div className="flex items-center">
                        <span>{category.name}</span>
                        <span className="ml-2 text-xs bg-white text-medical-text px-1.5 py-0.5 rounded-full">
                          {symptoms.length}
                        </span>
                      </div>
                      {expandedCategories.includes(category.id) ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </div>
                    
                    {expandedCategories.includes(category.id) && (
                      <CardContent className="p-4 bg-white bg-opacity-50">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {symptoms.map((symptom) => (
                            <div key={symptom.id} className="flex items-center space-x-2 bg-white p-2 rounded-md border border-gray-100 hover:border-medical-light transition-colors">
                              <Checkbox
                                id={symptom.id}
                                checked={userData.symptoms.includes(symptom.id)}
                                onCheckedChange={() => handleSymptomToggle(symptom.id)}
                                className="text-medical-text border-gray-400"
                              />
                              <div className="flex-1">
                                <Label
                                  htmlFor={symptom.id}
                                  className="text-sm text-gray-700 cursor-pointer hover:text-medical-text font-medium"
                                >
                                  {symptom.name}
                                </Label>
                                {symptom.description && (
                                  <p className="text-xs text-gray-500 mt-0.5">{symptom.description}</p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="search">
                <div className="bg-white p-4 rounded-md border border-gray-200">
                  {filteredSymptoms && filteredSymptoms.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {filteredSymptoms.map((symptom) => (
                        <div key={symptom.id} className="flex items-center space-x-2 bg-white p-2 rounded-md border border-gray-100 hover:border-medical-light transition-colors">
                          <Checkbox
                            id={`search-${symptom.id}`}
                            checked={userData.symptoms.includes(symptom.id)}
                            onCheckedChange={() => handleSymptomToggle(symptom.id)}
                            className="text-medical-text border-gray-400"
                          />
                          <div className="flex-1">
                            <Label
                              htmlFor={`search-${symptom.id}`}
                              className="text-sm text-gray-700 cursor-pointer hover:text-medical-text font-medium"
                            >
                              {symptom.name}
                            </Label>
                            {symptom.description && (
                              <p className="text-xs text-gray-500 mt-0.5">{symptom.description}</p>
                            )}
                            <Badge className="mt-1 bg-gray-100 text-gray-600 hover:bg-gray-100 text-[10px]">
                              {symptomsByCategory.find(c => c.category.id === symptom.category)?.category.name}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : searchQuery || selectedCategory ? (
                    <div className="text-center p-6 text-gray-500">
                      <p>No symptoms found matching your search criteria.</p>
                    </div>
                  ) : (
                    <div className="text-center p-6 text-gray-500">
                      <p>Enter a search term or select a category to find symptoms.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <div className="flex justify-center">
          <Button 
            type="submit" 
            className="bg-medical-text hover:bg-medical-dark text-white px-8 shadow-md hover:shadow-lg transition-all"
            size="lg"
            disabled={userData.symptoms.length === 0}
          >
            Analyze Symptoms
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SymptomChecker;
