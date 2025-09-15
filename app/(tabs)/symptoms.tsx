import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, CircleAlert as AlertCircle } from 'lucide-react-native';
import { COMMON_SYMPTOMS } from '@/constants/medical';
import SeverityIndicator from '@/components/SeverityIndicator';
import { SEVERITY_LEVELS } from '@/constants/medical';

export default function SymptomsScreen() {
  const [searchText, setSearchText] = useState('');
  const [filteredSymptoms, setFilteredSymptoms] = useState(COMMON_SYMPTOMS);

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text.trim() === '') {
      setFilteredSymptoms(COMMON_SYMPTOMS);
    } else {
      const filtered = COMMON_SYMPTOMS.filter(
        symptom =>
          symptom.name.toLowerCase().includes(text.toLowerCase()) ||
          symptom.description.toLowerCase().includes(text.toLowerCase()) ||
          symptom.category.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredSymptoms(filtered);
    }
  };

  const renderSymptom = ({ item }: { item: typeof COMMON_SYMPTOMS[0] }) => (
    <TouchableOpacity style={styles.symptomCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.symptomName}>{item.name}</Text>
        <SeverityIndicator 
          severity={SEVERITY_LEVELS[item.severity === 'low' ? 'green' : item.severity === 'moderate' ? 'yellow' : item.severity === 'concerning' ? 'orange' : 'red']} 
          size="small" 
        />
      </View>
      
      <Text style={styles.symptomDescription}>{item.description}</Text>
      <Text style={styles.categoryLabel}>Category: {item.category}</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Common Causes:</Text>
        {item.commonCauses.map((cause, index) => (
          <Text key={index} style={styles.bulletPoint}>• {cause}</Text>
        ))}
      </View>
      
      {item.redFlags.length > 0 && (
        <View style={styles.redFlagsSection}>
          <View style={styles.redFlagsHeader}>
            <AlertCircle size={16} color="#DC2626" />
            <Text style={styles.redFlagsTitle}>Seek immediate care if:</Text>
          </View>
          {item.redFlags.map((flag, index) => (
            <Text key={index} style={styles.redFlagPoint}>• {flag}</Text>
          ))}
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Symptom Reference</Text>
        <Text style={styles.subtitle}>Educational information only</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            value={searchText}
            onChangeText={handleSearch}
            placeholder="Search symptoms..."
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      <FlatList
        data={filteredSymptoms}
        keyExtractor={(item) => item.id}
        renderItem={renderSymptom}
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
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomColor: '#E5E7EB',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'white',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  symptomCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  symptomName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    flex: 1,
  },
  symptomDescription: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 8,
  },
  categoryLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
    marginBottom: 12,
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 6,
  },
  bulletPoint: {
    fontSize: 14,
    color: '#4B5563',
    marginLeft: 8,
    marginBottom: 2,
  },
  redFlagsSection: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
  },
  redFlagsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 6,
  },
  redFlagsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#DC2626',
  },
  redFlagPoint: {
    fontSize: 14,
    color: '#DC2626',
    marginLeft: 8,
    marginBottom: 2,
  },
});