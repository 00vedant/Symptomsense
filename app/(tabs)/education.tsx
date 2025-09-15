import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookOpen, Shield, Heart, Brain, Activity, Pill, Users, CircleAlert as AlertCircle } from 'lucide-react-native';

interface EducationTopic {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  content: string;
}

const EDUCATION_TOPICS: EducationTopic[] = [
  {
    id: '1',
    title: 'When to Seek Emergency Care',
    description: 'Learn to recognize emergency warning signs',
    icon: <AlertCircle size={24} color="#DC2626" />,
    color: '#DC2626',
    content: `Emergency Warning Signs:

🚨 Call 108 immediately if you experience:
• Chest pain or pressure
• Difficulty breathing or shortness of breath
• Sudden severe headache
• Sudden confusion or difficulty speaking
• Severe abdominal pain
• Heavy bleeding
• Signs of stroke (F.A.S.T.)
• Loss of consciousness

Remember: When in doubt, seek immediate medical attention.`,
  },
  {
    id: '2',
    title: 'Heart Health Basics',
    description: 'Understanding cardiovascular wellness',
    icon: <Heart size={24} color="#DC2626" />,
    color: '#DC2626',
    content: `Heart Health Tips:

💓 Maintain a healthy lifestyle:
• Regular exercise (150 min/week)
• Balanced diet low in sodium
• Maintain healthy weight
• Don't smoke
• Limit alcohol
• Manage stress
• Get adequate sleep
• Regular checkups

Warning signs to watch for:
• Chest pain or discomfort
• Shortness of breath
• Fatigue
• Swelling in legs/feet`,
  },
  {
    id: '3',
    title: 'Mental Health Awareness',
    description: 'Understanding mental wellness',
    icon: <Brain size={24} color="#2563EB" />,
    color: '#2563EB',
    content: `Mental Health Matters:

🧠 Signs to watch for:
• Persistent sadness or anxiety
• Mood swings
• Changes in sleep patterns
• Loss of interest in activities
• Difficulty concentrating
• Social withdrawal

Getting help:
• Talk to a healthcare provider
• Reach out to trusted friends/family
• Consider counseling or therapy
• Emergency Mental Health Support: 108`,
  },
  {
    id: '4',
    title: 'Medication Safety',
    description: 'Safe use of prescription and OTC medications',
    icon: <Pill size={24} color="#059669" />,
    color: '#059669',
    content: `Medication Safety Guidelines:

💊 Important reminders:
• Follow dosing instructions exactly
• Complete antibiotic courses
• Store medications properly
• Check expiration dates
• Be aware of drug interactions
• Tell providers about all medications
• Never share prescription medications

Over-the-counter medications:
• Read labels carefully
• Follow age/weight guidelines
• Be aware of active ingredients`,
  },
  {
    id: '5',
    title: 'Preventive Care',
    description: 'Staying healthy through prevention',
    icon: <Shield size={24} color="#7C3AED" />,
    color: '#7C3AED',
    content: `Preventive Care Checklist:

🛡️ Regular screenings:
• Annual physical exam
• Blood pressure checks
• Cholesterol screening
• Cancer screenings (age-appropriate)
• Eye and dental exams
• Immunizations

Lifestyle prevention:
• Healthy diet
• Regular exercise
• Adequate sleep
• Stress management
• Avoid tobacco
• Limit alcohol`,
  },
  {
    id: '6',
    title: 'Family Health Planning',
    description: 'Managing health for your family',
    icon: <Users size={24} color="#EA580C" />,
    color: '#EA580C',
    content: `Family Health Tips:

👨‍👩‍👧‍👦 Family wellness:
• Keep updated medical records
• Know family medical history
• Establish care with healthcare providers
• Create emergency contact lists
• Discuss health goals as a family
• Plan for emergencies

Children's health:
• Follow vaccination schedules
• Regular pediatric checkups
• Monitor growth and development
• Healthy nutrition habits`,
  },
];

export default function EducationScreen() {
  const [selectedTopic, setSelectedTopic] = React.useState<EducationTopic | null>(null);

  if (selectedTopic) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.topicHeader}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => setSelectedTopic(null)}
          >
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <View style={styles.topicTitleContainer}>
            {selectedTopic.icon}
            <Text style={styles.topicTitle}>{selectedTopic.title}</Text>
          </View>
        </View>
        
        <ScrollView style={styles.contentContainer}>
          <Text style={styles.contentText}>{selectedTopic.content}</Text>
          
          <View style={styles.disclaimer}>
            <AlertCircle size={16} color="#D97706" />
            <Text style={styles.disclaimerText}>
              This information is for educational purposes only and does not replace professional medical advice.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BookOpen size={28} color="#2563EB" />
        <View style={styles.headerText}>
          <Text style={styles.title}>Health Education</Text>
          <Text style={styles.subtitle}>Learn about health and wellness</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.topicsContainer}>
        {EDUCATION_TOPICS.map((topic) => (
          <TouchableOpacity
            key={topic.id}
            style={[styles.topicCard, { borderLeftColor: topic.color }]}
            onPress={() => setSelectedTopic(topic)}
          >
            <View style={styles.cardHeader}>
              {topic.icon}
              <Text style={styles.cardTitle}>{topic.title}</Text>
            </View>
            <Text style={styles.cardDescription}>{topic.description}</Text>
          </TouchableOpacity>
        ))}
        
        <View style={styles.generalDisclaimer}>
          <AlertCircle size={20} color="#D97706" />
          <Text style={styles.generalDisclaimerText}>
            All educational content is for informational purposes only. 
            Always consult healthcare professionals for personalized medical advice.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomColor: '#E5E7EB',
    borderBottomWidth: 1,
  },
  headerText: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  topicsContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  topicCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    flex: 1,
  },
  cardDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  generalDisclaimer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFBEB',
    borderColor: '#FDE68A',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginTop: 20,
    gap: 12,
  },
  generalDisclaimerText: {
    flex: 1,
    fontSize: 14,
    color: '#92400E',
    lineHeight: 18,
  },
  topicHeader: {
    backgroundColor: 'white',
    borderBottomColor: '#E5E7EB',
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  backButton: {
    marginBottom: 12,
  },
  backText: {
    fontSize: 16,
    color: '#2563EB',
    fontWeight: '600',
  },
  topicTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  topicTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#1F2937',
    marginBottom: 24,
  },
  disclaimer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFBEB',
    borderColor: '#FDE68A',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    gap: 12,
  },
  disclaimerText: {
    flex: 1,
    fontSize: 14,
    color: '#92400E',
    lineHeight: 18,
  },
});