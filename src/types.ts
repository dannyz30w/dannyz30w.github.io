
export interface Symptom {
  id: string;
  name: string;
  description?: string;
  bodyPart?: string;
}

export interface Condition {
  id: string;
  name: string;
  description: string;
  symptoms: string[];
  severity: 'mild' | 'moderate' | 'severe';
  seekMedicalAttention: 'immediately' | 'soon' | 'if worsens' | 'self-manageable';
  preventionTips?: string[];
  ageRange?: {
    min: number;
    max: number;
  };
  gender?: 'male' | 'female' | 'any';
  typicalDuration?: number;
  familyHistoryFactors?: string[];
  relatedConditions?: string[];
  medicationConsiderations?: Array<{name: string, effect: 'positive' | 'negative'}>;
  allergyConsiderations?: string[];
}

export interface MatchedCondition {
  condition: Condition;
  matchPercentage: number;
  matchedSymptoms: string[];
  notMatchedSymptoms: string[];
  score: number;
}

export interface UserData {
  age: string;
  gender: string;
  symptoms: string[];
  duration: number;
  familyHistory: string[];
  pastMedicalConditions: string[];
  medications: string[];
  allergies: string[];
}
