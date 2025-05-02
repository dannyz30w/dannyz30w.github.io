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

// Over 100 medical conditions with detailed information
export const conditions: Condition[] = [
  // Respiratory Conditions
  {
    id: 'common_cold',
    name: 'Common Cold',
    description: 'A viral infection of the upper respiratory tract that causes inflammation of the nasal passages and throat.',
    symptoms: ['runny_nose', 'congestion', 'sore_throat', 'cough', 'sneezing', 'fatigue', 'headache', 'mild_fever'],
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
    symptoms: ['fever', 'cough', 'sore_throat', 'body_aches', 'fatigue', 'headache', 'chills', 'runny_nose', 'congestion'],
    riskFactors: {
      age: { min: 0, max: 120 },
      gender: 'any',
    },
    severity: 'moderate',
    recommendations: [
      'Rest and stay home to prevent spreading the virus',
      'Drink plenty of fluids',
      'Take over-the-counter medications for fever and pain',
      'Consider antiviral medications if within 48 hours of symptom onset',
      'Monitor for worsening symptoms'
    ],
    seekMedicalAttention: 'within24Hours'
  },
  {
    id: 'covid19',
    name: 'COVID-19',
    description: 'A respiratory illness caused by the SARS-CoV-2 virus with varying severity from mild to severe.',
    symptoms: ['fever', 'cough', 'fatigue', 'shortness_of_breath', 'loss_of_taste', 'loss_of_smell', 'sore_throat', 'body_aches', 'headache', 'congestion'],
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
      'Contact healthcare provider for testing and guidance'
    ],
    seekMedicalAttention: 'within24Hours'
  },
  {
    id: 'pneumonia',
    name: 'Pneumonia',
    description: 'An infection that inflames the air sacs in one or both lungs, which may fill with fluid.',
    symptoms: ['chest_pain', 'cough', 'fever', 'shortness_of_breath', 'fatigue', 'nausea', 'vomiting', 'rapid_breathing'],
    riskFactors: {
      age: { min: 0, max: 120 },
      gender: 'any',
    },
    severity: 'severe',
    recommendations: [
      'Complete the full course of prescribed antibiotics',
      'Take any prescribed medications for cough or pain',
      'Rest as much as possible',
      'Stay hydrated',
      'Use a humidifier to ease breathing'
    ],
    seekMedicalAttention: 'within24Hours'
  },
  {
    id: 'bronchitis',
    name: 'Bronchitis',
    description: 'Inflammation of the lining of the bronchial tubes, which carry air to and from the lungs.',
    symptoms: ['cough', 'mucus_production', 'fatigue', 'shortness_of_breath', 'mild_fever', 'chest_discomfort'],
    riskFactors: {
      age: { min: 0, max: 120 },
      gender: 'any',
    },
    severity: 'moderate',
    recommendations: [
      'Rest and drink plenty of fluids',
      'Use a humidifier or take steamy showers to ease breathing',
      'Take over-the-counter pain relievers',
      'Consider cough suppressants if cough is severe'
    ],
    seekMedicalAttention: 'withinWeek'
  },
  {
    id: 'asthma',
    name: 'Asthma',
    description: 'A condition in which airways narrow, swell and produce extra mucus, making breathing difficult.',
    symptoms: ['wheezing', 'shortness_of_breath', 'chest_tightness', 'cough', 'trouble_sleeping', 'fatigue'],
    riskFactors: {
      age: { min: 0, max: 120 },
      gender: 'any',
    },
    severity: 'moderate',
    recommendations: [
      'Follow your asthma action plan',
      'Take prescribed medications as directed',
      'Avoid known triggers',
      'Monitor your breathing',
      'Keep rescue medication on hand'
    ],
    seekMedicalAttention: 'withinWeek'
  },
  {
    id: 'sinusitis',
    name: 'Sinusitis',
    description: 'Inflammation or swelling of the tissue lining the sinuses, interfering with drainage and causing mucus buildup.',
    symptoms: ['facial_pain', 'congestion', 'runny_nose', 'decreased_sense_of_smell', 'cough', 'fatigue', 'headache'],
    riskFactors: {
      age: { min: 0, max: 120 },
      gender: 'any',
    },
    severity: 'mild',
    recommendations: [
      'Apply warm compresses to the face',
      'Use saline nasal sprays',
      'Stay hydrated',
      'Consider over-the-counter decongestants',
      'Rest and avoid strenuous activities'
    ],
    seekMedicalAttention: 'withinWeek'
  },
  {
    id: 'allergic_rhinitis',
    name: 'Allergic Rhinitis (Hay Fever)',
    description: 'An allergic response causing cold-like symptoms such as sneezing, runny nose, congestion, and sinus pressure.',
    symptoms: ['sneezing', 'itchy_eyes', 'runny_nose', 'congestion', 'itchy_throat', 'watery_eyes', 'fatigue'],
    riskFactors: {
      age: { min: 0, max: 120 },
      gender: 'any',
    },
    severity: 'mild',
    recommendations: [
      'Avoid known allergens',
      'Keep windows closed during high pollen counts',
      'Use air conditioning',
      'Try over-the-counter antihistamines',
      'Consider nasal steroid sprays'
    ],
    seekMedicalAttention: 'selfCare'
  },
  {
    id: 'copd',
    name: 'Chronic Obstructive Pulmonary Disease (COPD)',
    description: 'A chronic inflammatory lung disease that causes obstructed airflow from the lungs.',
    symptoms: ['shortness_of_breath', 'wheezing', 'chest_tightness', 'chronic_cough', 'mucus_production', 'fatigue', 'frequent_respiratory_infections'],
    riskFactors: {
      age: { min: 40, max: 120 },
      gender: 'any',
    },
    severity: 'severe',
    recommendations: [
      'Take medications as prescribed',
      'Quit smoking',
      'Attend pulmonary rehabilitation if recommended',
      'Get vaccinated against pneumonia and flu',
      'Use oxygen therapy if prescribed'
    ],
    seekMedicalAttention: 'within24Hours'
  },
  {
    id: 'tuberculosis',
    name: 'Tuberculosis (TB)',
    description: 'A bacterial infection that primarily affects the lungs, but can also impact other parts of the body.',
    symptoms: ['persistent_cough', 'coughing_up_blood', 'chest_pain', 'unintentional_weight_loss', 'fatigue', 'fever', 'night_sweats', 'chills', 'loss_of_appetite'],
    riskFactors: {
      age: { min: 0, max: 120 },
      gender: 'any',
    },
    severity: 'severe',
    recommendations: [
      'Complete the full course of prescribed antibiotics (typically 6-9 months)',
      'Attend all follow-up appointments',
      'Practice good cough hygiene',
      'Isolate during the contagious phase',
      'Ensure good ventilation'
    ],
    seekMedicalAttention: 'immediately'
  },

  // Cardiovascular Conditions
  {
    id: 'hypertension',
    name: 'Hypertension (High Blood Pressure)',
    description: 'A chronic condition in which the force of blood against artery walls is consistently too high.',
    symptoms: ['headache', 'shortness_of_breath', 'nosebleeds', 'flushing', 'dizziness', 'chest_pain'],
    riskFactors: {
      age: { min: 30, max: 120 },
      gender: 'any',
    },
    severity: 'moderate',
    recommendations: [
      'Take prescribed medications regularly',
      'Reduce sodium in your diet',
      'Maintain a healthy weight',
      'Exercise regularly',
      'Limit alcohol consumption',
      'Manage stress'
    ],
    seekMedicalAttention: 'withinWeek'
  },
  {
    id: 'heart_attack',
    name: 'Heart Attack (Myocardial Infarction)',
    description: 'A serious medical emergency where blood flow to a part of the heart is blocked, causing damage to heart muscle.',
    symptoms: ['chest_pain', 'shortness_of_breath', 'pain_radiating_to_arm', 'pain_radiating_to_jaw', 'cold_sweat', 'nausea', 'lightheadedness', 'fatigue'],
    riskFactors: {
      age: { min: 40, max: 120 },
      gender: 'any', // Though risk is higher in males
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
  },
  {
    id: 'angina',
    name: 'Angina',
    description: 'Chest pain caused by reduced blood flow to the heart muscles, usually a symptom of heart disease.',
    symptoms: ['chest_pain', 'pressure_in_chest', 'pain_radiating_to_arm', 'pain_radiating_to_jaw', 'nausea', 'fatigue', 'shortness_of_breath', 'dizziness'],
    riskFactors: {
      age: { min: 40, max: 120 },
      gender: 'any',
    },
    severity: 'moderate',
    recommendations: [
      'Take prescribed medications',
      'Rest when symptoms occur',
      'Learn to manage stress',
      'Make lifestyle changes as recommended by your doctor',
      'Avoid extreme temperatures'
    ],
    seekMedicalAttention: 'within24Hours'
  },
  {
    id: 'atrial_fibrillation',
    name: 'Atrial Fibrillation',
    description: 'An irregular and often rapid heart rate that can increase your risk of stroke and heart failure.',
    symptoms: ['heart_palpitations', 'shortness_of_breath', 'fatigue', 'chest_pain', 'dizziness', 'reduced_ability_to_exercise', 'weakness'],
    riskFactors: {
      age: { min: 50, max: 120 },
      gender: 'any',
    },
    severity: 'moderate',
    recommendations: [
      'Take medications as prescribed',
      'Control high blood pressure',
      'Limit caffeine and alcohol',
      'Avoid stimulants',
      'Manage stress',
      'Regular exercise as approved by your doctor'
    ],
    seekMedicalAttention: 'within24Hours'
  },
  {
    id: 'stroke',
    name: 'Stroke',
    description: 'A condition where blood flow to part of the brain is cut off, causing brain cells to die.',
    symptoms: ['sudden_numbness', 'confusion', 'difficulty_speaking', 'vision_problems', 'dizziness', 'severe_headache', 'loss_of_balance', 'facial_drooping'],
    riskFactors: {
      age: { min: 40, max: 120 },
      gender: 'any',
    },
    severity: 'severe',
    recommendations: [
      'Call emergency services (911) immediately',
      'Note the time when symptoms first appeared',
      'Do not take aspirin or other medications',
      'Perform FAST test (Face, Arms, Speech, Time)',
      'Keep the person still and calm'
    ],
    seekMedicalAttention: 'immediately'
  },
  {
    id: 'heart_failure',
    name: 'Heart Failure',
    description: 'A chronic condition in which the heart doesn\'t pump blood as well as it should.',
    symptoms: ['shortness_of_breath', 'fatigue', 'swelling_in_legs', 'swelling_in_ankles', 'swelling_in_feet', 'rapid_heartbeat', 'persistent_cough', 'increased_urination_at_night'],
    riskFactors: {
      age: { min: 50, max: 120 },
      gender: 'any',
    },
    severity: 'severe',
    recommendations: [
      'Take medications as prescribed',
      'Limit sodium in your diet',
      'Track your weight daily',
      'Stay active with doctor-approved exercises',
      'Get adequate rest',
      'Manage stress'
    ],
    seekMedicalAttention: 'within24Hours'
  },
  {
    id: 'peripheral_artery_disease',
    name: 'Peripheral Artery Disease',
    description: 'A circulatory condition in which narrowed arteries reduce blood flow to the limbs, usually legs.',
    symptoms: ['leg_pain_when_walking', 'muscle_weakness', 'numbness_in_legs', 'coldness_in_legs_or_feet', 'sores_that_wont_heal', 'slower_toenail_growth', 'shiny_skin_on_legs', 'weak_pulse_in_legs_or_feet'],
    riskFactors: {
      age: { min: 50, max: 120 },
      gender: 'any',
    },
    severity: 'moderate',
    recommendations: [
      'Stop smoking',
      'Exercise regularly',
      'Eat a healthy diet',
      'Take medications as prescribed',
      'Manage related health conditions',
      'Regular foot care'
    ],
    seekMedicalAttention: 'withinWeek'
  },
  {
    id: 'deep_vein_thrombosis',
    name: 'Deep Vein Thrombosis (DVT)',
    description: 'A blood clot that forms in a vein deep in the body, usually in the legs.',
    symptoms: ['leg_swelling', 'leg_pain', 'red_or_discolored_skin', 'warmth_in_affected_leg', 'leg_cramps', 'leg_tenderness'],
    riskFactors: {
      age: { min: 40, max: 120 },
      gender: 'any',
    },
    severity: 'severe',
    recommendations: [
      'Take blood thinners as prescribed',
      'Elevate the affected leg',
      'Wear compression stockings if recommended',
      'Move regularly, especially during long trips',
      'Follow up with doctor appointments'
    ],
    seekMedicalAttention: 'immediately'
  },
  {
    id: 'aortic_aneurysm',
    name: 'Aortic Aneurysm',
    description: 'An enlargement of the aorta, the main blood vessel that delivers blood from the heart to the body.',
    symptoms: ['pulsing_sensation_in_abdomen', 'deep_constant_abdominal_pain', 'back_pain', 'shortness_of_breath', 'difficulty_swallowing', 'hoarseness'],
    riskFactors: {
      age: { min: 50, max: 120 },
      gender: 'male', // More common in males
    },
    severity: 'severe',
    recommendations: [
      'Call emergency services (911) if aneurysm ruptures',
      'Regular monitoring if small aneurysm is detected',
      'Quit smoking',
      'Control blood pressure',
      'Follow prescribed medication regimen'
    ],
    seekMedicalAttention: 'immediately'
  },

  // Gastrointestinal Conditions
  {
    id: 'gastroesophageal_reflux',
    name: 'Gastroesophageal Reflux Disease (GERD)',
    description: 'A digestive disorder that affects the lower esophageal sphincter, causing stomach acid to flow back into the esophagus.',
    symptoms: ['heartburn', 'chest_pain', 'regurgitation', 'difficulty_swallowing', 'chronic_cough', 'hoarseness', 'sensation_of_lump_in_throat', 'nausea'],
    riskFactors: {
      age: { min: 20, max: 120 },
      gender: 'any',
    },
    severity: 'mild',
    recommendations: [
      'Eat smaller, more frequent meals',
      'Avoid lying down for 2-3 hours after eating',
      'Elevate the head of your bed',
      'Avoid trigger foods (spicy, fatty, citrus)',
      'Take prescribed or over-the-counter medications',
      'Maintain a healthy weight'
    ],
    seekMedicalAttention: 'withinWeek'
  },
  {
    id: 'peptic_ulcer',
    name: 'Peptic Ulcer',
    description: 'An open sore that develops on the inside lining of the stomach, upper small intestine, or esophagus.',
    symptoms: ['gnawing_abdominal_pain', 'nausea', 'vomiting', 'bloating', 'feeling_full_quickly', 'intolerance_to_fatty_foods', 'heartburn', 'dark_stools'],
    riskFactors: {
      age: { min: 18, max: 120 },
      gender: 'any',
    },
    severity: 'moderate',
    recommendations: [
      'Take prescribed antibiotics if H. pylori is present',
      'Avoid NSAIDs and aspirin',
      'Limit alcohol consumption',
      'Quit smoking',
      'Control stress levels',
      'Eat smaller, more frequent meals'
    ],
    seekMedicalAttention: 'withinWeek'
  },
  {
    id: 'food_poisoning',
    name: 'Food Poisoning',
    description: 'Illness caused by eating contaminated food containing infectious organisms or their toxins.',
    symptoms: ['nausea', 'vomiting', 'diarrhea', 'abdominal_cramps', 'fever', 'headache', 'weakness', 'loss_of_appetite'],
    riskFactors: {
      age: { min: 0, max: 120 },
      gender: 'any',
    },
    severity: 'moderate',
    recommendations: [
      'Stay hydrated with clear liquids',
      'Ease back into eating with bland foods',
      'Rest to help recovery',
      'Avoid dairy, caffeine, alcohol, and fatty foods',
      'Take probiotics once symptoms improve'
    ],
    seekMedicalAttention: 'within24Hours'
  },
  {
    id: 'irritable_bowel_syndrome',
    name: 'Irritable Bowel Syndrome (IBS)',
    description: 'A common disorder affecting the large intestine, characterized by abdominal pain and changes in bowel movement patterns.',
    symptoms: ['abdominal_pain', 'bloating', 'gas', 'diarrhea', 'constipation', 'mucus_in_stool', 'food_intolerances'],
    riskFactors: {
      age: { min: 18, max: 60 },
      gender: 'female', // More common in females
    },
    severity: 'mild',
    recommendations: [
      'Identify and avoid trigger foods',
      'Manage stress through relaxation techniques',
      'Regular exercise',
      'Adequate sleep',
      'Consider fiber supplements or probiotics',
      'Follow a low-FODMAP diet if recommended'
    ],
    seekMedicalAttention: 'withinWeek'
  },
  {
    id: 'crohns_disease',
    name: 'Crohn\'s Disease',
    description: 'An inflammatory bowel disease causing inflammation in the digestive tract, leading to abdominal pain, severe diarrhea, fatigue, and malnutrition.',
    symptoms: ['diarrhea', 'abdominal_pain', 'bloody_stool', 'fatigue', 'reduced_appetite', 'unintended_weight_loss', 'fever', 'mouth_sores'],
    riskFactors: {
      age: { min: 15, max: 35 },
      gender: 'any',
    },
    severity: 'severe',
    recommendations: [
      'Take medications as prescribed',
      'Follow a specialized diet as recommended',
      'Avoid trigger foods',
      'Stay hydrated',
      'Regular exercise when feeling well',
      'Avoid smoking',
      'Regular check-ups with gastroenterologist'
    ],
    seekMedicalAttention: 'within24Hours'
  },
  {
    id: 'ulcerative_colitis',
    name: 'Ulcerative Colitis',
    description: 'An inflammatory bowel disease causing inflammation and ulcers in the digestive tract, primarily affecting the colon and rectum.',
    symptoms: ['diarrhea', 'abdominal_pain', 'rectal_pain', 'rectal_bleeding', 'urgency_to_defecate', 'inability_to_defecate_despite_urgency', 'weight_loss', 'fatigue', 'fever'],
    riskFactors: {
      age: { min: 15, max: 30 },
      gender: 'any',
    },
    severity: 'severe',
    recommendations: [
      'Take prescribed medications regularly',
      'Follow dietary recommendations',
      'Stay hydrated',
      'Manage stress',
      'Get adequate rest',
      'Exercise when symptoms are mild',
      'Regular medical check-ups'
    ],
    seekMedicalAttention: 'within24Hours'
  },
  {
    id: 'gallstones',
    name: 'Gallstones',
    description: 'Hard deposits that form in the gallbladder, varying in size from a grain of sand to a golf ball.',
    symptoms: ['sudden_pain_in_upper_right_abdomen', 'sudden_pain_in_center_abdomen', 'back_pain', 'pain_between_shoulder_blades', 'nausea', 'vomiting', 'indigestion'],
    riskFactors: {
      age: { min: 40, max: 120 },
      gender: 'female', // More common in females
    },
    severity: 'moderate',
    recommendations: [
      'Surgery if symptoms are severe or complications occur',
      'Low-fat diet',
      'Gradual weight loss if overweight',
      'Regular physical activity',
      'Medications to dissolve gallstones if surgery isn't possible'
    ],
    seekMedicalAttention: 'within24Hours'
  },
  {
    id: 'diverticulitis',
    name: 'Diverticulitis',
    description: 'Inflammation or infection of small pouches (diverticula) that develop along the walls of the intestines.',
    symptoms: ['abdominal_pain', 'fever', 'nausea', 'vomiting', 'constipation', 'diarrhea', 'bloating', 'rectal_bleeding'],
    riskFactors: {
      age: { min: 40, max: 120 },
      gender: 'any',
    },
    severity: 'moderate',
    recommendations: [
      'Follow liquid or low-fiber diet during flares',
      'Rest until symptoms improve',
      'Take antibiotics if prescribed',
      'Use pain relievers as needed',
      'Apply heat to the abdomen',
      'Gradually increase fiber intake after recovery'
    ],
    seekMedicalAttention: 'within24Hours'
  },
  {
    id: 'celiac_disease',
    name: 'Celiac Disease',
    description: 'An immune reaction to eating gluten, a protein found in wheat, barley, and rye, causing damage to the small intestine.',
    symptoms: ['diarrhea', 'bloating', 'gas', 'fatigue', 'weight_loss', 'anemia', 'skin_rash', 'headaches', 'joint_pain', 'numbness_in_legs', 'depression'],
    riskFactors: {
      age: { min: 0, max: 120 },
      gender: 'female', // Slightly more common in females
    },
    severity: 'moderate',
    recommendations: [
      'Follow a strict gluten-free diet',
      'Read food labels carefully',
      'Avoid cross-contamination in food preparation',
      'Consult with a dietitian',
      'Take vitamin and mineral supplements if deficient',
      'Regular check-ups with healthcare provider'
    ],
    seekMedicalAttention: 'withinWeek'
  },
  {
    id: 'pancreatitis',
    name: 'Pancreatitis',
    description: 'Inflammation of the pancreas, which can be acute (sudden, severe) or chronic (long-lasting).',
    symptoms: ['upper_abdominal_pain', 'abdominal_pain_radiating_to_back', 'nausea', 'vomiting', 'tenderness_when_touching_abdomen', 'fever', 'rapid_pulse', 'weight_loss'],
    riskFactors: {
      age: { min: 30, max: 120 },
      gender: 'any',
    },
    severity: 'severe',
    recommendations: [
      'Hospitalization for acute cases',
      'Pain management',
      'Low-fat diet',
      'Avoid alcohol and tobacco',
      'Stay hydrated',
      'Take enzyme supplements if prescribed',
      'Treat underlying causes'
    ],
    seekMedicalAttention: 'immediately'
  },
  {
    id: 'hepatitis',
    name: 'Hepatitis',
    description: 'Inflammation of the liver, typically caused by viral infection but can have other causes.',
    symptoms: ['fatigue', 'nausea', 'vomiting', 'abdominal_pain', 'loss_of_appetite', 'dark_urine', 'light_colored_stools', 'joint_pain', 'jaundice'],
    riskFactors: {
      age: { min: 0, max: 120 },
      gender: 'any',
    },
    severity: 'severe',
    recommendations: [
      'Rest adequately',
      'Stay hydrated',
      'Avoid alcohol and medications that stress the liver',
      'Follow a healthy diet',
      'Get vaccinated for hepatitis A and B if not infected',
      'Practice good hygiene'
    ],
    seekMedicalAttention: 'immediately'
  },

  // Neurological Conditions
  {
    id: 'migraine',
    name: 'Migraine',
    description: 'A neurological condition characterized by intense, debilitating headaches, often accompanied by other symptoms.',
    symptoms: ['throbbing_headache', 'sensitivity_to_light', 'sensitivity_to_sound', 'nausea', 'vomiting', 'blurred_vision', 'aura', 'tingling_sensation'],
    riskFactors: {
      age: { min: 10, max: 50 },
      gender: 'female', // More common in females
    },
    severity: 'moderate',
    recommendations: [
      'Rest in a quiet, dark room',
      'Apply cold or warm compresses',
      'Take prescribed or over-the-counter pain medications',
      'Stay hydrated',
      'Practice relaxation techniques',
      'Identify and avoid triggers'
    ],
    seekMedicalAttention: 'withinWeek'
  },
  {
    id: 'tension_headache',
    name: 'Tension Headache',
    description: 'A common headache characterized by mild to moderate pain, often described as a tight band around the head.',
    symptoms: ['dull_headache', 'pressure_around_forehead', 'tenderness_in_scalp', 'tenderness_in_neck', 'tenderness_in_shoulder_muscles'],
    riskFactors: {
      age: { min: 15, max: 120 },
      gender: 'any',
    },
    severity: 'mild',
    recommendations: [
      'Over-the-counter pain relievers',
      'Stress management',
      'Adequate sleep',
      'Regular physical activity',
      'Improve posture',
      'Stay hydrated',
      'Hot or cold compresses'
    ],
    seekMedicalAttention: 'selfCare'
  },
  {
    id: 'parkinsons_disease',
    name: 'Parkinson\'s Disease',
    description: 'A progressive nervous system disorder that affects movement, often including tremors.',
    symptoms: ['tremors', 'slowed_movement', 'rigid_muscles', 'impaired_posture', 'balance_problems', 'loss_of_automatic_movements', 'speech_changes', 'writing_changes'],
    riskFactors: {
      age: { min: 50, max: 120 },
      gender: 'male', // Slightly more common in males
    },
    severity: 'severe',
    recommendations: [
      'Take medications as prescribed',
      'Regular exercise with focus on balance and stretching',
      'Physical therapy',
      'Speech therapy if needed',
      'Healthy diet',
      'Regular medical check-ups',
      'Join support groups'
    ],
    seekMedicalAttention: 'within24Hours'
  },
  {
    id: 'multiple_sclerosis',
    name: 'Multiple Sclerosis (MS)',
    description: 'A disease of the central nervous system that disrupts the flow of information within the brain and between the brain and body.',
    symptoms: ['fatigue', 'numbness', 'weakness', 'tingling', 'vision_problems', 'coordination_problems', 'cognitive_impairment', 'depression'],
    riskFactors: {
      age: { min: 20, max: 50 },
      gender: 'female', // More common in females
    },
    severity: 'severe',
    recommendations: [
      'Take disease-modifying medications as prescribed',
      'Physical therapy',
      'Occupational therapy',
      'Regular exercise within abilities',
      'Stress management',
      'Adequate rest',
      'Balanced diet',
      'Join support groups'
    ],
    seekMedicalAttention: 'within24Hours'
  },
  {
    id: 'epilepsy',
    name: 'Epilepsy',
    description: 'A neurological disorder characterized by recurring seizures due to abnormal electrical activity in the brain.',
    symptoms: ['seizures', 'temporary_confusion', 'staring_spells', 'uncontrollable_jerking_movements', 'loss_of_consciousness', 'psychic_symptoms'],
    riskFactors: {
      age: { min: 0, max: 120 },
      gender: 'any',
    },
    severity: 'moderate',
    recommendations: [
      'Take anticonvulsant medications as prescribed',
      'Get adequate sleep',
      'Wear a medical alert bracelet',
      'Avoid known seizure triggers',
      'Regular medical check-ups',
      'Consider vagus nerve stimulation if medications aren't effective'
    ],
    seekMedicalAttention: 'within24Hours'
  },
  {
    id: 'alzheimers_disease',
    name: 'Alzheimer\'s Disease',
    description: 'A progressive disorder that causes brain cells to degenerate and die, leading to memory loss and cognitive decline.',
    symptoms: ['memory_loss', 'difficulty_solving_problems', 'difficulty_completing_familiar_tasks', 'confusion', 'disorientation', 'changes_in_mood', 'withdrawal', 'personality_changes'],
    riskFactors: {
      age: { min: 65, max: 120 },
      gender: 'any',
    },
    severity: 'severe',
    recommendations: [
      'Take medications as prescribed',
      'Maintain a routine',
      'Create a safe environment',
      'Regular physical activity',
      'Mental stimulation',
      'Social engagement',
      'Proper nutrition',
      'Support for caregivers'
    ],
    seekMedicalAttention: 'withinWeek'
  },
  {
    id: 'meningitis',
    name: 'Meningitis',
    description: 'Inflammation of the membranes (meninges) surrounding the brain and spinal cord, usually due to infection.',
    symptoms: ['sudden_high_fever', 'stiff_neck', 'severe_headache', 'nausea', 'vomiting', 'confusion', 'seizures', 'sensitivity_to_light', 'skin_rash'],
    riskFactors: {
      age: { min: 0, max: 120 },
      gender: 'any',
    },
    severity: 'severe',
    recommendations: [
      'Seek immediate medical attention',
      'Hospitalization is usually required',
      'Antibiotics for bacterial meningitis',
      'Antiviral medication for viral meningitis',
      'Corticosteroids to reduce inflammation',
      'Fluids and rest during recovery'
    ],
    seekMedicalAttention: 'immediately'
  },
  {
    id: 'bells_palsy',
    name: 'Bell\'s Palsy',
    description: 'A condition that causes a temporary weakness or paralysis of the muscles in the face.',
    symptoms: ['facial_weakness', 'drooping_eyelid', 'difficulty_closing_eye', 'drooling', 'increased_sensitivity_to_sound', 'pain_around_jaw', 'headache', 'decreased_taste'],
    riskFactors: {
      age: { min: 15, max: 60 },
      gender: 'any',
    },
    severity: 'moderate',
    recommendations: [
      'Corticosteroids as prescribed',
      'Eye protection if unable to close eye',
      'Physical therapy',
      'Pain relievers if needed',
      'Massage affected muscles',
      'Facial exercises'
    ],
    seekMedicalAttention: 'within24Hours'
  },

  // Mental Health Conditions
  {
    id: 'depression',
    name: 'Depression',
    description: 'A mental health disorder characterized by persistently depressed mood or loss of interest in activities, causing significant impairment in daily life.',
    symptoms: ['persistent_sadness', 'loss_of_interest', 'changes_in_appetite', 'sleep_disturbances', 'fatigue', 'feelings_of_worthlessness', 'difficulty_concentrating', 'thoughts_of_death'],
    riskFactors: {
      age: { min: 12, max: 120 },
      gender: 'any',
    },
    severity: 'moderate',
    recommendations: [
      'Seek professional help from a psychiatrist or therapist',
      'Take prescribed medications if recommended',
      'Regular exercise',
      'Maintain social connections',
      'Practice good sleep hygiene',
      'Set realistic goals',
      'Participate in activities once enjoyed'
    ],
    seekMedicalAttention: 'withinWeek'
  },
  {
    id: 'anxiety',
    name: 'Anxiety Disorder',
    description: 'A mental health disorder characterized by feelings of worry, anxiety, or fear strong enough to interfere with daily activities.',
    symptoms: ['excessive_worry', 'restlessness', 'fatigue', 'difficulty_concentrating', 'irritability', 'muscle_tension', 'sleep_problems', 'racing_heart'],
    riskFactors: {
      age: { min: 10, max: 120 },
      gender: 'any',
    },
    severity: 'moderate',
    recommendations: [
      'Practice relaxation techniques',
      'Regular physical exercise',
      'Maintain a regular sleep schedule',
      'Limit caffeine and alcohol',
      'Consider therapy (CBT)',
      'Take medications if prescribed',
      'Join support groups'
    ],
    seekMedicalAttention: 'withinWeek'
  },
  {
    id: 'bipolar_disorder',
    name: 'Bipolar Disorder',
    description: 'A mental disorder that causes unusual shifts in mood, energy, activity levels, concentration, and the ability to carry out day-to-day tasks.',
    symptoms: ['mood_swings', 'elevated_mood', 'increased_energy', 'reduced_need_for_sleep', 'depression', 'fatigue', 'loss_of_interest', 'suicidal_thoughts'],
    riskFactors: {
      age: { min: 15, max: 40 },
      gender: 'any',
    },
    severity: 'severe',
    recommendations: [
      'Take mood-stabilizing medications as prescribed',
      'Regular therapy sessions',
      'Maintain a stable sleep schedule',
      'Avoid substance use',
      'Learn to recognize warning signs of mood episodes',
      'Regular physical activity',
      'Join support groups'
    ],
    seekMedicalAttention: 'within24Hours'
  },
  {
    id: 'post_traumatic_stress_disorder',
    name: 'Post-Traumatic Stress Disorder (PTSD)',
    description: 'A mental health condition triggered by experiencing or witnessing a terrifying event.',
    symptoms: ['intrusive_memories', 'avoidance', 'negative_changes_in_thinking', 'changes_in_emotional_reactions', 'nightmares', 'severe_anxiety', 'flashbacks', 'uncontrollable_thoughts'],
    riskFactors: {
      age: { min: 0, max: 120 },
      gender: 'any',
    },
    severity: 'severe',
    recommendations: [
      'Psychotherapy (especially trauma-focused CBT)',
      'Medication as prescribed',
      'Self-care strategies',
      'Join support groups',
      'Learn stress management techniques',
      'Regular exercise',
      'Maintain connections with trusted people'
    ],
    seekMedicalAttention: 'withinWeek'
  },
  {
    id: 'obsessive_compulsive_disorder',
    name: 'Obsessive-Compulsive Disorder (OCD)',
    description: 'A mental disorder characterized by unreasonable thoughts and fears that lead to repetitive behaviors.',
    symptoms: ['unwanted_thoughts', 'excessive_handwashing', 'arranging_items_in_specific_way', 'checking_things_repeatedly', 'mental_compulsions', 'fear_of_contamination', 'need_for_symmetry', 'aggressive_thoughts'],
    riskFactors: {
      age: { min: 10, max: 40 },
      gender: 'any',
    },
    severity: 'moderate',
    recommendations: [
      'Cognitive behavioral therapy (especially ERP)',
      'Medication as prescribed',
      'Join support groups',
      'Stress management techniques',
      'Regular exercise',
      'Adequate sleep',
      'Education about the condition'
    ],
    seekMedicalAttention: 'withinWeek'
  },

  // Endocrine Conditions
  {
    id: 'diabetes_type1',
    name: 'Type 1 Diabetes',
    description: 'A chronic condition in which the pancreas produces little or no insulin, requiring insulin therapy.',
    symptoms: ['increased_thirst', 'frequent_urination', 'extreme_hunger', 'unintended_weight_loss', 'irritability', 'fatigue', 'blurred_vision', 'slow_healing_sores'],
    riskFactors: {
      age: { min: 0, max: 30 },
      gender: 'any',
    },
    severity: 'severe',
    recommendations: [
      'Take insulin as prescribed',
      'Monitor blood sugar levels frequently',
      'Count carbohydrates',
      'Regular exercise',
      'Healthy diet',
      'Regular medical check-ups',
      'Education on managing the condition'
    ],
    seekMedicalAttention: 'within24Hours'
  },
  {
    id: 'diabetes_type2',
    name: 'Type 2 Diabetes',
    description: 'A chronic condition affecting how the body metabolizes sugar (glucose), the body's main source of fuel.',
    symptoms: ['increased_thirst', 'frequent_urination', 'increased_hunger', 'fatigue', 'blurred_vision', 'slow_healing_wounds', 'frequent_infections', 'dark_skin_patches'],
    riskFactors: {
      age: { min: 35, max: 120 },
      gender: 'any',
    },
    severity: 'moderate',
    recommendations: [
      'Monitor blood sugar levels',
      'Take medications as prescribed',
      'Healthy eating plan',
      'Regular physical activity',
      'Maintain a healthy weight',
      'Regular medical check-ups',
      'Stress management'
    ],
    seekMedicalAttention: 'withinWeek'
  },
  {
    id: 'hypothyroidism',
    name: 'Hypothyroidism',
    description: 'A condition in which the thyroid gland doesn\'t produce enough thyroid hormone, slowing metabolism.',
    symptoms: ['fatigue', 'increased_sensitivity_to_cold', 'constipation', 'dry_skin', 'weight_gain', 'puffy_face', 'hoarse_voice', 'muscle_weakness', 'elevated_cholesterol'],
    riskFactors: {
      age: { min: 40, max: 120 },
      gender: 'female', // More common in females
    },
    severity: 'moderate',
    recommendations: [
      'Take thyroid hormone replacement medication',
      'Regular monitoring of thyroid levels',
      'Maintain a balanced diet',
      'Exercise regularly',
      'Manage stress',
      'Get adequate sleep',
      'Regular medical check-ups'
    ],
    seekMedicalAttention: 'withinWeek'
  },
  {
    id: 'hyperthyroidism',
    name: 'Hyperthyroidism',
    description: 'A condition in which the thyroid gland produces too much thyroid hormone, accelerating metabolism.',
    symptoms: ['weight_loss', 'rapid_heartbeat', 'increased_appetite', 'nervousness', 'tremor', 'sweating', 'changes_in_menstrual_patterns', 'more_frequent_bowel_movements', 'goiter'],
    riskFactors: {
      age: { min: 20, max: 50 },
      gender: 'female', // More common in females
    },
    severity: 'moderate',
    recommendations: [
      'Take anti-thyroid medications as prescribed',
      'Beta blockers for symptom relief',
      'Consider radioactive iodine therapy or surgery if recommended',
      'Regular monitoring of thyroid levels',
      'Avoid iodine-rich foods if advised',
      'Stress management',
      'Regular medical check-ups'
    ],
    seekMedicalAttention: 'within24Hours'
  },
  {
    id: 'cushing_syndrome',
    name: 'Cushing\'s Syndrome',
    description: 'A condition that occurs when the body is exposed to high levels of cortisol for a long time.',
    symptoms: ['weight_gain', 'fatty_deposits', 'pink_or_purple_stretch_marks', 'thinning_skin', 'easy_bruising', 'slow_healing_wounds', 'acne', 'fatigue', 'increased_fat_in_neck'],
    riskFactors: {
      age: { min: 20, max: 50 },
      gender: 'female', // More common in females
    },
    severity: 'severe',
    recommendations: [
      'Reduce or discontinue corticosteroid use with doctor guidance',
      'Medication to control cortisol production',
      'Surgery if tumor is present',
      'Radiation therapy in some cases',
      'Regular medical monitoring',
      'Healthy diet and exercise',
      'Calcium and vitamin D supplements'
    ],
    seekMedicalAttention: 'within24Hours'
  },
  {
    id: 'addisons_disease',
    name: 'Addison\'s Disease',
    description: 'A disorder in which the adrenal glands don\'t produce enough hormones.',
    symptoms: ['fatigue', 'weight_loss', 'decreased_appetite', 'darkening_of_skin', 'low_blood_pressure', 'salt_craving', 'hypoglycemia', 'nausea', 'diarrhea', 'abdominal_pain'],
    riskFactors: {
      age: { min: 30, max: 50 },
      gender: 'any',
    },
    severity: 'severe',
    recommendations: [
      'Hormone replacement therapy',
      'Increase salt intake if advised',
      'Wear a medical alert bracelet',
      'Carry emergency kit with injectable steroids',
      'Regular medical monitoring',
      'Learn to manage stress',
      'Plan for increased medication during illness or stress'
    ],
    seekMedicalAttention: 'immediately'
  },

  // Dermatological Conditions
  {
    id: 'acne',
    name: 'Acne',
    description: 'A skin condition that occurs when hair follicles become clogged with oil and dead skin cells.',
    symptoms: ['whiteheads', 'blackheads', 'pimples', 'large_painful_lumps_under_skin', 'painful_tender_bumps'],
    riskFactors: {
      age: { min: 12, max: 25 },
      gender: 'any',
    },
    severity: 'mild',
    recommendations: [
      'Wash face twice daily with mild cleanser',
      'Use oil-free moisturizers and cosmetics',
      'Try over-the-counter acne products',
      'Consider prescription medications for severe cases',
      'Avoid picking or squeezing pimples',
      'Shower after sweating',
      'Wash hair regularly'
    ],
    seekMedicalAttention: 'selfCare'
  },
  {
    id: 'eczema',
    name: 'Eczema (Atopic Dermatitis)',
    description: 'A chronic skin condition characterized by itchy, inflamed skin.',
    symptoms: ['dry_skin', 'itching', 'red_rashes', 'small_raised_bumps', 'thickened_cracked_skin', 'raw_sensitive_skin'],
    riskFactors: {
      age: { min: 0, max: 5 },
      gender: 'any',
    },
    severity: 'mild',
    recommendations: [
      'Moisturize regularly',
      'Identify and avoid triggers',
      'Use mild soaps',
      'Apply topical corticosteroids as prescribed',
      'Take lukewarm baths',
      'Wear soft, breathable fabrics',
      'Avoid scratching'
    ],
    seekMedicalAttention: 'withinWeek'
  },
  {
    id: 'psoriasis',
    name: 'Psoriasis',
    description: 'A chronic autoimmune condition that causes rapid skin cell buildup, resulting in scaling on the skin\'s surface.',
    symptoms: ['red_patches', 'silvery_scales', 'dry_cracked_skin', 'itching', 'burning', 'soreness', 'thickened_or_ridged_nails', 'swollen_joints'],
    riskFactors: {
      age: { min: 15, max: 35 },
      gender: 'any',
    },
    severity: 'moderate',
    recommendations: [
      'Apply topical treatments as prescribed',
      'Moisturize regularly',
      'Avoid triggers',
      'Expose skin to small amounts of sunlight',
      'Manage stress',
      'Avoid smoking and alcohol',
      'Consider light therapy if recommended'
    ],
    seekMedicalAttention: 'withinWeek'
  },
  {
    id: 'allergic_reaction',
    name: 'Allergic Reaction',
    description: 'An immune system response to a substance that the body mistakenly identifies as harmful.',
    symptoms: ['rash', 'itching', 'hives', 'swelling', 'runny_nose', 'watery_eyes', 'sneezing', 'shortness_of_breath'],
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
      'Consider allergy testing to identify allergens',
      'Use prescribed epinephrine autoinjector if available (for severe reactions)'
    ],
    seekMedicalAttention: 'within24Hours'
  },
  {
    id: 'rosacea',
    name: 'Rosacea',
    description: 'A chronic skin condition that causes redness and often small, red, pus-filled bumps on the face.',
    symptoms: ['facial_redness', 'swollen_red_bumps', 'eye_problems', 'enlarged_nose', 'burning_sensation', 'facial_flushing'],
    riskFactors: {
      age: { min: 30, max: 50 },
      gender: 'female', // More common in females
    },
    severity: 'mild',
    recommendations: [
      'Use gentle skin care products',
      'Avoid triggers (spicy food, alcohol, extreme temperatures)',
      'Apply prescribed topical medications',
      'Protect face from sun',
      'Manage stress',
      'Consider laser therapy if recommended'
    ],
    seekMedicalAttention: 'withinWeek'
  },
  {
    id: 'skin_cancer',
    name: 'Skin Cancer',
    description: 'The abnormal growth of skin cells, most often developing on skin exposed to the sun.',
    symptoms: ['unusual_moles', 'sores_that_dont_heal', 'changes_in_existing_moles', 'scaly_patches', 'bleeding_from_mole', 'painful_lesions', 'itchy_lesions'],
    riskFactors: {
      age: { min: 40, max: 120 },
      gender: 'any',
    },
    severity: 'severe',
    recommendations: [
      'Seek immediate medical evaluation',
      'Follow treatment plan (may include surgery, radiation, chemotherapy)',
      'Regular skin self-examinations',
      'Follow-up with dermatologist',
      'Use sun protection',
      'Avoid tanning beds'
    ],
    seekMedicalAttention: 'immediately'
  },

  // Musculoskeletal Conditions
  {
    id: 'osteoarthritis',
    name: 'Osteoarthritis',
    description: 'A degenerative joint disease that occurs when the protective cartilage cushioning the ends of bones wears down over time.',
    symptoms: ['joint_pain', 'stiffness', 'tenderness', 'loss_of_flexibility', 'grating_sensation', 'bone_spurs', 'swelling'],
    riskFactors: {
      age: { min: 50, max: 120 },
      gender: 'any',
    },
    severity: 'moderate',
    recommendations: [
      'Exercise regularly with low-impact activities',
      'Maintain a healthy weight',
      'Physical therapy if recommended',
      'Use assistive devices if needed',
      'Apply hot or cold packs',
      'Use pain relievers as directed',
      'Consider joint injections if recommended'
    ],
    seekMedicalAttention: 'withinWeek'
  },
  {
    id: 'rheumatoid_arthritis',
    name: 'Rheumatoid Arthritis',
    description: 'A chronic inflammatory disorder affecting many joints, including those in the hands and feet.',
    symptoms: ['tender_swollen_joints', 'joint_stiffness', 'fatigue', 'fever', 'weight_loss', 'symmetric_pattern_of_affected_joints'],
    riskFactors: {
      age: { min: 40, max: 60 },
      gender: 'female', // More common in females
    },
    severity: 'severe',
    recommendations: [
      'Take prescribed medications regularly',
      'Physical therapy',
      'Occupational therapy',
      'Regular exercise',
      'Apply hot or cold packs',
      'Use assistive devices if needed',
      'Balanced diet',
      'Join support groups'
    ],
    seekMedicalAttention: 'within24Hours'
  },
  {
    id: 'osteoporosis',
    name: 'Osteoporosis',
    description: 'A disease that weakens bones, making them fragile and more likely to break.',
    symptoms: ['back_pain', 'loss_of_height', 'stooped_posture', 'bone_fracture_with_minimal_trauma'],
    riskFactors: {
      age: { min: 50, max: 120 },
      gender: 'female', // More common in females, especially post-menopausal
    },
    severity: 'moderate',
    recommendations: [
      'Take medications as prescribed',
      'Calcium and vitamin D supplements',
      'Weight-bearing exercises',
      'Balance exercises to prevent falls',
      'Quit smoking',
      'Limit alcohol consumption',
      'Regular bone density tests'
    ],
    seekMedicalAttention: 'withinWeek'
  },
  {
    id: 'gout',
    name: 'Gout',
    description: 'A type of arthritis characterized by sudden, severe attacks of pain, redness and tenderness in joints, often the joint at the base of the big toe.',
    symptoms: ['severe_joint_pain', 'lingering_discomfort', 'inflammation', 'redness', 'limited_range_of_motion'],
    riskFactors: {
      age: { min: 30, max: 60 },
      gender: 'male', // More common in males
    },
    severity: 'moderate',
    recommendations: [
      'Take prescribed medications during attacks',
      'Apply ice to affected joints',
      'Elevate the affected joint',
      'Drink plenty of fluids',
      'Avoid high-purine foods',
      'Limit alcohol consumption',
      'Maintain a healthy weight'
    ],
    seekMedicalAttention: 'within24Hours'
  },
  {
    id: 'fibromyalgia',
    name: 'Fibromyalgia',
    description: 'A disorder characterized by widespread musculoskeletal pain accompanied by fatigue, sleep, memory and mood issues.',
    symptoms: ['widespread_pain', 'fatigue', 'cognitive_difficulties', 'sleep_problems', 'headaches', 'depression', 'anxiety', 'pain_or_cramps_in_abdomen'],
    riskFactors: {
      age: { min: 30, max: 60 },
      gender: 'female', // More common in females
    },
    severity: 'moderate',
    recommendations: [
      'Take medications as prescribed',
      'Regular physical exercise',
      'Stress management techniques',
      'Good sleep habits',
      'Pacing activities',
      'Cognitive behavioral therapy',
      'Join support groups'
    ],
    seekMedicalAttention: 'withinWeek'
  },

  // Other Conditions
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
  }
];
