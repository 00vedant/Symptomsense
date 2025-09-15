export interface Disease {
  id: string;
  name: string;
  symptoms: string[];
  severity: 'low' | 'moderate' | 'concerning' | 'urgent' | 'emergency';
  description: string;
  commonCauses: string[];
  recommendations: string[];
  medicines?: string[];
  emergencySymptoms: string[];
}

export const DISEASES_DATABASE: Disease[] = [
  {
    id: 'common_cold',
    name: 'Common Cold',
    symptoms: ['runny nose', 'sneezing', 'cough', 'sore throat', 'mild headache', 'congestion', 'low fever'],
    severity: 'low',
    description: 'A viral infection of the upper respiratory tract',
    commonCauses: ['Rhinovirus', 'Coronavirus', 'Respiratory syncytial virus'],
    recommendations: [
      'Get plenty of rest',
      'Stay hydrated',
      'Use saline nasal drops',
      'Consider over-the-counter pain relievers',
      'Gargle with warm salt water'
    ],
    medicines: [
      'Paracetamol 500mg for fever/headache',
      'Cetirizine 10mg for runny nose',
      'Throat lozenges for sore throat',
      'Saline nasal spray for congestion'
    ],
    emergencySymptoms: []
  },
  {
    id: 'flu',
    name: 'Influenza (Flu)',
    symptoms: ['high fever', 'body aches', 'fatigue', 'headache', 'cough', 'sore throat', 'chills'],
    severity: 'moderate',
    description: 'A viral infection that attacks the respiratory system',
    commonCauses: ['Influenza A virus', 'Influenza B virus'],
    recommendations: [
      'Rest and stay home',
      'Drink plenty of fluids',
      'Consider antiviral medications if caught early',
      'Use fever reducers as needed',
      'Seek medical attention if symptoms worsen'
    ],
    medicines: [
      'Paracetamol 500mg every 6 hours for fever',
      'Ibuprofen 400mg for body aches',
      'ORS packets for hydration',
      'Cough syrup (Dextromethorphan) for dry cough'
    ],
    emergencySymptoms: ['difficulty breathing', 'chest pain', 'persistent vomiting']
  },
  {
    id: 'migraine',
    name: 'Migraine Headache',
    symptoms: ['severe headache', 'nausea', 'vomiting', 'sensitivity to light', 'sensitivity to sound', 'visual disturbances'],
    severity: 'moderate',
    description: 'A neurological condition causing intense headaches',
    commonCauses: ['Stress', 'Hormonal changes', 'Certain foods', 'Sleep changes', 'Weather changes'],
    recommendations: [
      'Rest in a dark, quiet room',
      'Apply cold or warm compress',
      'Stay hydrated',
      'Consider over-the-counter pain relievers',
      'Identify and avoid triggers'
    ],
    medicines: [
      'Sumatriptan 50mg for acute migraine',
      'Paracetamol 1000mg + Domperidone 10mg',
      'Ibuprofen 600mg for pain relief',
      'Anti-nausea medication (Ondansetron 4mg)'
    ],
    emergencySymptoms: ['sudden severe headache', 'fever with headache', 'confusion', 'vision loss']
  },
  {
    id: 'food_poisoning',
    name: 'Food Poisoning',
    symptoms: ['nausea', 'vomiting', 'diarrhea', 'stomach cramps', 'fever', 'headache'],
    severity: 'moderate',
    description: 'Illness caused by consuming contaminated food or water',
    commonCauses: ['Salmonella', 'E. coli', 'Norovirus', 'Campylobacter'],
    recommendations: [
      'Stay hydrated with clear fluids',
      'Rest and avoid solid foods initially',
      'Gradually return to bland foods',
      'Avoid dairy and fatty foods',
      'Seek medical attention if symptoms persist'
    ],
    medicines: [
      'ORS packets for rehydration',
      'Loperamide 2mg for diarrhea (if no fever)',
      'Ondansetron 4mg for vomiting',
      'Probiotics to restore gut flora'
    ],
    emergencySymptoms: ['severe dehydration', 'high fever', 'blood in stool', 'severe abdominal pain']
  },
  {
    id: 'urinary_tract_infection',
    name: 'Urinary Tract Infection (UTI)',
    symptoms: ['burning urination', 'frequent urination', 'cloudy urine', 'strong urine odor', 'pelvic pain', 'blood in urine'],
    severity: 'moderate',
    description: 'Bacterial infection of the urinary system',
    commonCauses: ['E. coli bacteria', 'Sexual activity', 'Poor hygiene', 'Kidney stones'],
    recommendations: [
      'Drink plenty of water',
      'Urinate frequently',
      'Wipe front to back',
      'Avoid irritating feminine products',
      'See a healthcare provider for antibiotic treatment'
    ],
    medicines: [
      'Cranberry supplements for prevention',
      'Paracetamol 500mg for pain relief',
      'Potassium citrate for urinary alkalinization',
      'Antibiotics (requires prescription - see doctor)'
    ],
    emergencySymptoms: ['high fever', 'severe back pain', 'nausea and vomiting']
  },
  {
    id: 'pneumonia',
    name: 'Pneumonia',
    symptoms: ['cough with phlegm', 'fever', 'chills', 'difficulty breathing', 'chest pain', 'fatigue'],
    severity: 'concerning',
    description: 'Infection that inflames air sacs in one or both lungs',
    commonCauses: ['Streptococcus pneumoniae', 'Viral infections', 'Mycoplasma pneumoniae'],
    recommendations: [
      'Seek medical attention promptly',
      'Take prescribed antibiotics as directed',
      'Get plenty of rest',
      'Stay hydrated',
      'Use a humidifier'
    ],
    medicines: [
      'Antibiotics (requires prescription)',
      'Paracetamol for fever and pain',
      'Expectorant cough syrup',
      'Steam inhalation for congestion'
    ],
    emergencySymptoms: ['severe difficulty breathing', 'chest pain', 'high fever', 'confusion']
  },
  {
    id: 'heart_attack',
    name: 'Heart Attack',
    symptoms: ['chest pain', 'shortness of breath', 'nausea', 'sweating', 'pain in arm', 'jaw pain', 'dizziness'],
    severity: 'emergency',
    description: 'Blockage of blood flow to the heart muscle',
    commonCauses: ['Coronary artery disease', 'Blood clots', 'Plaque buildup'],
    recommendations: [
      'Call emergency services immediately (108)',
      'Chew aspirin if not allergic',
      'Stay calm and rest',
      'Do not drive yourself to hospital'
    ],
    medicines: [
      'Aspirin 300mg (chew immediately)',
      'Nitroglycerin (if prescribed)',
      'Emergency medications given by paramedics',
      'Hospital treatment required immediately'
    ],
    emergencySymptoms: ['chest pain', 'shortness of breath', 'sweating', 'nausea']
  },
  {
    id: 'stroke',
    name: 'Stroke',
    symptoms: ['sudden weakness', 'face drooping', 'speech difficulty', 'confusion', 'severe headache', 'vision problems'],
    severity: 'emergency',
    description: 'Interruption of blood supply to the brain',
    commonCauses: ['Blood clots', 'Bleeding in brain', 'High blood pressure'],
    recommendations: [
      'Call emergency services immediately (108)',
      'Note time symptoms started',
      'Do not give food or water',
      'Keep person calm and lying down'
    ],
    medicines: [
      'Emergency clot-busting drugs (hospital only)',
      'Blood thinners (hospital treatment)',
      'Blood pressure medications',
      'Immediate hospital intervention required'
    ],
    emergencySymptoms: ['sudden weakness', 'face drooping', 'speech difficulty', 'severe headache']
  },
  {
    id: 'appendicitis',
    name: 'Appendicitis',
    symptoms: ['abdominal pain', 'nausea', 'vomiting', 'fever', 'loss of appetite', 'pain in right side'],
    severity: 'urgent',
    description: 'Inflammation of the appendix',
    commonCauses: ['Blockage of appendix', 'Infection'],
    recommendations: [
      'Seek immediate medical attention',
      'Do not eat or drink',
      'Do not take pain medications',
      'Go to emergency room'
    ],
    medicines: [
      'No self-medication recommended',
      'Antibiotics (hospital treatment)',
      'Pain management (hospital only)',
      'Surgery may be required'
    ],
    emergencySymptoms: ['severe abdominal pain', 'high fever', 'vomiting']
  },
  {
    id: 'asthma_attack',
    name: 'Asthma Attack',
    symptoms: ['difficulty breathing', 'wheezing', 'chest tightness', 'coughing', 'shortness of breath'],
    severity: 'urgent',
    description: 'Sudden worsening of asthma symptoms',
    commonCauses: ['Allergens', 'Exercise', 'Cold air', 'Stress', 'Infections'],
    recommendations: [
      'Use rescue inhaler immediately',
      'Sit upright',
      'Stay calm',
      'Seek medical attention if no improvement',
      'Call emergency services if severe'
    ],
    medicines: [
      'Salbutamol inhaler (rescue inhaler)',
      'Prednisolone tablets (if prescribed)',
      'Nebulizer treatment (hospital/clinic)',
      'Emergency bronchodilators (hospital)'
    ],
    emergencySymptoms: ['severe difficulty breathing', 'inability to speak', 'blue lips or face']
  }
];

