import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Filter } from 'lucide-react-native';
import { HealthcareProvider } from '@/types/medical';
import ProviderCard from '@/components/ProviderCard';

const MOCK_PROVIDERS: HealthcareProvider[] = [
  {
    id: '1',
    name: 'City Medical Center',
    specialty: 'Emergency Medicine',
    address: '123 Main St, Anytown, ST 12345',
    phone: '(555) 123-4567',
    distance: 0.8,
    rating: 4.2,
    acceptsInsurance: true,
    availability: 'available',
  },
  {
    id: '2',
    name: 'Dr. Sarah Johnson',
    specialty: 'Family Practice',
    address: '456 Oak Ave, Anytown, ST 12345',
    phone: '(555) 234-5678',
    distance: 1.2,
    rating: 4.8,
    acceptsInsurance: true,
    availability: 'available',
  },
  {
    id: '3',
    name: 'Downtown Urgent Care',
    specialty: 'Urgent Care',
    address: '789 Pine St, Anytown, ST 12345',
    phone: '(555) 345-6789',
    distance: 2.1,
    rating: 4.0,
    acceptsInsurance: false,
    availability: 'busy',
  },
  {
    id: '4',
    name: 'Regional Hospital',
    specialty: 'Hospital',
    address: '321 Cedar Rd, Anytown, ST 12345',
    phone: '(555) 456-7890',
    distance: 3.5,
    rating: 4.5,
    acceptsInsurance: true,
    availability: 'available',
  },
  {
    id: '5',
    name: 'Dr. Michael Chen',
    specialty: 'Internal Medicine',
    address: '654 Elm St, Anytown, ST 12345',
    phone: '(555) 567-8901',
    distance: 1.8,
    rating: 4.6,
    acceptsInsurance: true,
    availability: 'closed',
  },
];

export default function ProvidersScreen() {
  const [providers, setProviders] = useState(MOCK_PROVIDERS);
  const [filter, setFilter] = useState<'all' | 'available' | 'emergency'>('all');

  const handleCall = (phone: string) => {
    Alert.alert(
      'Call Provider',
      `Would you like to call ${phone}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Call', 
          onPress: () => Linking.openURL(`tel:${phone}`) 
        },
      ]
    );
  };

  const handleProviderPress = (provider: HealthcareProvider) => {
    Alert.alert(
      provider.name,
      `${provider.specialty}\n${provider.address}\n\nWould you like to get directions or call?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Directions', 
          onPress: () => {
            const url = `https://maps.google.com/?q=${encodeURIComponent(provider.address)}`;
            Linking.openURL(url);
          }
        },
        { 
          text: 'Call', 
          onPress: () => handleCall(provider.phone) 
        },
      ]
    );
  };

  const filterProviders = (filterType: 'all' | 'available' | 'emergency') => {
    setFilter(filterType);
    if (filterType === 'all') {
      setProviders(MOCK_PROVIDERS);
    } else if (filterType === 'available') {
      setProviders(MOCK_PROVIDERS.filter(p => p.availability === 'available'));
    } else if (filterType === 'emergency') {
      setProviders(MOCK_PROVIDERS.filter(p => 
        p.specialty.includes('Emergency') || p.specialty.includes('Hospital')
      ));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <MapPin size={28} color="#2563EB" />
        <View style={styles.headerText}>
          <Text style={styles.title}>Find Healthcare</Text>
          <Text style={styles.subtitle}>Nearby providers and facilities</Text>
        </View>
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity 
          style={[styles.filterButton, filter === 'all' && styles.filterButtonActive]}
          onPress={() => filterProviders('all')}
        >
          <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterButton, filter === 'available' && styles.filterButtonActive]}
          onPress={() => filterProviders('available')}
        >
          <Text style={[styles.filterText, filter === 'available' && styles.filterTextActive]}>Available</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterButton, filter === 'emergency' && styles.filterButtonActive]}
          onPress={() => filterProviders('emergency')}
        >
          <Text style={[styles.filterText, filter === 'emergency' && styles.filterTextActive]}>Emergency</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={providers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProviderCard
            provider={item}
            onPress={() => handleProviderPress(item)}
            onCall={() => handleCall(item.phone)}
          />
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
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
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'white',
    gap: 8,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  filterTextActive: {
    color: 'white',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});