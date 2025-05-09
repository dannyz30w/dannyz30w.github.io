import { Condition, MatchedCondition, UserData } from "@/types";
import { getSymptomById } from "@/data/symptoms";

export const matchConditions = (userData: UserData, conditions: Condition[]): MatchedCondition[] => {
  // Weight factors for different attributes
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
      
      // Check symptoms
      condition.symptoms.forEach(symptomId => {
        if (userData.symptoms.includes(symptomId)) {
          score += WEIGHT_FACTORS.SYMPTOMS;
          matchedSymptoms.push(getSymptomById(symptomId)?.name || symptomId);
        } else {
          notMatchedSymptoms.push(getSymptomById(symptomId)?.name || symptomId);
        }
      });
      
      // Age considerations
      if (condition.ageRange) {
        const age = Number(userData.age);
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
      
      // Gender considerations
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
      
      // Family history
      if (condition.familyHistoryFactors && userData.familyHistory.length > 0) {
        condition.familyHistoryFactors.forEach(factor => {
          if (userData.familyHistory.includes(factor)) {
            score += WEIGHT_FACTORS.FAMILY_HISTORY;
          }
        });
      }
      
      // Past medical conditions
      if (condition.relatedConditions && userData.pastMedicalConditions.length > 0) {
        condition.relatedConditions.forEach(related => {
          if (userData.pastMedicalConditions.includes(related)) {
            score += WEIGHT_FACTORS.PAST_CONDITIONS;
          }
        });
      }
      
      // Medications that might affect symptoms
      if (condition.medicationConsiderations && userData.medications.length > 0) {
        let medicationEffect = 0;
        condition.medicationConsiderations.forEach(med => {
          if (userData.medications.some(userMed => userMed.toLowerCase().includes(med.toLowerCase()))) {
            medicationEffect += med.effect === 'positive' ? WEIGHT_FACTORS.MEDICATIONS : -WEIGHT_FACTORS.MEDICATIONS;
          }
        });
        score += medicationEffect;
      }
      
      // Allergies that might be relevant
      if (condition.allergyConsiderations && userData.allergies.length > 0) {
        condition.allergyConsiderations.forEach(allergy => {
          if (userData.allergies.includes(allergy)) {
            score += WEIGHT_FACTORS.ALLERGIES;
          }
        });
      }
      
      // Calculate match percentage
      const maxPossibleScore = condition.symptoms.length * WEIGHT_FACTORS.SYMPTOMS + 
                              WEIGHT_FACTORS.AGE + 
                              WEIGHT_FACTORS.GENDER +
                              WEIGHT_FACTORS.DURATION;
      
      const matchPercentage = Math.min(Math.round((score / maxPossibleScore) * 100), 100);
      
      return {
        condition,
        matchPercentage,
        matchedSymptoms,
        notMatchedSymptoms,
        score
      };
    })
    .filter(match => match.matchPercentage > 15)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);
};
