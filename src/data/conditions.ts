
export interface Condition {
  id: string;
  name: string;
  description: string;
  symptoms: string[];
  riskFactors: {
    age?: {min?: number; max?: number};
    gender?: 'male' | 'female' | 'any';
    regions?: string[];
  };
  severity: 'mild' | 'moderate' | 'severe';
  recommendations: string[];
  seekMedicalAttention: 'immediately' | 'within24Hours' | 'withinWeek' | 'selfCare';
}

export const conditions: Condition[] = [
  {
    id: 'common_cold',
    name: 'Common Cold',
    description: 'A viral infection of the upper respiratory tract that causes inflammation of the nasal passages and throat.',
    symptoms: ['runny_nose', 'congestion', 'sore_throat', 'cough', 'fatigue'],
    riskFactors: {
      age: { min: 0, max: 120 },
      gender: 'any',
    },
    severity: 'mild',
    recommendations: [
      'Rest as much as possible',
      'Stay hydrated by drinking plenty of fluids',
      'Use over-the-counter cold medications for symptom relief',
      'Use a humidifier to add moisture to the air',
      'Gargle with salt water to soothe a sore throat'
    ],
    seekMedicalAttention: 'selfCare'
  },
  {
    id: 'influenza',
    name: 'Influenza (Flu)',
    description: 'A contagious respiratory illness caused by influenza viruses that infect the nose, throat, and lungs.',
    symptoms: ['fever', 'cough', 'sore_throat', 'body_aches', 'fatigue', 'headache', 'chills'],
    riskFactors: {
      age: { min: 0, max: 120 },
      gender: 'any',
    },
    severity: 'moderate',
    recommendations: [
      'Rest and stay home to prevent spreading the virus',
      'Drink plenty of fluids',
      'Take over-the-counter medications for symptom relief',
      'Consider antiviral medications if within 48 hours of symptom onset',
      'Monitor for worsening symptoms'
    ],
    seekMedicalAttention: 'within24Hours'
  },
  {
    id: 'migraine',
    name: 'Migraine',
    description: 'A neurological condition characterized by intense, debilitating headaches often accompanied by other symptoms.',
    symptoms: ['headache', 'migraine', 'nausea', 'sensitivity_to_light', 'dizziness'],
    riskFactors: {
      age: { min: 10, max: 60 },
      gender: 'female', // Though anyone can get migraines, they're more common in females
    },
    severity: 'moderate',
    recommendations: [
      'Rest in a quiet, dark room',
      'Place a cold compress on your forehead',
      'Try over-the-counter pain relievers',
      'Stay hydrated',
      'Keep track of triggers in a migraine journal'
    ],
    seekMedicalAttention: 'within24Hours'
  },
  {
    id: 'food_poisoning',
    name: 'Food Poisoning',
    description: 'An illness caused by consuming contaminated food or beverages.',
    symptoms: ['nausea', 'vomiting', 'diarrhea', 'abdominal_pain', 'fever', 'weakness'],
    riskFactors: {
      age: { min: 0, max: 120 },
      gender: 'any',
    },
    severity: 'moderate',
    recommendations: [
      'Stay hydrated and replace lost fluids and electrolytes',
      'Ease back into eating with bland, easy-to-digest foods',
      'Rest to help recovery',
      'Avoid dairy products, caffeine, alcohol, and fatty foods'
    ],
    seekMedicalAttention: 'within24Hours'
  },
  {
    id: 'anxiety',
    name: 'Anxiety Disorder',
    description: 'A mental health disorder characterized by feelings of worry, anxiety, or fear strong enough to interfere with daily activities.',
    symptoms: ['fatigue', 'restlessness', 'difficulty_concentrating', 'irritability', 'muscle_tension', 'sleep_problems'],
    riskFactors: {
      age: { min: 10, max: 120 },
      gender: 'any',
    },
    severity: 'moderate',
    recommendations: [
      'Practice relaxation techniques such as deep breathing or meditation',
      'Regular physical exercise',
      'Maintain a regular sleep schedule',
      'Limit caffeine and alcohol intake',
      'Consider counseling or therapy'
    ],
    seekMedicalAttention: 'withinWeek'
  },
  {
    id: 'allergic_reaction',
    name: 'Allergic Reaction',
    description: 'An immune system response to a substance that the body mistakenly identifies as harmful.',
    symptoms: ['rash', 'itching', 'hives', 'shortness_of_breath', 'runny_nose', 'watery_eyes'],
    riskFactors: {
      age: { min: 0, max: 120 },
      gender: 'any',
    },
    severity: 'moderate',
    recommendations: [
      'Identify and avoid the allergen',
      'Take antihistamines as directed',
      'Apply cold compresses to reduce itching and swelling',
      'Seek immediate medical attention if breathing is affected',
      'Consider allergy testing to identify allergens'
    ],
    seekMedicalAttention: 'within24Hours'
  },
  {
    id: 'covid19',
    name: 'COVID-19',
    description: 'A respiratory illness caused by the SARS-CoV-2 virus.',
    symptoms: ['fever', 'cough', 'fatigue', 'shortness_of_breath', 'loss_of_taste_or_smell', 'sore_throat', 'body_aches'],
    riskFactors: {
      age: { min: 0, max: 120 },
      gender: 'any',
    },
    severity: 'moderate',
    recommendations: [
      'Isolate to prevent spreading the virus',
      'Rest and stay hydrated',
      'Take over-the-counter medications for symptom relief',
      'Monitor oxygen levels if possible',
      'Contact healthcare provider for testing and further guidance'
    ],
    seekMedicalAttention: 'within24Hours'
  },
  {
    id: 'urinary_tract_infection',
    name: 'Urinary Tract Infection (UTI)',
    description: 'An infection in any part of the urinary system, including the kidneys, bladder, ureters, and urethra.',
    symptoms: ['painful_urination', 'frequent_urination', 'abdominal_pain', 'pelvic_pain', 'cloudy_urine', 'fatigue'],
    riskFactors: {
      age: { min: 0, max: 120 },
      gender: 'female', // Though anyone can get UTIs, they're more common in females
    },
    severity: 'moderate',
    recommendations: [
      'Drink plenty of water',
      'Avoid caffeine, alcohol, and spicy foods',
      'Use a heating pad on the abdomen to reduce pain',
      'Urinate frequently and completely',
      'Seek medical treatment as antibiotics are typically needed'
    ],
    seekMedicalAttention: 'within24Hours'
  },
  {
    id: 'gastroesophageal_reflux',
    name: 'Gastroesophageal Reflux Disease (GERD)',
    description: 'A digestive disorder that affects the lower esophageal sphincter, causing stomach acid to flow back into the esophagus.',
    symptoms: ['heartburn', 'chest_pain', 'regurgitation', 'difficulty_swallowing', 'chronic_cough', 'nausea'],
    riskFactors: {
      age: { min: 20, max: 120 },
      gender: 'any',
    },
    severity: 'mild',
    recommendations: [
      'Eat smaller, more frequent meals',
      'Avoid lying down for 2-3 hours after eating',
      'Elevate the head of your bed',
      'Avoid trigger foods like spicy foods, citrus, chocolate, and fatty foods',
      'Consider over-the-counter antacids or acid reducers'
    ],
    seekMedicalAttention: 'withinWeek'
  },
  {
    id: 'heart_attack',
    name: 'Heart Attack',
    description: 'A serious medical emergency where blood flow to a part of the heart is blocked, causing damage to heart muscle.',
    symptoms: ['chest_pain', 'shortness_of_breath', 'pain_radiating_to_arm_or_jaw', 'cold_sweat', 'nausea', 'lightheadedness'],
    riskFactors: {
      age: { min: 40, max: 120 },
      gender: 'male', // Though anyone can have a heart attack, they're more common in males
    },
    severity: 'severe',
    recommendations: [
      'Call emergency services (911) immediately',
      'Chew and swallow aspirin if advised by medical professionals',
      'Rest in a position that makes breathing comfortable',
      'Loosen tight clothing',
      'Be prepared to receive CPR if necessary'
    ],
    seekMedicalAttention: 'immediately'
  }
];
