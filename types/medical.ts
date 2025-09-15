export interface Symptom {
  id: string;
  name: string;
  description: string;
  severity: 'low' | 'moderate' | 'concerning' | 'urgent' | 'emergency';
  category: string;
  commonCauses: string[];
  redFlags: string[];
}

export interface SeverityLevel {
  level: 'green' | 'yellow' | 'orange' | 'red' | 'black';
  label: string;
  description: string;
  action: string;
  color: string;
  backgroundColor: string;
}

export interface HealthcareProvider {
  id: string;
  name: string;
  specialty: string;
  address: string;
  phone: string;
  distance: number;
  rating: number;
  acceptsInsurance: boolean;
  availability: 'available' | 'busy' | 'closed';
}

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  gender: string;
  medicalHistory: string[];
  allergies: string[];
  medications: string[];
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'ai' | 'system';
  content: string;
  timestamp: Date;
  severity?: SeverityLevel;
}