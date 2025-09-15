import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Send, Bot, TriangleAlert as AlertTriangle } from 'lucide-react-native';
import { ChatMessage as ChatMessageType } from '@/types/medical';
import { SEVERITY_LEVELS } from '@/constants/medical';
import { findMatchingDiseases, extractSymptomsFromText } from '@/constants/diseases';
import ChatMessage from '@/components/ChatMessage';
import DisclaimerModal from '@/components/DisclaimerModal';

export default function AnalyzeScreen() {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [inputText, setInputText] = useState('');
  const [disclaimerVisible, setDisclaimerVisible] = useState(true);
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);
  const [conversationState, setConversationState] = useState<{
    stage: 'initial' | 'gathering_info' | 'analysis_complete';
    userSymptoms: string[];
    askedQuestions: string[];
    additionalInfo: Record<string, string>;
  }>({
    stage: 'initial',
    userSymptoms: [],
    askedQuestions: [],
    additionalInfo: {}
  });
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (disclaimerAccepted) {
      // Initial AI greeting
      const welcomeMessage: ChatMessageType = {
        id: '1',
        type: 'ai',
        content: `Hello! I'm here to help you understand your symptoms. Please describe what you're experiencing, and I'll ask follow-up questions to better assess your situation.

Remember: This is not a medical diagnosis. For emergencies, call 108 immediately.`,
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [disclaimerAccepted]);

  const handleDisclaimerAccept = () => {
    setDisclaimerVisible(false);
    setDisclaimerAccepted(true);
  };

  const analyzeSymptoms = (userInput: string): ChatMessageType => {
    const input = userInput.toLowerCase();
    
    // Extract symptoms from user input
    const detectedSymptoms = extractSymptomsFromText(input);
    
    // Emergency keywords detection
    const emergencyKeywords = [
      'chest pain', 'can\'t breathe', 'difficulty breathing', 'severe headache', 'unconscious',
      'stroke', 'heart attack', 'choking', 'severe bleeding', 'overdose', 'face drooping',
      'speech difficulty', 'sudden weakness', 'severe abdominal pain'
    ];
    
    if (emergencyKeywords.some(keyword => input.includes(keyword))) {
      return {
        id: Date.now().toString(),
        type: 'system',
        content: '🚨 EMERGENCY DETECTED: These symptoms require immediate medical attention. Call 108 now or go to the nearest emergency room immediately.',
        timestamp: new Date(),
        severity: SEVERITY_LEVELS.black,
      };
    }

    // Update conversation state with new symptoms
    const updatedSymptoms = [...conversationState.userSymptoms, ...detectedSymptoms];
    const uniqueSymptoms = [...new Set(updatedSymptoms)];
    
    // Find matching diseases
    const matchingDiseases = findMatchingDiseases(uniqueSymptoms);
    
    // Only ask 1-2 follow-up questions maximum to avoid frustration
    const maxQuestions = 2;
    const shouldAskMoreQuestions = conversationState.askedQuestions.length < maxQuestions && uniqueSymptoms.length > 0;
    
    // Update conversation state
    setConversationState(prev => ({
      ...prev,
      userSymptoms: uniqueSymptoms,
      stage: uniqueSymptoms.length > 0 && shouldAskMoreQuestions ? 'gathering_info' : 'analysis_complete'
    }));
    
    // Provide analysis if we have symptoms and either have enough info or asked enough questions
    if (matchingDiseases.length > 0 && (!shouldAskMoreQuestions || conversationState.askedQuestions.length >= maxQuestions)) {
      const topDisease = matchingDiseases[0];
      const severityLevel = topDisease.severity === 'low' ? 'green' : 
                           topDisease.severity === 'moderate' ? 'yellow' :
                           topDisease.severity === 'concerning' ? 'orange' :
                           topDisease.severity === 'urgent' ? 'red' : 'black';
      
      let analysisContent = `Based on your symptoms, you may be experiencing **${topDisease.name}**.

**Description**: ${topDisease.description}

**Recommendations**:
${topDisease.recommendations.map(rec => `• ${rec}`).join('\n')}`;

      // Add medicine recommendations if available
      if (topDisease.medicines && topDisease.medicines.length > 0) {
        analysisContent += `\n\n**Suggested Medications** (consult pharmacist/doctor):
${topDisease.medicines.map(med => `• ${med}`).join('\n')}`;
      }
      if (topDisease.emergencySymptoms.length > 0) {
        analysisContent += `\n\n⚠️ **Seek immediate medical attention if you experience**:
${topDisease.emergencySymptoms.map(symptom => `• ${symptom}`).join('\n')}`;
      }

      // Reset conversation state for next interaction
      setConversationState({
        stage: 'initial',
        userSymptoms: [],
        askedQuestions: [],
        additionalInfo: {}
      });

      return {
        id: Date.now().toString(),
        type: 'ai',
        content: analysisContent,
        timestamp: new Date(),
        severity: SEVERITY_LEVELS[severityLevel],
      };
    }
    
    // Ask follow-up questions if we have symptoms but need more info (limited to avoid frustration)
    if (uniqueSymptoms.length > 0 && shouldAskMoreQuestions) {
      const possibleQuestions = [
        'How long have you had these symptoms?',
        'On a scale of 1-10, how would you rate your discomfort?',
        'Are the symptoms getting better, worse, or staying the same?'
      ];
      
      const unaskedQuestions = possibleQuestions.filter(q => 
        !conversationState.askedQuestions.includes(q)
      );
      
      if (unaskedQuestions.length === 0) {
        // If no more questions, provide basic analysis
        return {
          id: Date.now().toString(),
          type: 'ai',
          content: `Thank you for the information. Based on your symptoms, I recommend monitoring your condition and considering self-care measures. If symptoms persist or worsen, please consult with a healthcare provider.`,
          timestamp: new Date(),
          severity: SEVERITY_LEVELS.yellow,
        };
      }
      
      const nextQuestion = unaskedQuestions[0];
      
      // Update asked questions
      setConversationState(prev => ({
        ...prev,
        askedQuestions: [...prev.askedQuestions, nextQuestion]
      }));

      return {
        id: Date.now().toString(),
        type: 'ai',
        content: `${nextQuestion}`,
        timestamp: new Date(),
      };
    }

    // Mild symptoms
    return {
      id: Date.now().toString(),
      type: 'ai',
      content: `Thank you for sharing that information. These symptoms appear to be mild. Consider self-care measures and monitor your symptoms. If they worsen or persist, consider consulting with a healthcare provider.`,
      timestamp: new Date(),
      severity: SEVERITY_LEVELS.green,
    };
  };

  const sendMessage = () => {
    if (!inputText.trim() || !disclaimerAccepted) return;

    // Add user message
    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      type: 'user',
      content: inputText.trim(),
      timestamp: new Date(),
    };

    // Analyze and generate AI response
    const aiResponse = analyzeSymptoms(inputText.trim());

    setMessages(prev => [...prev, userMessage, aiResponse]);
    setInputText('');

    // Show emergency alert if needed
    if (aiResponse.severity?.level === 'black') {
      Alert.alert(
        '🚨 MEDICAL EMERGENCY', 
        'Call 108 immediately. These symptoms require emergency medical attention.',
        [
          { text: 'Call 108', onPress: () => console.log('Emergency call triggered') },
          { text: 'I Understand' },
        ]
      );
    }

    // Scroll to bottom
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  if (!disclaimerAccepted) {
    return (
      <DisclaimerModal
        visible={disclaimerVisible}
        onClose={() => setDisclaimerVisible(false)}
        onAccept={handleDisclaimerAccept}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Bot size={28} color="#2563EB" />
        <View style={styles.headerText}>
          <Text style={styles.title}>AI Symptom Analysis</Text>
          <Text style={styles.subtitle}>Educational demo only</Text>
        </View>
        <TouchableOpacity
          onPress={() => setDisclaimerVisible(true)}
          style={styles.warningButton}
        >
          <AlertTriangle size={20} color="#D97706" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView 
        style={styles.chatContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ChatMessage message={item} />}
          style={styles.messagesList}
          showsVerticalScrollIndicator={false}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Describe your symptoms..."
            multiline
            maxLength={500}
            editable={disclaimerAccepted}
          />
          <TouchableOpacity
            style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
            onPress={sendMessage}
            disabled={!inputText.trim() || !disclaimerAccepted}
          >
            <Send size={20} color={inputText.trim() ? 'white' : '#9CA3AF'} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomColor: '#E5E7EB',
    borderBottomWidth: 1,
  },
  headerText: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  warningButton: {
    padding: 8,
  },
  chatContainer: {
    flex: 1,
  },
  messagesList: {
    flex: 1,
    paddingVertical: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderTopColor: '#E5E7EB',
    borderTopWidth: 1,
    gap: 12,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxHeight: 100,
    fontSize: 16,
    backgroundColor: '#F9FAFB',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#F3F4F6',
  },
});