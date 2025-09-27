
export type Symptom = {
  id: string;
  name: string;
  category: string;
  description?: string;
};

export const symptoms: Symptom[] = [
  // General symptoms
  { id: 'fever', name: 'Fever', category: 'general', description: 'Elevated body temperature above normal range' },
  { id: 'mild_fever', name: 'Mild fever', category: 'general', description: 'Slightly elevated body temperature' },
  { id: 'fatigue', name: 'Fatigue', category: 'general', description: 'Feeling of tiredness or lack of energy' },
  { id: 'weakness', name: 'General weakness', category: 'general', description: 'Overall feeling of weakness or lack of strength' },
  { id: 'malaise', name: 'Malaise', category: 'general', description: 'General feeling of discomfort or illness' },
  { id: 'weight_loss', name: 'Unexplained weight loss', category: 'general', description: 'Loss of weight without trying' },
  { id: 'weight_gain', name: 'Unexplained weight gain', category: 'general', description: 'Gain of weight without changes in diet or exercise' },
  { id: 'loss_of_appetite', name: 'Loss of appetite', category: 'general', description: 'Reduced desire to eat' },
  { id: 'excessive_hunger', name: 'Excessive hunger', category: 'general', description: 'Increased desire to eat despite adequate intake' },
  { id: 'night_sweats', name: 'Night sweats', category: 'general', description: 'Excessive sweating during sleep' },
  { id: 'chills', name: 'Chills', category: 'general', description: 'Feeling of cold with shivering' },
  { id: 'sudden_high_fever', name: 'Sudden high fever', category: 'general', description: 'Rapid onset of high body temperature' },
  
  // Head and neurological symptoms
  { id: 'headache', name: 'Headache', category: 'head', description: 'Pain in any region of the head' },
  { id: 'dizziness', name: 'Dizziness', category: 'head', description: 'Feeling lightheaded or unbalanced' },
  { id: 'migraine', name: 'Migraine', category: 'head', description: 'Severe, throbbing headache often accompanied by nausea' },
  { id: 'confusion', name: 'Confusion', category: 'head', description: 'Impaired ability to think clearly' },
  { id: 'memory_loss', name: 'Memory loss', category: 'head', description: 'Inability to remember information or events' },
  { id: 'difficulty_concentrating', name: 'Difficulty concentrating', category: 'head', description: 'Trouble focusing on tasks' },
  { id: 'dull_headache', name: 'Dull headache', category: 'head', description: 'Mild to moderate pain that feels like pressure' },
  { id: 'throbbing_headache', name: 'Throbbing headache', category: 'head', description: 'Pulsating pain in the head' },
  { id: 'severe_headache', name: 'Severe headache', category: 'head', description: 'Intense head pain' },
  { id: 'lightheadedness', name: 'Lightheadedness', category: 'head', description: 'Feeling faint or woozy' },
  { id: 'aura', name: 'Aura', category: 'head', description: 'Visual disturbances preceding headache' },
  { id: 'confusion', name: 'Confusion', category: 'head', description: 'Difficulty thinking clearly or focusing' },
  { id: 'difficulty_speaking', name: 'Difficulty speaking', category: 'head', description: 'Problems forming or understanding words' },
  { id: 'seizures', name: 'Seizures', category: 'head', description: 'Uncontrolled electrical activity in the brain causing convulsions' },
  { id: 'tremors', name: 'Tremors', category: 'head', description: 'Involuntary shaking movements' },
  { id: 'facial_drooping', name: 'Facial drooping', category: 'head', description: 'Weakness on one side of the face' },
  { id: 'cognitive_impairment', name: 'Cognitive impairment', category: 'head', description: 'Problems with thinking, memory, concentration, or judgment' },
  
  // Eye symptoms
  { id: 'vision_problems', name: 'Vision problems', category: 'eye', description: 'Changes in eyesight' },
  { id: 'blurred_vision', name: 'Blurred vision', category: 'eye', description: 'Lack of sharpness in vision' },
  { id: 'sensitivity_to_light', name: 'Sensitivity to light', category: 'eye', description: 'Discomfort from bright light' },
  { id: 'itchy_eyes', name: 'Itchy eyes', category: 'eye', description: 'Irritating sensation in eyes causing desire to rub' },
  { id: 'watery_eyes', name: 'Watery eyes', category: 'eye', description: 'Excess tears' },
  { id: 'eye_problems', name: 'Eye problems', category: 'eye', description: 'Any unusual sensation or appearance in the eyes' },
  { id: 'decreased_sense_of_smell', name: 'Decreased sense of smell', category: 'eye', description: 'Reduced ability to detect odors' },
  { id: 'double_vision', name: 'Double vision', category: 'eye', description: 'Seeing two images of a single object' },
  { id: 'loss_of_vision', name: 'Loss of vision', category: 'eye', description: 'Partial or complete inability to see' },
  { id: 'eye_pain', name: 'Eye pain', category: 'eye', description: 'Discomfort or pain in or around the eyes' },
  
  // Ear, Nose and Throat symptoms
  { id: 'sore_throat', name: 'Sore throat', category: 'ENT', description: 'Pain or irritation in the throat' },
  { id: 'runny_nose', name: 'Runny nose', category: 'ENT', description: 'Excess nasal drainage' },
  { id: 'congestion', name: 'Nasal congestion', category: 'ENT', description: 'Stuffy or blocked nose' },
  { id: 'sneezing', name: 'Sneezing', category: 'ENT', description: 'Sudden, forceful expulsion of air through the nose and mouth' },
  { id: 'loss_of_taste', name: 'Loss of taste', category: 'ENT', description: 'Inability to detect flavors' },
  { id: 'loss_of_smell', name: 'Loss of smell', category: 'ENT', description: 'Inability to detect odors' },
  { id: 'hoarseness', name: 'Hoarseness', category: 'ENT', description: 'Abnormal change in voice' },
  { id: 'ear_pain', name: 'Ear pain', category: 'ENT', description: 'Discomfort or pain in one or both ears' },
  { id: 'ringing_in_ears', name: 'Ringing in ears', category: 'ENT', description: 'Perception of sound when no external sound is present' },
  { id: 'hearing_loss', name: 'Hearing loss', category: 'ENT', description: 'Partial or complete inability to hear' },
  { id: 'itchy_throat', name: 'Itchy throat', category: 'ENT', description: 'Irritating sensation in throat' },
  { id: 'facial_pain', name: 'Facial pain', category: 'ENT', description: 'Pain in the face, often around sinuses' },
  { id: 'post_nasal_drip', name: 'Post-nasal drip', category: 'ENT', description: 'Mucus dripping from the back of the nose into the throat' },
  { id: 'sensation_of_lump_in_throat', name: 'Sensation of lump in throat', category: 'ENT', description: 'Feeling like something is stuck in the throat' },
  
  // Respiratory symptoms
  { id: 'cough', name: 'Cough', category: 'respiratory', description: 'Sudden expulsion of air from the lungs' },
  { id: 'shortness_of_breath', name: 'Shortness of breath', category: 'respiratory', description: 'Difficulty breathing or feeling breathless' },
  { id: 'wheezing', name: 'Wheezing', category: 'respiratory', description: 'Whistling sound when breathing' },
  { id: 'chronic_cough', name: 'Chronic cough', category: 'respiratory', description: 'Persistent cough lasting more than 8 weeks' },
  { id: 'coughing_up_blood', name: 'Coughing up blood', category: 'respiratory', description: 'Blood expelled during coughing' },
  { id: 'mucus_production', name: 'Mucus production', category: 'respiratory', description: 'Excess discharge from airways' },
  { id: 'persistent_cough', name: 'Persistent cough', category: 'respiratory', description: 'Cough that doesn\'t go away' },
  { id: 'rapid_breathing', name: 'Rapid breathing', category: 'respiratory', description: 'Breathing faster than normal' },
  { id: 'chest_tightness', name: 'Chest tightness', category: 'respiratory', description: 'Feeling of constriction or pressure in the chest' },
  { id: 'trouble_sleeping', name: 'Trouble sleeping', category: 'respiratory', description: 'Difficulty falling or staying asleep' },
  { id: 'labored_breathing', name: 'Labored breathing', category: 'respiratory', description: 'Breathing that requires effort' },
  { id: 'shallow_breathing', name: 'Shallow breathing', category: 'respiratory', description: 'Breathing that doesn\'t fill the lungs completely' },
  { id: 'chest_congestion', name: 'Chest congestion', category: 'respiratory', description: 'Mucus buildup in the chest' },
  { id: 'frequent_respiratory_infections', name: 'Frequent Respiratory Infections', category: 'respiratory', description: 'Repeated episodes of respiratory tract infections' },
  
  // Cardiovascular symptoms
  { id: 'chest_pain', name: 'Chest pain', category: 'cardiovascular', description: 'Discomfort in the chest area' },
  { id: 'heart_palpitations', name: 'Heart palpitations', category: 'cardiovascular', description: 'Sensation of heart beating rapidly, fluttering or pounding' },
  { id: 'pain_radiating_to_arm', name: 'Pain radiating to arm', category: 'cardiovascular', description: 'Chest pain that extends to the arm, usually the left' },
  { id: 'pain_radiating_to_jaw', name: 'Pain radiating to jaw', category: 'cardiovascular', description: 'Chest pain that extends to the jaw' },
  { id: 'rapid_heartbeat', name: 'Rapid heartbeat', category: 'cardiovascular', description: 'Heart beating faster than normal' },
  { id: 'irregular_heartbeat', name: 'Irregular heartbeat', category: 'cardiovascular', description: 'Heart rhythm that is uneven' },
  { id: 'pressure_in_chest', name: 'Pressure in chest', category: 'cardiovascular', description: 'Sensation of weight or squeezing in chest' },
  { id: 'cold_sweat', name: 'Cold sweat', category: 'cardiovascular', description: 'Sudden sweating with cold, clammy skin' },
  { id: 'swelling_in_legs', name: 'Swelling in legs', category: 'cardiovascular', description: 'Fluid retention in legs' },
  { id: 'swelling_in_ankles', name: 'Swelling in ankles', category: 'cardiovascular', description: 'Fluid retention in ankles' },
  { id: 'swelling_in_feet', name: 'Swelling in feet', category: 'cardiovascular', description: 'Fluid retention in feet' },
  { id: 'leg_pain_when_walking', name: 'Leg pain when walking', category: 'cardiovascular', description: 'Pain in legs that occurs with activity and improves with rest' },
  { id: 'leg_cramps', name: 'Leg cramps', category: 'cardiovascular', description: 'Sudden, painful tightening of muscles in the leg' },
  
  // Digestive symptoms
  { id: 'nausea', name: 'Nausea', category: 'digestive', description: 'Feeling of discomfort in the stomach with an urge to vomit' },
  { id: 'vomiting', name: 'Vomiting', category: 'digestive', description: 'Forceful expulsion of stomach contents through the mouth' },
  { id: 'diarrhea', name: 'Diarrhea', category: 'digestive', description: 'Loose, watery bowel movements' },
  { id: 'constipation', name: 'Constipation', category: 'digestive', description: 'Difficulty passing stool or infrequent bowel movements' },
  { id: 'abdominal_pain', name: 'Abdominal pain', category: 'digestive', description: 'Pain in the area between the chest and groin' },
  { id: 'bloating', name: 'Bloating', category: 'digestive', description: 'Sensation of fullness or swelling in the abdomen' },
  { id: 'heartburn', name: 'Heartburn', category: 'digestive', description: 'Burning sensation in the chest' },
  { id: 'regurgitation', name: 'Regurgitation', category: 'digestive', description: 'Bitter or sour taste in the mouth due to stomach contents flowing back up' },
  { id: 'difficulty_swallowing', name: 'Difficulty swallowing', category: 'digestive', description: 'Trouble or pain when swallowing' },
  { id: 'rectal_bleeding', name: 'Rectal bleeding', category: 'digestive', description: 'Passage of blood from the rectum' },
  { id: 'bloody_stool', name: 'Bloody stool', category: 'digestive', description: 'Presence of blood in feces' },
  { id: 'dark_stools', name: 'Dark stools', category: 'digestive', description: 'Black or tarry feces, often indicating blood' },
  { id: 'upper_abdominal_pain', name: 'Upper abdominal pain', category: 'digestive', description: 'Pain in the area below the chest and above the navel' },
  { id: 'abdominal_pain_radiating_to_back', name: 'Abdominal pain radiating to back', category: 'digestive', description: 'Stomach pain that extends to the back' },
  { id: 'gnawing_abdominal_pain', name: 'Gnawing abdominal pain', category: 'digestive', description: 'Persistent, nagging pain in the abdomen' },
  { id: 'tenderness_when_touching_abdomen', name: 'Tenderness when touching abdomen', category: 'digestive', description: 'Pain when pressure is applied to the abdomen' },
  { id: 'rectal_pain', name: 'Rectal pain', category: 'digestive', description: 'Pain in or around the rectum' },
  { id: 'urgency_to_defecate', name: 'Urgency to defecate', category: 'digestive', description: 'Sudden, intense need to have a bowel movement' },
  { id: 'inability_to_defecate_despite_urgency', name: 'Inability to defecate despite urgency', category: 'digestive', description: 'Feeling the need to have a bowel movement but unable to pass stool' },
  { id: 'gas', name: 'Gas', category: 'digestive', description: 'Excess air in the digestive tract' },
  { id: 'acid_reflux', name: 'Acid reflux', category: 'digestive', description: 'Backward flow of stomach acid into the esophagus' },
  { id: 'feeling_full_quickly', name: 'Feeling full quickly', category: 'digestive', description: 'Being satisfied with smaller amounts of food than usual' },
  { id: 'intolerance_to_fatty_foods', name: 'Intolerance to fatty foods', category: 'digestive', description: 'Digestive discomfort after eating fatty foods' },
  { id: 'jaundice', name: 'Jaundice', category: 'digestive', description: 'Yellowing of the skin and whites of the eyes' },
  
  // Skin symptoms
  { id: 'rash', name: 'Skin rash', category: 'skin', description: 'Area of irritated or swollen skin' },
  { id: 'itching', name: 'Itching', category: 'skin', description: 'Irritating sensation causing desire to scratch' },
  { id: 'hives', name: 'Hives', category: 'skin', description: 'Raised, itchy welts on the skin' },
  { id: 'dry_skin', name: 'Dry skin', category: 'skin', description: 'Skin that lacks moisture' },
  { id: 'excessive_sweating', name: 'Excessive sweating', category: 'skin', description: 'Abnormal amount of perspiration' },
  { id: 'skin_nodules', name: 'Skin nodules', category: 'skin', description: 'Small lumps under the skin' },
  { id: 'skin_discoloration', name: 'Skin discoloration', category: 'skin', description: 'Changes in skin color' },
  { id: 'flushing', name: 'Flushing', category: 'skin', description: 'Temporary redness of face and neck' },
  { id: 'cold_hands_or_feet', name: 'Cold hands or feet', category: 'skin', description: 'Extremities that feel cold to the touch' },
  { id: 'easy_bruising', name: 'Easy bruising', category: 'skin', description: 'Tendency to develop bruises with minor trauma' },
  { id: 'slow_healing_wounds', name: 'Slow healing wounds', category: 'skin', description: 'Injuries that take longer than usual to heal' },
  { id: 'red_patches', name: 'Red patches', category: 'skin', description: 'Areas of reddened skin' },
  { id: 'silvery_scales', name: 'Silvery scales', category: 'skin', description: 'Flaky, silver-white patches on skin' },
  { id: 'skin_ulcers', name: 'Skin ulcers', category: 'skin', description: 'Open sores on the skin' },
  { id: 'unusual_moles', name: 'Unusual moles', category: 'skin', description: 'Atypical skin growths with irregular features' },
  { id: 'changes_in_existing_moles', name: 'Changes in existing moles', category: 'skin', description: 'Alterations in size, shape, or color of moles' },
  { id: 'thickened_cracked_skin', name: 'Thickened cracked skin', category: 'skin', description: 'Skin that is both thick and has fissures' },
  { id: 'facial_redness', name: 'Facial redness', category: 'skin', description: 'Persistent redness of the face' },
  { id: 'red_rashes', name: 'Red rashes', category: 'skin', description: 'Reddened areas of skin with distinct borders' },
  { id: 'small_raised_bumps', name: 'Small raised bumps', category: 'skin', description: 'Elevated areas of skin' },
  { id: 'burning_sensation', name: 'Burning sensation', category: 'skin', description: 'Feeling of heat without actual temperature change' },
  { id: 'dark_skin_patches', name: 'Dark skin patches', category: 'skin', description: 'Areas of hyperpigmentation' },
  { id: 'swollen_red_bumps', name: 'Swollen red bumps', category: 'skin', description: 'Raised, inflamed areas on skin' },
  { id: 'nosebleeds', name: 'Nosebleeds', category: 'skin', description: 'Bleeding from the nostrils' },
  
  // Musculoskeletal symptoms
  { id: 'joint_pain', name: 'Joint pain', category: 'musculoskeletal', description: 'Discomfort in one or more joints' },
  { id: 'muscle_pain', name: 'Muscle pain', category: 'musculoskeletal', description: 'Pain affecting one or more muscles' },
  { id: 'back_pain', name: 'Back pain', category: 'musculoskeletal', description: 'Discomfort in the upper, middle, or lower back' },
  { id: 'stiffness', name: 'Stiffness', category: 'musculoskeletal', description: 'Restricted movement or discomfort when moving' },
  { id: 'swelling', name: 'Swelling', category: 'musculoskeletal', description: 'Enlargement of affected area due to fluid accumulation' },
  { id: 'muscle_weakness', name: 'Muscle weakness', category: 'musculoskeletal', description: 'Reduced strength in one or more muscles' },
  { id: 'loss_of_range_of_motion', name: 'Loss of range of motion', category: 'musculoskeletal', description: 'Decreased ability to move a joint' },
  { id: 'tender_swollen_joints', name: 'Tender swollen joints', category: 'musculoskeletal', description: 'Joints that are painful to touch and enlarged' },
  { id: 'joint_stiffness', name: 'Joint stiffness', category: 'musculoskeletal', description: 'Difficulty moving a joint, especially after rest' },
  { id: 'muscle_cramps', name: 'Muscle cramps', category: 'musculoskeletal', description: 'Sudden, involuntary muscle contractions' },
  { id: 'body_aches', name: 'Body aches', category: 'musculoskeletal', description: 'Generalized pain throughout the body' },
  { id: 'bone_pain', name: 'Bone pain', category: 'musculoskeletal', description: 'Deep, penetrating, or dull pain in the bones' },
  { id: 'loss_of_balance', name: 'Loss of balance', category: 'musculoskeletal', description: 'Difficulty maintaining equilibrium' },
  { id: 'coordination_problems', name: 'Coordination problems', category: 'musculoskeletal', description: 'Difficulty performing physical movements smoothly' },
  { id: 'severe_joint_pain', name: 'Severe joint pain', category: 'musculoskeletal', description: 'Intense pain in one or more joints' },
  { id: 'symmetric_pattern_of_affected_joints', name: 'Symmetric pattern of affected joints', category: 'musculoskeletal', description: 'Same joints affected on both sides of the body' },
  { id: 'grating_sensation', name: 'Grating sensation', category: 'musculoskeletal', description: 'Feeling or sound of bone rubbing on bone' },
  { id: 'bone_spurs', name: 'Bone spurs', category: 'musculoskeletal', description: 'Extra bone growth at joints or on bone' },
  { id: 'stooped_posture', name: 'Stooped posture', category: 'musculoskeletal', description: 'Forward bending of the upper body' },
  { id: 'bone_fracture_with_minimal_trauma', name: 'Bone fracture with minimal trauma', category: 'musculoskeletal', description: 'Breaking a bone with little or no apparent cause' },
  
  // Urinary symptoms
  { id: 'frequent_urination', name: 'Frequent urination', category: 'urinary', description: 'Need to urinate more often than usual' },
  { id: 'painful_urination', name: 'Painful urination', category: 'urinary', description: 'Discomfort when passing urine' },
  { id: 'blood_in_urine', name: 'Blood in urine', category: 'urinary', description: 'Presence of blood in urine' },
  { id: 'cloudy_urine', name: 'Cloudy urine', category: 'urinary', description: 'Urine that appears murky' },
  { id: 'dark_urine', name: 'Dark urine', category: 'urinary', description: 'Urine that is amber or brown in color' },
  { id: 'urgency_to_urinate', name: 'Urgency to urinate', category: 'urinary', description: 'Sudden, compelling need to urinate' },
  { id: 'decreased_urine_output', name: 'Decreased urine output', category: 'urinary', description: 'Producing less urine than normal' },
  { id: 'increased_urination_at_night', name: 'Increased urination at night', category: 'urinary', description: 'Waking during the night to urinate' },
  { id: 'incontinence', name: 'Incontinence', category: 'urinary', description: 'Inability to control urination' },
  { id: 'pelvic_pain', name: 'Pelvic pain', category: 'urinary', description: 'Discomfort in the lower abdomen' },
  
  // Psychological and neurological symptoms
  { id: 'anxiety', name: 'Anxiety', category: 'psychological', description: 'Feeling of worry, nervousness, or unease' },
  { id: 'depression', name: 'Depression', category: 'psychological', description: 'Persistent feelings of sadness and loss of interest' },
  { id: 'irritability', name: 'Irritability', category: 'psychological', description: 'Easily annoyed or agitated' },
  { id: 'mood_swings', name: 'Mood swings', category: 'psychological', description: 'Rapid, unexplained changes in mood' },
  { id: 'sleep_problems', name: 'Sleep problems', category: 'psychological', description: 'Difficulty falling asleep or staying asleep' },
  { id: 'changes_in_mood', name: 'Changes in mood', category: 'psychological', description: 'Alterations in emotional state' },
  { id: 'suicidal_thoughts', name: 'Suicidal thoughts', category: 'psychological', description: 'Thinking about or planning to end one\'s life' },
  { id: 'excessive_worry', name: 'Excessive worry', category: 'psychological', description: 'Persistent concern about future events' },
  { id: 'racing_heart', name: 'Racing heart', category: 'psychological', description: 'Heart beating rapidly due to anxiety' },
  { id: 'persistent_sadness', name: 'Persistent sadness', category: 'psychological', description: 'Ongoing feelings of despair or unhappiness' },
  { id: 'feelings_of_worthlessness', name: 'Feelings of worthlessness', category: 'psychological', description: 'Belief that one has no value' },
  { id: 'changes_in_appetite', name: 'Changes in appetite', category: 'psychological', description: 'Eating significantly more or less than usual' },
  { id: 'restlessness', name: 'Restlessness', category: 'psychological', description: 'Inability to remain still or quiet' },
  { id: 'intrusive_memories', name: 'Intrusive memories', category: 'psychological', description: 'Unwanted recollections of traumatic events' },
  { id: 'flashbacks', name: 'Flashbacks', category: 'psychological', description: 'Vivid sensation of reliving a traumatic event' },
  { id: 'avoidance', name: 'Avoidance', category: 'psychological', description: 'Staying away from people, places or activities' },
  { id: 'negative_changes_in_thinking', name: 'Negative changes in thinking', category: 'psychological', description: 'Persistent negative thoughts about self or the world' },
  { id: 'elevated_mood', name: 'Elevated mood', category: 'psychological', description: 'Unusually upbeat or excited state' },
  { id: 'increased_energy', name: 'Increased energy', category: 'psychological', description: 'Abnormally high energy levels' },
  { id: 'reduced_need_for_sleep', name: 'Reduced need for sleep', category: 'psychological', description: 'Feeling rested after much less sleep than usual' },
  { id: 'racing_thoughts', name: 'Racing thoughts', category: 'psychological', description: 'Thoughts that come rapidly and seem to tumble over one another' },
  { id: 'unwanted_thoughts', name: 'Unwanted thoughts', category: 'psychological', description: 'Persistent, intrusive thoughts that cause anxiety' },
  { id: 'aggressive_thoughts', name: 'Aggressive thoughts', category: 'psychological', description: 'Violent or harmful thoughts toward self or others' },
  { id: 'hallucinations', name: 'Hallucinations', category: 'psychological', description: 'Seeing, hearing, feeling, or smelling things that aren\'t there' },
  { id: 'paranoia', name: 'Paranoia', category: 'psychological', description: 'Intense, unfounded mistrust of others' },
  { id: 'withdrawal', name: 'Withdrawal', category: 'psychological', description: 'Avoidance of social interaction' },
  { id: 'personality_changes', name: 'Personality changes', category: 'psychological', description: 'Noticeable differences in behavior and character' },
  
  // Symptoms related to specific body parts or systems
  { id: 'numbness', name: 'Numbness', category: 'neurological', description: 'Lack of sensation in a body part' },
  { id: 'tingling', name: 'Tingling', category: 'neurological', description: 'Prickling or pins-and-needles sensation' },
  { id: 'sudden_numbness', name: 'Sudden numbness', category: 'neurological', description: 'Rapid onset of loss of sensation' },
  { id: 'numbness_in_legs', name: 'Numbness in legs', category: 'neurological', description: 'Loss of sensation in the legs' },
  { id: 'tingling_sensation', name: 'Tingling sensation', category: 'neurological', description: 'Pins and needles feeling' },
  { id: 'psychic_symptoms', name: 'Psychic symptoms', category: 'neurological', description: 'Sensations like déjà vu before a seizure' },
  { id: 'temporary_confusion', name: 'Temporary confusion', category: 'neurological', description: 'Brief periods of disorientation' },
  { id: 'staring_spells', name: 'Staring spells', category: 'neurological', description: 'Episodes of fixed gaze without response' },
  { id: 'uncontrollable_jerking_movements', name: 'Uncontrollable jerking movements', category: 'neurological', description: 'Involuntary muscle contractions' },
  { id: 'loss_of_consciousness', name: 'Loss of consciousness', category: 'neurological', description: 'Temporary loss of awareness' },
  { id: 'slowed_movement', name: 'Slowed movement', category: 'neurological', description: 'Reduced speed of physical actions' },
  { id: 'rigid_muscles', name: 'Rigid muscles', category: 'neurological', description: 'Stiffness in the muscles' },
  { id: 'impaired_posture', name: 'Impaired posture', category: 'neurological', description: 'Abnormal body positioning' },
  { id: 'balance_problems', name: 'Balance problems', category: 'neurological', description: 'Difficulty maintaining equilibrium' },
  { id: 'speech_changes', name: 'Speech changes', category: 'neurological', description: 'Alterations in the way someone talks' },
  { id: 'writing_changes', name: 'Writing changes', category: 'neurological', description: 'Alterations in handwriting, often becoming smaller' },
  { id: 'difficulty_solving_problems', name: 'Difficulty solving problems', category: 'neurological', description: 'Trouble figuring out solutions' },
  { id: 'difficulty_completing_familiar_tasks', name: 'Difficulty completing familiar tasks', category: 'neurological', description: 'Trouble with routine activities' },
  { id: 'disorientation', name: 'Disorientation', category: 'neurological', description: 'Confusion about time, place, or identity' }
];

