
import { Condition } from "@/data/conditions";

// Extend Condition type to include preventionTips
declare module "@/data/conditions" {
  interface Condition {
    preventionTips?: string[];
  }
}

export interface SymptomCheckerUserData {
  age: string;
  gender: string;
  location: string;
  symptoms: string[];
  duration: number;
  familyHistory: string[];
  additionalInfo: string;
  medications: string[];
  allergies: string[];
  weight: string;
  height: string;
  pastMedicalConditions: string[];
}
