import { Condition, MatchedCondition, UserData } from "@/types";
import { getSymptomById } from "@/data/symptoms";

export const matchConditions = (userData: UserData, conditions: Condition[]): MatchedCondition[] => {
  // Weight factors for different attributes - adjusted for better balance
  const WEIGHT_FACTORS = {
    AGE: 1.5,
    GENDER: 1.5,
    SYMPTOMS: 3.0,
    DURATION: 1.2,
    FAMILY_HISTORY: 1.8,
    MEDICATIONS: 1.0,
    ALLERGIES: 1.0,
    PAST_CONDITIONS: 1.5
  };

  return conditions
    .map(condition => {
      let score = 0;
      let matchedSymptoms: string[] = [];
      let notMatchedSymptoms: string[] = [];
      
      // Check symptoms - core calculation
      condition.symptoms.forEach(symptomId => {
        if (userData.symptoms.includes(symptomId)) {
          score += WEIGHT_FACTORS.SYMPTOMS;
          matchedSymptoms.push(getSymptomById(symptomId)?.name || symptomId);
        } else {
          notMatchedSymptoms.push(getSymptomById(symptomId)?.name || symptomId);
        }
      });
      
      // Age considerations - improved handling
      if (condition.ageRange && userData.age) {
        const age = Number(userData.age);
        if (!isNaN(age)) { // Make sure age is a valid number
          if (age >= condition.ageRange.min && age <= condition.ageRange.max) {
            score += WEIGHT_FACTORS.AGE;
          } else {
            // Reduce score if age is outside but close to the range
            const minDiff = Math.abs(age - condition.ageRange.min);
            const maxDiff = Math.abs(age - condition.ageRange.max);
            const closestDiff = Math.min(minDiff, maxDiff);
            
            if (closestDiff <= 5) {
              score += WEIGHT_FACTORS.AGE * (1 - closestDiff / 10);
            }
          }
        }
      }
      
      // Gender considerations - improved handling
      if (condition.gender && userData.gender) {
        if (condition.gender === 'any' || condition.gender === userData.gender) {
          score += WEIGHT_FACTORS.GENDER;
        }
      }
      
      // Duration consideration
      if (userData.duration > 0 && condition.typicalDuration) {
        // If user's reported duration is similar to typical duration
        const durationRatio = Math.min(userData.duration, condition.typicalDuration) / 
                             Math.max(userData.duration, condition.typicalDuration);
        score += WEIGHT_FACTORS.DURATION * durationRatio;
      }
      
      // Family history - improved relevance calculation
      if (condition.familyHistoryFactors && userData.familyHistory.length > 0) {
        // Count matches for better accuracy
        let familyMatchCount = 0;
        condition.familyHistoryFactors.forEach(factor => {
          if (userData.familyHistory.includes(factor)) {
            familyMatchCount++;
          }
        });
        
        // Apply a scaled score based on match count
        if (familyMatchCount > 0) {
          const familyFactorRatio = familyMatchCount / condition.familyHistoryFactors.length;
          score += WEIGHT_FACTORS.FAMILY_HISTORY * familyFactorRatio * 1.5; // Slightly boost family history factor
        }
      }
      
      // Past medical conditions - improved relevance
      if (condition.relatedConditions && userData.pastMedicalConditions.length > 0) {
        const relevantConditions = condition.relatedConditions.filter(related => 
          userData.pastMedicalConditions.includes(related)
        );
        
        if (relevantConditions.length > 0) {
          // Apply scaled score based on match count
          const conditionRatio = relevantConditions.length / condition.relatedConditions.length;
          score += WEIGHT_FACTORS.PAST_CONDITIONS * conditionRatio * 1.2; // Slight boost
        }
      }
      
      // Medications that might affect symptoms - improved handling
      if (condition.medicationConsiderations && userData.medications.length > 0) {
        let medicationEffect = 0;
        let matchesFound = false;
        
        condition.medicationConsiderations.forEach(med => {
          // More flexible matching by looking for partial matches
          const matchingMed = userData.medications.find(userMed => 
            userMed.toLowerCase().includes(med.name.toLowerCase()) ||
            med.name.toLowerCase().includes(userMed.toLowerCase())
          );
          
          if (matchingMed) {
            matchesFound = true;
            medicationEffect += med.effect === 'positive' ? 
              WEIGHT_FACTORS.MEDICATIONS : -WEIGHT_FACTORS.MEDICATIONS;
          }
        });
        
        if (matchesFound) {
          score += medicationEffect;
        }
      }
      
      // Allergies that might be relevant - improved handling
      if (condition.allergyConsiderations && userData.allergies.length > 0) {
        const relevantAllergies = condition.allergyConsiderations.filter(allergy => 
          userData.allergies.includes(allergy)
        );
        
        if (relevantAllergies.length > 0) {
          // Apply scaled score based on match count
          score += WEIGHT_FACTORS.ALLERGIES * (relevantAllergies.length / condition.allergyConsiderations.length);
        }
      }
      
      // Calculate match percentage with better balancing
      // Base score on symptoms + a weighted portion of other factors
      const symptomsMaxScore = condition.symptoms.length * WEIGHT_FACTORS.SYMPTOMS;
      const otherFactorsMaxScore = WEIGHT_FACTORS.AGE + WEIGHT_FACTORS.GENDER + WEIGHT_FACTORS.DURATION +
                                  (condition.familyHistoryFactors?.length || 0) * WEIGHT_FACTORS.FAMILY_HISTORY +
                                  (condition.relatedConditions?.length || 0) * WEIGHT_FACTORS.PAST_CONDITIONS;
                                  
      // Weight symptoms more heavily but still consider other factors
      const maxPossibleScore = symptomsMaxScore + (otherFactorsMaxScore * 0.6);
      
      // Calculate match percentage and ensure it's between 0-100
      const matchPercentage = Math.min(Math.max(Math.round((score / maxPossibleScore) * 100), 0), 100);
      
      return {
        condition,
        matchPercentage,
        matchedSymptoms,
        notMatchedSymptoms,
        score
      };
    })
    .filter(match => match.matchPercentage > 10) // Lower threshold slightly to show more potential matches
    .sort((a, b) => b.score - a.score)
    .slice(0, 6); // Show top 6 matches
};

/**
 * Returns a text description based on the medical attention level
 */
export const getMedicalAttentionText = (level: 'immediately' | 'within24Hours' | 'withinWeek' | 'selfCare'): string => {
  switch (level) {
    case 'immediately':
      return 'Seek Medical Attention Immediately';
    case 'within24Hours':
      return 'Seek Medical Attention Soon';
    case 'withinWeek':
      return 'Seek Medical Attention If Symptoms Worsen';
    case 'selfCare':
      return 'Self-Manageable Condition';
    default:
      return 'Consult with a Healthcare Provider';
  }
};

/**
 * Returns the appropriate color class based on the medical attention level
 */
export const getMedicalAttentionColor = (level: 'immediately' | 'within24Hours' | 'withinWeek' | 'selfCare'): string => {
  switch (level) {
    case 'immediately':
      return 'bg-red-600';
    case 'within24Hours':
      return 'bg-orange-500';
    case 'withinWeek':
      return 'bg-yellow-500';
    case 'selfCare':
      return 'bg-green-500';
    default:
      return 'bg-blue-500';
  }
};

/**
 * Returns the appropriate color class based on condition severity
 */
export const getSeverityColor = (severity: 'mild' | 'moderate' | 'severe'): string => {
  switch (severity) {
    case 'mild':
      return 'bg-green-100 text-green-700';
    case 'moderate':
      return 'bg-yellow-100 text-yellow-700';
    case 'severe':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};
