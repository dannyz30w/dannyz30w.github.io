
import React, { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { getSymptomsByCategory, getAllSymptoms, getSymptomById } from "@/data/symptoms";
import { conditions } from "@/data/conditions";
import { matchConditions } from "@/utils/symptomMatcher";
import ResultsDisplay from "./ResultsDisplay";
import { useToast } from "@/components/ui/use-toast";
import { Search, Filter, X, ChevronDown, ChevronUp, PlusCircle, InfoIcon, Users } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
    familyHistory: [] as string[],
    additionalInfo: '',
    medications: [] as string[],
    allergies: [] as string[],
    weight: '',
    height: '',
    pastMedicalConditions: [] as string[],
  });

  // UI state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [results, setResults] = useState<ReturnType<typeof matchConditions>>([]);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [medicationInput, setMedicationInput] = useState('');
  const [allergyInput, setAllergyInput] = useState('');
  const [conditionInput, setConditionInput] = useState('');
  const [seenSymptomIds, setSeenSymptomIds] = useState(new Set<string>());

  // Search symptom functionality with deduplication
  const filteredSymptoms = useMemo(() => {
    if (!searchQuery && !selectedCategory) {
      return null;
    }
    
    setSeenSymptomIds(new Set<string>());
    
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
  
  const handleFamilyHistoryToggle = (condition: string) => {
    setUserData(prev => {
      const isSelected = prev.familyHistory.includes(condition);
      if (isSelected) {
        return {
          ...prev,
          familyHistory: prev.familyHistory.filter(c => c !== condition)
        };
      } else {
        return {
          ...prev,
          familyHistory: [...prev.familyHistory, condition]
        };
      }
    });
  };
  
  const addMedication = () => {
    if (medicationInput.trim()) {
      setUserData(prev => ({
        ...prev,
        medications: [...prev.medications, medicationInput.trim()]
      }));
      setMedicationInput('');
    }
  };
  
  const removeMedication = (med: string) => {
    setUserData(prev => ({
      ...prev,
      medications: prev.medications.filter(m => m !== med)
    }));
  };
  
  const addAllergy = () => {
    if (allergyInput.trim()) {
      setUserData(prev => ({
        ...prev,
        allergies: [...prev.allergies, allergyInput.trim()]
      }));
      setAllergyInput('');
    }
  };
  
  const removeAllergy = (allergy: string) => {
    setUserData(prev => ({
      ...prev,
      allergies: prev.allergies.filter(a => a !== allergy)
    }));
  };
  
  const addMedicalCondition = () => {
    if (conditionInput.trim()) {
      setUserData(prev => ({
        ...prev,
        pastMedicalConditions: [...prev.pastMedicalConditions, conditionInput.trim()]
      }));
      setConditionInput('');
    }
  };
  
  const removeMedicalCondition = (condition: string) => {
    setUserData(prev => ({
      ...prev, 
      pastMedicalConditions: prev.pastMedicalConditions.filter(c => c !== condition)
    }));
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
    
    if (!userData.age || !userData.gender) {
      toast({
        title: "Missing required information",
        description: "Please enter your age and gender to proceed.",
        variant: "destructive",
      });
      return;
    }
    
    // Default duration if not selected
    const duration = userData.duration || 3;
    
    // Process the form data
    const matchedConditions = matchConditions(
      {
        ...userData,
        age: parseInt(userData.age),
        gender: userData.gender as 'male' | 'female' | 'other',
        duration: duration,
      },
      conditions
    );
    
    if (matchedConditions.length === 0) {
      toast({
        title: "No matches found",
        description: "Try adding more symptoms or details for better results.",
        variant: "warning",
      });
    }
    
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
      familyHistory: [],
      additionalInfo: '',
      medications: [],
      allergies: [],
      weight: '',
      height: '',
      pastMedicalConditions: [],
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
  
  const commonConditions = useMemo(() => {
    return [
      "Heart Disease", 
      "Diabetes", 
      "Cancer (specify type)", 
      "High Blood Pressure",
      "Stroke", 
      "Asthma", 
      "Alzheimer's Disease",
      "Arthritis",
      "Kidney Disease",
      "Depression or Anxiety",
      "Thyroid Disorders"
    ];
  }, []);

  // Helper function to prevent duplicate symptoms in search results
  const renderUniqueSymptoms = (symptoms: typeof allSymptoms) => {
    const uniqueSymptoms = new Set<string>();
    
    return symptoms.map((symptom) => {
      // Skip if we've seen this symptom id before
      if (uniqueSymptoms.has(symptom.id)) {
        return null;
      }
      
      // Mark as seen
      uniqueSymptoms.add(symptom.id);
      
      return (
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
              {symptomsByCategory.find(c => c.category.id === symptom.category)?.category.name || 'General'}
            </Badge>
          </div>
        </div>
      );
    }).filter(Boolean); // Remove null items
  };

  if (step === 2) {
    return <ResultsDisplay results={results} userData={userData} onReset={resetForm} />;
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
                <Label htmlFor="age" className="text-medical-text flex items-center gap-1">
                  Age <span className="text-red-500">*</span>
                </Label>
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
                <Label htmlFor="gender" className="text-medical-text flex items-center gap-1">
                  Gender <span className="text-red-500">*</span>
                </Label>
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
              
              <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row items-center justify-between mt-2 pt-4 border-t border-gray-200">
                <div className="flex items-center">
                  <span className="text-medical-text font-medium mr-2">Additional Health Information</span>
                  <Switch 
                    checked={showAdvancedOptions} 
                    onCheckedChange={setShowAdvancedOptions} 
                    className="data-[state=checked]:bg-medical-text"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1 md:mt-0">
                  Providing more details helps improve the accuracy of your results
                </p>
              </div>
            </div>
            
            {showAdvancedOptions && (
              <div className="mt-6 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="height" className="text-medical-text">Height (cm/ft)</Label>
                  <Input
                    id="height"
                    placeholder="Height"
                    value={userData.height}
                    onChange={(e) => setUserData({ ...userData, height: e.target.value })}
                    className="border-gray-300 focus:border-medical-text"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="weight" className="text-medical-text">Weight (kg/lbs)</Label>
                  <Input
                    id="weight"
                    placeholder="Weight"
                    value={userData.weight}
                    onChange={(e) => setUserData({ ...userData, weight: e.target.value })}
                    className="border-gray-300 focus:border-medical-text"
                  />
                </div>
                
                <div className="space-y-2 col-span-1 md:col-span-2">
                  <div className="flex justify-between items-center">
                    <Label className="text-medical-text">Current Medications</Label>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Add medication"
                        value={medicationInput}
                        onChange={(e) => setMedicationInput(e.target.value)}
                        className="border-gray-300 focus:border-medical-text text-sm w-48 md:w-64"
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={addMedication}
                        disabled={!medicationInput.trim()}
                        className="text-medical-text"
                      >
                        <PlusCircle className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {userData.medications.length === 0 ? (
                      <p className="text-sm text-gray-500">No medications added</p>
                    ) : (
                      userData.medications.map((med, idx) => (
                        <Badge 
                          key={idx} 
                          className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 py-1 pl-2 pr-1 flex items-center gap-1"
                        >
                          {med}
                          <button 
                            onClick={() => removeMedication(med)}
                            className="ml-1 rounded-full hover:bg-gray-200 p-0.5"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))
                    )}
                  </div>
                </div>
                
                <div className="space-y-2 col-span-1 md:col-span-2">
                  <div className="flex justify-between items-center">
                    <Label className="text-medical-text">Allergies</Label>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Add allergy"
                        value={allergyInput}
                        onChange={(e) => setAllergyInput(e.target.value)}
                        className="border-gray-300 focus:border-medical-text text-sm w-48 md:w-64"
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={addAllergy}
                        disabled={!allergyInput.trim()}
                        className="text-medical-text"
                      >
                        <PlusCircle className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {userData.allergies.length === 0 ? (
                      <p className="text-sm text-gray-500">No allergies added</p>
                    ) : (
                      userData.allergies.map((allergy, idx) => (
                        <Badge 
                          key={idx} 
                          className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 py-1 pl-2 pr-1 flex items-center gap-1"
                        >
                          {allergy}
                          <button 
                            onClick={() => removeAllergy(allergy)}
                            className="ml-1 rounded-full hover:bg-gray-200 p-0.5"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))
                    )}
                  </div>
                </div>
                
                <div className="space-y-2 col-span-1 md:col-span-2">
                  <div className="flex justify-between items-center">
                    <Label className="text-medical-text">Past Medical Conditions</Label>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Add condition"
                        value={conditionInput}
                        onChange={(e) => setConditionInput(e.target.value)}
                        className="border-gray-300 focus:border-medical-text text-sm w-48 md:w-64"
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={addMedicalCondition}
                        disabled={!conditionInput.trim()}
                        className="text-medical-text"
                      >
                        <PlusCircle className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {userData.pastMedicalConditions.length === 0 ? (
                      <p className="text-sm text-gray-500">No past conditions added</p>
                    ) : (
                      userData.pastMedicalConditions.map((condition, idx) => (
                        <Badge 
                          key={idx} 
                          className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 py-1 pl-2 pr-1 flex items-center gap-1"
                        >
                          {condition}
                          <button 
                            onClick={() => removeMedicalCondition(condition)}
                            className="ml-1 rounded-full hover:bg-gray-200 p-0.5"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden border-medical-light shadow-md">
          <div className="bg-gradient-to-r from-medical-light to-white p-4 border-b border-medical-light flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-medical-text">Family Medical History <span className="text-sm font-normal text-gray-500">(Optional)</span></h3>
              <p className="text-sm text-gray-500">Select conditions that run in your family</p>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="p-1 rounded-full bg-medical-light/50">
                    <InfoIcon className="h-5 w-5 text-medical-text" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs text-sm">Family history can significantly affect your risk for certain conditions. Including this information helps provide more accurate results.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {commonConditions.map((condition, idx) => (
                <div key={idx} className="flex items-center space-x-2 bg-white p-2 rounded-md border border-gray-100 hover:border-medical-light transition-colors">
                  <Checkbox
                    id={`family-${idx}`}
                    checked={userData.familyHistory.includes(condition)}
                    onCheckedChange={() => handleFamilyHistoryToggle(condition)}
                    className="text-medical-text border-gray-400"
                  />
                  <Label
                    htmlFor={`family-${idx}`}
                    className="text-sm text-gray-700 cursor-pointer hover:text-medical-text flex-1"
                  >
                    {condition}
                  </Label>
                  {condition === "Cancer (specify type)" && userData.familyHistory.includes(condition) && (
                    <Input 
                      value={userData.additionalInfo} 
                      onChange={(e) => setUserData({...userData, additionalInfo: e.target.value})} 
                      className="ml-2 h-7 text-xs w-24" 
                      placeholder="Type..." 
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Label htmlFor="additional-family-info" className="text-medical-text">Additional Family Health Information</Label>
              <Textarea
                id="additional-family-info"
                placeholder="Add any other relevant family medical history (e.g., age of onset, affected family members)"
                value={userData.additionalInfo}
                onChange={(e) => setUserData({ ...userData, additionalInfo: e.target.value })}
                className="mt-2 border-gray-300 focus:border-medical-text focus:ring-medical-light h-20"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-medical-light shadow-md">
          <div className="bg-gradient-to-r from-medical-light to-white p-4 border-b border-medical-light">
            <h3 className="text-lg font-semibold text-medical-text">Select Your Symptoms <span className="text-red-500">*</span></h3>
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
                      <ScrollArea className="h-60">
                        <div className="grid gap-1.5 pr-2">
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
                      </ScrollArea>
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
                <Accordion type="multiple" className="w-full">
                  {symptomsByCategory.map(({ category, symptoms }) => (
                    <AccordionItem key={category.id} value={category.id}>
                      <AccordionTrigger className="py-3 px-4 bg-medical-light text-medical-text hover:no-underline hover:bg-medical-light/80 rounded-t-md font-medium">
                        <div className="flex items-center">
                          <span>{category.name}</span>
                          <span className="ml-2 text-xs bg-white text-medical-text px-1.5 py-0.5 rounded-full">
                            {symptoms.length}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="p-0 pt-2 bg-white bg-opacity-50 border border-t-0 border-gray-100 rounded-b-md">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3">
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
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
              
              <TabsContent value="search">
                <div className="bg-white p-4 rounded-md border border-gray-200">
                  {filteredSymptoms && filteredSymptoms.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {renderUniqueSymptoms(filteredSymptoms)}
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

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex items-start">
                <InfoIcon className="h-5 w-5 text-blue-500 mt-0.5 mr-2" />
                <div>
                  <h4 className="font-medium text-blue-700">Required Fields</h4>
                  <p className="text-sm text-blue-600">Age, Gender, and at least one Symptom are required to analyze your symptoms. All other fields are optional but help improve accuracy.</p>
                </div>
              </div>
            </div>
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