export function findMatchingDiseases(symptoms: string[]): Disease[] {
  const normalizedSymptoms = symptoms.map(s => s.toLowerCase().trim());
  
  return DISEASES_DATABASE.filter(disease => {
    const matchCount = disease.symptoms.filter(symptom => 
      normalizedSymptoms.some(userSymptom => 
        userSymptom.includes(symptom.toLowerCase()) || 
        symptom.toLowerCase().includes(userSymptom)
      )
    ).length;
    
    // Return diseases with at least 2 matching symptoms or 1 if it's a critical symptom
    return matchCount >= 2 || (matchCount >= 1 && disease.severity === 'emergency');
  }).sort((a, b) => {
    // Sort by severity (emergency first, then by match count)
    const severityOrder = { emergency: 5, urgent: 4, concerning: 3, moderate: 2, low: 1 };
    return severityOrder[b.severity] - severityOrder[a.severity];
  });
}

export function extractSymptomsFromText(text: string): string[] {
  const symptomKeywords = [
    'headache', 'fever', 'cough', 'sore throat', 'runny nose', 'sneezing',
    'nausea', 'vomiting', 'diarrhea', 'stomach pain', 'abdominal pain',
    'chest pain', 'difficulty breathing', 'shortness of breath', 'wheezing',
    'dizziness', 'fatigue', 'weakness', 'body aches', 'chills',
    'burning urination', 'frequent urination', 'back pain', 'joint pain',
    'rash', 'itching', 'swelling', 'confusion', 'vision problems'
  ];
  
  const text_lower = text.toLowerCase();
  return symptomKeywords.filter(symptom => text_lower.includes(symptom));
}