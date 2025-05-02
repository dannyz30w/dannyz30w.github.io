
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getSymptomsByCategory } from "@/data/symptoms";
import { conditions } from "@/data/conditions";
import { matchConditions } from "@/utils/symptomMatcher";
import ResultsDisplay from "./ResultsDisplay";
import { useToast } from "@/components/ui/use-toast";

const symptomsByCategory = getSymptomsByCategory();

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
  const [results, setResults] = useState<ReturnType<typeof matchConditions>>([]);

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
  };

  if (step === 2) {
    return <ResultsDisplay results={results} onReset={resetForm} />;
  }

  return (
    <div className="max-w-3xl mx-auto slide-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-medical-text">Symptom Checker</h2>
        <p className="text-gray-600 mt-2">
          Provide information about your symptoms to get possible conditions and recommendations
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              placeholder="Enter your age"
              value={userData.age}
              onChange={(e) => setUserData({ ...userData, age: e.target.value })}
              required
            />
          </div>
          
          <div className="space-y-4">
            <Label htmlFor="gender">Gender</Label>
            <Select
              value={userData.gender}
              onValueChange={(value) => setUserData({ ...userData, gender: value })}
            >
              <SelectTrigger id="gender">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-4">
            <Label htmlFor="location">Location (optional)</Label>
            <Input
              id="location"
              placeholder="City or region"
              value={userData.location}
              onChange={(e) => setUserData({ ...userData, location: e.target.value })}
            />
          </div>
          
          <div className="space-y-4">
            <Label htmlFor="duration">How long have you had these symptoms?</Label>
            <RadioGroup 
              value={userData.duration.toString()} 
              onValueChange={(value) => setUserData({ ...userData, duration: parseInt(value) })}
              className="grid grid-cols-2 gap-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1" id="duration-1" />
                <Label htmlFor="duration-1">1-2 days</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="3" id="duration-3" />
                <Label htmlFor="duration-3">3-7 days</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="14" id="duration-14" />
                <Label htmlFor="duration-14">1-2 weeks</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="30" id="duration-30" />
                <Label htmlFor="duration-30">Over 2 weeks</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        
        <div className="space-y-4">
          <Label>Select your symptoms:</Label>
          
          <div className="space-y-6">
            {symptomsByCategory.map(({ category, symptoms }) => (
              <Card key={category.id} className="overflow-hidden">
                <div className="bg-medical-light p-3 font-semibold text-medical-text">
                  {category.name}
                </div>
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {symptoms.map((symptom) => (
                      <div key={symptom.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={symptom.id}
                          checked={userData.symptoms.includes(symptom.id)}
                          onCheckedChange={() => handleSymptomToggle(symptom.id)}
                        />
                        <Label
                          htmlFor={symptom.id}
                          className="text-sm text-gray-700 cursor-pointer hover:text-medical-text"
                        >
                          {symptom.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="flex justify-center">
          <Button 
            type="submit" 
            className="bg-medical-text hover:bg-medical-dark text-white px-8"
            size="lg"
          >
            Check Symptoms
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SymptomChecker;
