
import { Condition } from '@/data/conditions';

interface UserData {
  age: number;
  gender: 'male' | 'female' | 'other';
  location: string;
  symptoms: string[];
  duration: number;
  familyHistory?: string[];
  additionalInfo?: string;
  medications?: string[];
  allergies?: string[];
  weight?: string;
  height?: string;
  pastMedicalConditions?: string[];
}

export function matchConditions(userData: UserData, conditionsList: Condition[]): {
  condition: Condition,
  matchScore: number
}[] {
  const results = conditionsList.map((condition, index) => {
    let score = 0;
    const symptomMatchCount = condition.symptoms.filter(symptom => 
      userData.symptoms.includes(symptom)
    ).length;
    
    // If no symptoms match, return null immediately
    if (symptomMatchCount === 0) {
      return null;
    }
    
    // Calculate symptom match percentage
    const symptomPercentage = condition.symptoms.length > 0 
      ? (symptomMatchCount / condition.symptoms.length) 
      : 0;
    
    // Weight the symptom match heavily (up to 70 points)
    score += symptomPercentage * 70;
    
    // Age match (up to 15 points)
    const ageMatch = condition.riskFactors?.age 
      ? isAgeInRange(userData.age, condition.riskFactors.age) 
      : true;
    if (ageMatch) score += 15;
    
    // Gender match (up to 15 points)
    const genderMatch = condition.riskFactors?.gender 
      ? condition.riskFactors.gender === userData.gender || condition.riskFactors.gender === 'any' 
      : true;
    if (genderMatch) score += 15;

    // Adjust score for severity considering symptom duration
    if (userData.duration > 14 && condition.severity === 'mild') {
      score -= 10; // Reduce score for mild conditions if symptoms persisted long
    } else if (userData.duration < 2 && condition.severity === 'severe') {
      score -= 5; // Slightly reduce score for severe conditions if symptoms just started
    }
    
    // Family history match bonus (up to 10 extra points)
    if (userData.familyHistory && userData.familyHistory.length > 0) {
      const familyHistoryMatch = userData.familyHistory.some(historyItem => 
        condition.name.toLowerCase().includes(historyItem.toLowerCase()) ||
        (condition.description && condition.description.toLowerCase().includes(historyItem.toLowerCase()))
      );
      
      if (familyHistoryMatch) {
        score += 10;
      }
    }
    
    // Past medical conditions consideration
    if (userData.pastMedicalConditions && userData.pastMedicalConditions.length > 0) {
      const relatedConditionMatch = userData.pastMedicalConditions.some(pastCondition => {
        const pastConditionLower = pastCondition.toLowerCase();
        return condition.name.toLowerCase().includes(pastConditionLower);
      });
      
      if (relatedConditionMatch) {
        score += 5;
      }
    }
    
    // Only return conditions with a reasonable match
    if (score > 30) {
      return {
        condition,
        matchScore: Math.min(score, 100) // Cap at 100
      };
    }
    return null;
  }).filter(Boolean) as { condition: Condition, matchScore: number }[];
  
  // Sort by match score (highest first) and ensure no duplicate conditions
  const uniqueResults = Array.from(new Map(results.map(item => 
    [item.condition.id, item]
  )).values());
  
  return uniqueResults.sort((a, b) => b.matchScore - a.matchScore);
}

function isAgeInRange(age: number, range: {min?: number, max?: number}): boolean {
  const minMatch = range.min === undefined || age >= range.min;
  const maxMatch = range.max === undefined || age <= range.max;
  return minMatch && maxMatch;
}

export function getSeverityColor(severity: Condition['severity']) {
  switch (severity) {
    case 'mild':
      return 'text-green-600';
    case 'moderate':
      return 'text-medical-warning';
    case 'severe':
      return 'text-medical-danger';
    default:
      return 'text-medical-text';
  }
}

export function getMedicalAttentionText(level: Condition['seekMedicalAttention']) {
  switch (level) {
    case 'immediately':
      return 'Seek emergency medical care immediately';
    case 'within24Hours':
      return 'Consult a healthcare provider within 24 hours';
    case 'withinWeek':
      return 'Make an appointment with a healthcare provider within a week';
    case 'selfCare':
      return 'Self-care at home is typically sufficient';
    default:
      return 'Consult a healthcare provider';
  }
}

export function getMedicalAttentionColor(level: Condition['seekMedicalAttention']) {
  switch (level) {
    case 'immediately':
      return 'bg-red-600';
    case 'within24Hours':
      return 'bg-orange-500';
    case 'withinWeek':
      return 'bg-yellow-500';
    case 'selfCare':
      return 'bg-green-600';
    default:
      return 'bg-medical-dark';
  }
}
