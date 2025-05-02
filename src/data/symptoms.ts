export type Symptom = {
  id: string;
  name: string;
  category: string;
  description?: string;
};

export const symptoms: Symptom[] = [
  // General symptoms
  { id: 'fever', name: 'Fever', category: 'general', description: 'Elevated body temperature above normal range' },
  { id: 'fatigue', name: 'Fatigue', category: 'general', description: 'Feeling of tiredness or lack of energy' },
  { id: 'weakness', name: 'General weakness', category: 'general', description: 'Overall feeling of weakness or lack of strength' },
  { id: 'malaise', name: 'Malaise', category: 'general', description: 'General feeling of discomfort or illness' },
  { id: 'weight_loss', name: 'Unexplained weight loss', category: 'general', description: 'Loss of weight without trying' },
  { id: 'weight_gain', name: 'Unexplained weight gain', category: 'general', description: 'Gain of weight without changes in diet or exercise' },
  
  // Head and neurological symptoms
  { id: 'headache', name: 'Headache', category: 'head', description: 'Pain in any region of the head' },
  { id: 'dizziness', name: 'Dizziness', category: 'head', description: 'Feeling lightheaded or unbalanced' },
  { id: 'migraine', name: 'Migraine', category: 'head', description: 'Severe, throbbing headache often accompanied by nausea' },
  { id: 'confusion', name: 'Confusion', category: 'head', description: 'Impaired ability to think clearly' },
  
  // Respiratory symptoms
  { id: 'cough', name: 'Cough', category: 'respiratory', description: 'Sudden expulsion of air from the lungs' },
  { id: 'shortness_of_breath', name: 'Shortness of breath', category: 'respiratory', description: 'Difficulty breathing or feeling breathless' },
  { id: 'sore_throat', name: 'Sore throat', category: 'respiratory', description: 'Pain or irritation in the throat' },
  { id: 'runny_nose', name: 'Runny nose', category: 'respiratory', description: 'Excess nasal drainage' },
  { id: 'congestion', name: 'Nasal congestion', category: 'respiratory', description: 'Stuffy or blocked nose' },
  
  // Digestive symptoms
  { id: 'nausea', name: 'Nausea', category: 'digestive', description: 'Feeling of discomfort in the stomach with an urge to vomit' },
  { id: 'vomiting', name: 'Vomiting', category: 'digestive', description: 'Forceful expulsion of stomach contents through the mouth' },
  { id: 'diarrhea', name: 'Diarrhea', category: 'digestive', description: 'Loose, watery bowel movements' },
  { id: 'constipation', name: 'Constipation', category: 'digestive', description: 'Difficulty passing stool or infrequent bowel movements' },
  { id: 'abdominal_pain', name: 'Abdominal pain', category: 'digestive', description: 'Pain in the area between the chest and groin' },
  { id: 'bloating', name: 'Bloating', category: 'digestive', description: 'Sensation of fullness or swelling in the abdomen' },
  
  // Skin symptoms
  { id: 'rash', name: 'Skin rash', category: 'skin', description: 'Area of irritated or swollen skin' },
  { id: 'itching', name: 'Itching', category: 'skin', description: 'Irritating sensation causing desire to scratch' },
  { id: 'hives', name: 'Hives', category: 'skin', description: 'Raised, itchy welts on the skin' },
  
  // Musculoskeletal symptoms
  { id: 'joint_pain', name: 'Joint pain', category: 'musculoskeletal', description: 'Discomfort in one or more joints' },
  { id: 'muscle_pain', name: 'Muscle pain', category: 'musculoskeletal', description: 'Pain affecting one or more muscles' },
  { id: 'back_pain', name: 'Back pain', category: 'musculoskeletal', description: 'Discomfort in the upper, middle, or lower back' },
  
  // Other symptoms
  { id: 'chills', name: 'Chills', category: 'other', description: 'Feeling of cold with shivering' },
  { id: 'night_sweats', name: 'Night sweats', category: 'other', description: 'Excessive sweating during sleep' },
  { id: 'chest_pain', name: 'Chest pain', category: 'other', description: 'Pain or discomfort in the chest area' }
];

export const symptomCategories = [
  { id: 'general', name: 'General Symptoms' },
  { id: 'head', name: 'Head & Neurological' },
  { id: 'respiratory', name: 'Respiratory' },
  { id: 'digestive', name: 'Digestive' },
  { id: 'skin', name: 'Skin' },
  { id: 'musculoskeletal', name: 'Musculoskeletal' },
  { id: 'other', name: 'Other Symptoms' },
];

export function getSymptomsByCategory() {
  return symptomCategories.map(category => ({
    category,
    symptoms: symptoms.filter(symptom => symptom.category === category.id)
  }));
}
