import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MapPin, Phone, Star, Clock } from 'lucide-react-native';
import { HealthcareProvider } from '@/types/medical';

interface ProviderCardProps {
  provider: HealthcareProvider;
  onPress: () => void;
  onCall: () => void;
}

export default function ProviderCard({ provider, onPress, onCall }: ProviderCardProps) {
  const getAvailabilityColor = () => {
    switch (provider.availability) {
      case 'available':
        return '#059669';
      case 'busy':
        return '#D97706';
      case 'closed':
        return '#DC2626';
      default:
        return '#6B7280';
    }
  };

  const getAvailabilityLabel = () => {
    switch (provider.availability) {
      case 'available':
        return 'Available';
      case 'busy':
        return 'Busy';
      case 'closed':
        return 'Closed';
      default:
        return 'Unknown';
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.name}>{provider.name}</Text>
          <Text style={styles.specialty}>{provider.specialty}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getAvailabilityColor() + '20' }]}>
          <Clock size={12} color={getAvailabilityColor()} />
          <Text style={[styles.statusText, { color: getAvailabilityColor() }]}>
            {getAvailabilityLabel()}
          </Text>
        </View>
      </View>
      
      <View style={styles.info}>
        <View style={styles.infoRow}>
          <MapPin size={16} color="#6B7280" />
          <Text style={styles.infoText}>{provider.address}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.distanceText}>{provider.distance.toFixed(1)} mi away</Text>
          <View style={styles.rating}>
            <Star size={16} color="#F59E0B" fill="#F59E0B" />
            <Text style={styles.ratingText}>{provider.rating.toFixed(1)}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.actions}>
        <TouchableOpacity style={styles.callButton} onPress={onCall}>
          <Phone size={16} color="#2563EB" />
          <Text style={styles.callText}>Call</Text>
        </TouchableOpacity>
        
        {provider.acceptsInsurance && (
          <View style={styles.insuranceBadge}>
            <Text style={styles.insuranceText}>Insurance Accepted</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 2,
  },
  specialty: {
    fontSize: 14,
    color: '#6B7280',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  info: {
    marginBottom: 12,
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#4B5563',
  },
  distanceText: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2563EB',
    gap: 6,
  },
  callText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563EB',
  },
  insuranceBadge: {
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  insuranceText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#059669',
  },
});