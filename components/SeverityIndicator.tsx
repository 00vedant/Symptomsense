import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CircleAlert as AlertCircle, CircleCheck as CheckCircle, TriangleAlert as AlertTriangle, Circle as XCircle, Skull } from 'lucide-react-native';
import { SeverityLevel } from '@/types/medical';

interface SeverityIndicatorProps {
  severity: SeverityLevel;
  size?: 'small' | 'medium' | 'large';
}

export default function SeverityIndicator({ severity, size = 'medium' }: SeverityIndicatorProps) {
  const getIcon = () => {
    const iconSize = size === 'small' ? 16 : size === 'medium' ? 20 : 24;
    const color = severity.color;

    switch (severity.level) {
      case 'green':
        return <CheckCircle size={iconSize} color={color} />;
      case 'yellow':
        return <AlertCircle size={iconSize} color={color} />;
      case 'orange':
        return <AlertTriangle size={iconSize} color={color} />;
      case 'red':
        return <XCircle size={iconSize} color={color} />;
      case 'black':
        return <Skull size={iconSize} color={color} />;
      default:
        return <AlertCircle size={iconSize} color={color} />;
    }
  };

  const containerStyle = [
    styles.container,
    { backgroundColor: severity.backgroundColor, borderColor: severity.color },
    size === 'small' && styles.smallContainer,
    size === 'large' && styles.largeContainer,
  ];

  const labelStyle = [
    styles.label,
    { color: severity.color },
    size === 'small' && styles.smallLabel,
    size === 'large' && styles.largeLabel,
  ];

  return (
    <View style={containerStyle}>
      {getIcon()}
      <Text style={labelStyle}>{severity.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    gap: 6,
  },
  smallContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
  },
  largeContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  smallLabel: {
    fontSize: 12,
  },
  largeLabel: {
    fontSize: 16,
  },
});