export const symptomCategories = [
  { id: 'general', name: 'General Symptoms' },
  { id: 'head', name: 'Head & Neurological' },
  { id: 'eye', name: 'Eye Problems' },
  { id: 'ENT', name: 'Ear, Nose & Throat' },
  { id: 'respiratory', name: 'Respiratory' },
  { id: 'cardiovascular', name: 'Heart & Circulation' },
  { id: 'digestive', name: 'Digestive' },
  { id: 'skin', name: 'Skin' },
  { id: 'musculoskeletal', name: 'Muscles & Joints' },
  { id: 'urinary', name: 'Urinary' },
  { id: 'psychological', name: 'Mental Health' },
  { id: 'neurological', name: 'Neurological' },
  { id: 'other', name: 'Other Symptoms' },
];

export function getSymptomsByCategory() {
  return symptomCategories.map(category => ({
    category,
    symptoms: symptoms.filter(symptom => symptom.category === category.id)
  }));
}

export function getAllSymptoms() {
  return symptoms;
}

export function getSymptomById(id: string) {
  return symptoms.find(symptom => symptom.id === id);
}

export function getCommonSymptomGroups() {
  return {
    cold: ['runny_nose', 'congestion', 'sore_throat', 'cough', 'sneezing', 'mild_fever'],
    flu: ['fever', 'cough', 'sore_throat', 'body_aches', 'fatigue', 'headache', 'chills'],
    allergies: ['sneezing', 'itchy_eyes', 'runny_nose', 'congestion', 'itchy_throat'],
    digestiveIssues: ['nausea', 'vomiting', 'diarrhea', 'abdominal_pain', 'bloating'],
    headaches: ['headache', 'sensitivity_to_light', 'sensitivity_to_sound', 'nausea'],
    heartProblems: ['chest_pain', 'shortness_of_breath', 'fatigue', 'rapid_heartbeat', 'dizziness']
  };
}
