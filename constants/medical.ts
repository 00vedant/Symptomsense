import { SeverityLevel, Symptom } from '@/types/medical';

export const SEVERITY_LEVELS: Record<string, SeverityLevel> = {
  green: {
    level: 'green',
    label: 'Low Risk',
    description: 'Minor symptoms that may resolve with self-care',
    action: 'Consider self-care measures. Monitor symptoms.',
    color: '#059669',
    backgroundColor: '#F0FDF4',
  },
  yellow: {
    level: 'yellow',
    label: 'Moderate',
    description: 'Symptoms that warrant medical attention',
    action: 'Schedule appointment with healthcare provider within a few days',
    color: '#D97706',
    backgroundColor: '#FFFBEB',
  },
  orange: {
    level: 'orange',
    label: 'Concerning',
    description: 'Symptoms requiring prompt medical evaluation',
    action: 'Seek medical attention within 24-48 hours',
    color: '#EA580C',
    backgroundColor: '#FFF7ED',
  },
  red: {
    level: 'red',
    label: 'Urgent',
    description: 'Serious symptoms requiring immediate attention',
    action: 'Seek immediate medical care or visit emergency room',
    color: '#DC2626',
    backgroundColor: '#FEF2F2',
  },
  black: {
    level: 'black',
    label: 'Emergency',
    description: 'Life-threatening symptoms',
    action: 'Call emergency services immediately (911)',
    color: '#1F2937',
    backgroundColor: '#F9FAFB',
  },
};

export const COMMON_SYMPTOMS: Symptom[] = [
  {
    id: '1',
    name: 'Headache',
    description: 'Pain or discomfort in the head or neck area',
    severity: 'low',
    category: 'Neurological',
    commonCauses: ['Tension', 'Dehydration', 'Stress', 'Lack of sleep'],
    redFlags: ['Sudden severe onset', 'Fever', 'Vision changes', 'Neck stiffness'],
  },
  {
    id: '2',
    name: 'Chest Pain',
    description: 'Pain or discomfort in the chest area',
    severity: 'urgent',
    category: 'Cardiovascular',
    commonCauses: ['Muscle strain', 'Acid reflux', 'Anxiety'],
    redFlags: ['Crushing pain', 'Shortness of breath', 'Sweating', 'Nausea'],
  },
  {
    id: '3',
    name: 'Fever',
    description: 'Body temperature above normal range',
    severity: 'moderate',
    category: 'General',
    commonCauses: ['Infection', 'Inflammation', 'Heat exhaustion'],
    redFlags: ['Very high fever (>104°F)', 'Severe headache', 'Difficulty breathing'],
  },
];

export const DISCLAIMER = {
  title: 'Important Medical Disclaimer',
  content: `This app is for educational and informational purposes only. It does not provide medical advice, diagnosis, or treatment. Always consult qualified healthcare professionals for medical concerns.

🚨 EMERGENCY: If you're experiencing a medical emergency, call 108 immediately.

This tool cannot replace professional medical judgment and should never be used to make treatment decisions.`,
};