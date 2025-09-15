import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Bot, User } from 'lucide-react-native';
import { ChatMessage as ChatMessageType } from '@/types/medical';
import SeverityIndicator from './SeverityIndicator';

interface ChatMessageProps {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.type === 'user';
  const isSystem = message.type === 'system';

  return (
    <View style={[styles.container, isUser && styles.userContainer]}>
      {!isUser && !isSystem && (
        <View style={styles.avatar}>
          <Bot size={20} color="#2563EB" />
        </View>
      )}
      
      <View style={[
        styles.messageContainer,
        isUser && styles.userMessage,
        isSystem && styles.systemMessage,
      ]}>
        <Text style={[
          styles.messageText,
          isUser && styles.userText,
          isSystem && styles.systemText,
        ]}>
          {message.content}
        </Text>
        
        {message.severity && (
          <View style={styles.severityContainer}>
            <SeverityIndicator severity={message.severity} size="small" />
          </View>
        )}
      </View>
      
      {isUser && (
        <View style={styles.avatar}>
          <User size={20} color="#059669" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 4,
    paddingHorizontal: 16,
    alignItems: 'flex-end',
    gap: 8,
  },
  userContainer: {
    flexDirection: 'row-reverse',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageContainer: {
    flex: 1,
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
  },
  userMessage: {
    backgroundColor: '#2563EB',
    borderBottomRightRadius: 4,
  },
  systemMessage: {
    backgroundColor: '#FEF2F2',
    borderColor: '#DC2626',
    borderWidth: 1,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
    color: '#1F2937',
  },
  userText: {
    color: 'white',
  },
  systemText: {
    color: '#DC2626',
  },
  severityContainer: {
    marginTop: 8,
    alignSelf: 'flex-start',
  },
});