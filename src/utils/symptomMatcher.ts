
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
    
    // Weight the symptom match heavily (up to 65 points)
    score += symptomPercentage * 65;
    
    // Age match (up to 10 points)
    const ageMatch = condition.riskFactors?.age 
      ? isAgeInRange(userData.age, condition.riskFactors.age) 
      : true;
    if (ageMatch) score += 10;
    
    // Gender match (up to 10 points)
    const genderMatch = condition.riskFactors?.gender 
      ? condition.riskFactors.gender === userData.gender || condition.riskFactors.gender === 'any' 
      : true;
    if (genderMatch) score += 10;

    // Adjust score for severity considering symptom duration
    if (userData.duration > 14 && condition.severity === 'mild') {
      score -= 10; // Reduce score for mild conditions if symptoms persisted long
    } else if (userData.duration < 2 && condition.severity === 'severe') {
      score -= 5; // Slightly reduce score for severe conditions if symptoms just started
    } else if (userData.duration > 30 && condition.severity === 'severe') {
      score += 5; // Increase score for severe conditions if symptoms have persisted for a long time
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
    
    // Past medical conditions consideration (up to 7 points)
    if (userData.pastMedicalConditions && userData.pastMedicalConditions.length > 0) {
      const relatedConditionMatch = userData.pastMedicalConditions.some(pastCondition => {
        const pastConditionLower = pastCondition.toLowerCase();
        // Check if condition name or description contains the past condition
        const nameMatch = condition.name.toLowerCase().includes(pastConditionLower);
        const descriptionMatch = condition.description ? 
          condition.description.toLowerCase().includes(pastConditionLower) : false;
          
        // Check if there are related conditions (like diabetes and heart disease)
        const relatedConditions = getRelatedConditions(pastConditionLower);
        const relatedMatch = relatedConditions.some(related => 
          condition.name.toLowerCase().includes(related) || 
          (condition.description && condition.description.toLowerCase().includes(related))
        );
        
        return nameMatch || descriptionMatch || relatedMatch;
      });
      
      if (relatedConditionMatch) {
        score += 7;
      }
    }
    
    // Medications consideration (up to 5 points)
    if (userData.medications && userData.medications.length > 0) {
      // Some medications could indicate certain conditions are already being treated
      const medicationRelatedCondition = userData.medications.some(med => {
        const medLower = med.toLowerCase();
        const conditionRelatedToMed = getMedicationRelatedConditions(medLower);
        
        return conditionRelatedToMed.some(related => 
          condition.name.toLowerCase().includes(related.toLowerCase())
        );
      });
      
      if (medicationRelatedCondition) {
        score += 5;
      }
    }
    
    // Allergies consideration (up to 3 points)
    if (userData.allergies && userData.allergies.length > 0 && 
        (condition.name.toLowerCase().includes('allerg') || 
         condition.name.toLowerCase().includes('asthma') || 
         condition.name.toLowerCase().includes('immun'))) {
      score += 3;
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

// Helper function to get related conditions for common comorbidities
function getRelatedConditions(condition: string): string[] {
  const comorbidityMap: Record<string, string[]> = {
    'diabetes': ['heart disease', 'kidney disease', 'neuropathy', 'retinopathy'],
    'hypertension': ['heart disease', 'stroke', 'kidney disease'],
    'heart disease': ['hypertension', 'diabetes', 'high cholesterol'],
    'asthma': ['copd', 'bronchitis', 'respiratory', 'allergy'],
    'depression': ['anxiety', 'insomnia', 'bipolar'],
    'arthritis': ['osteoporosis', 'inflammation', 'autoimmune'],
    'obesity': ['diabetes', 'heart disease', 'sleep apnea', 'hypertension'],
    'cancer': ['anemia', 'immune', 'fatigue'],
  };
  
  // Find potential related conditions
  for (const [key, relatedList] of Object.entries(comorbidityMap)) {
    if (condition.includes(key)) {
      return relatedList;
    }
  }
  
  return [];
}

// Helper function to get conditions that might be associated with certain medications
function getMedicationRelatedConditions(medication: string): string[] {
  const medicationMap: Record<string, string[]> = {
    'lisinopril': ['hypertension', 'heart disease'],
    'atorvastatin': ['high cholesterol', 'heart disease'],
    'lipitor': ['high cholesterol', 'heart disease'],
    'metformin': ['diabetes'],
    'albuterol': ['asthma', 'copd', 'respiratory'],
    'ventolin': ['asthma', 'copd', 'respiratory'],
    'levothyroxine': ['hypothyroidism', 'thyroid'],
    'synthroid': ['hypothyroidism', 'thyroid'],
    'insulin': ['diabetes'],
    'sertraline': ['depression', 'anxiety'],
    'zoloft': ['depression', 'anxiety'],
    'fluoxetine': ['depression', 'anxiety'],
    'prozac': ['depression', 'anxiety'],
    'ibuprofen': ['pain', 'inflammation', 'arthritis'],
    'advil': ['pain', 'inflammation', 'arthritis'],
    'acetaminophen': ['pain', 'fever'],
    'tylenol': ['pain', 'fever'],
    'omeprazole': ['gerd', 'acid reflux', 'ulcer'],
    'prilosec': ['gerd', 'acid reflux', 'ulcer'],
    'warfarin': ['blood clot', 'stroke prevention', 'atrial fibrillation'],
    'coumadin': ['blood clot', 'stroke prevention', 'atrial fibrillation'],
    'prednisone': ['inflammation', 'autoimmune', 'allergic', 'asthma'],
  };
  
  // Look for medication matches
  for (const [key, conditionList] of Object.entries(medicationMap)) {
    if (medication.includes(key)) {
      return conditionList;
    }
  }
  
  return [];
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
