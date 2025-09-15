import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, CreditCard as Edit3, Shield, Bell, CircleHelp as HelpCircle, LogOut, Phone, Calendar, Heart, Pill } from 'lucide-react-native';

export default function ProfileScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    age: '35',
    gender: 'Male',
    phone: '(555) 123-4567',
    emergencyContact: 'Jane Doe - (555) 987-6543',
    medicalHistory: ['Hypertension', 'Allergic to Penicillin'],
    currentMedications: ['Lisinopril 10mg daily'],
  });

  const handleSave = () => {
    setIsEditing(false);
    Alert.alert('Success', 'Profile updated successfully');
  };

  const handleEmergencyCall = () => {
    Alert.alert(
      'Emergency Call',
      'Call 108 for immediate emergency assistance?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call 108', onPress: () => console.log('Emergency call triggered') },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <User size={28} color="#2563EB" />
        <View style={styles.headerText}>
          <Text style={styles.title}>Health Profile</Text>
          <Text style={styles.subtitle}>Manage your health information</Text>
        </View>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => isEditing ? handleSave() : setIsEditing(true)}
        >
          <Edit3 size={20} color="#2563EB" />
          <Text style={styles.editText}>{isEditing ? 'Save' : 'Edit'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Emergency Button */}
        <TouchableOpacity style={styles.emergencyButton} onPress={handleEmergencyCall}>
          <Phone size={20} color="white" />
          <Text style={styles.emergencyText}>Emergency Call 108</Text>
        </TouchableOpacity>

        {/* Personal Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={profile.name}
                onChangeText={(text) => setProfile({...profile, name: text})}
              />
            ) : (
              <Text style={styles.value}>{profile.name}</Text>
            )}
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.label}>Age</Text>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={profile.age}
                  onChangeText={(text) => setProfile({...profile, age: text})}
                  keyboardType="numeric"
                />
              ) : (
                <Text style={styles.value}>{profile.age}</Text>
              )}
            </View>

            <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.label}>Gender</Text>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={profile.gender}
                  onChangeText={(text) => setProfile({...profile, gender: text})}
                />
              ) : (
                <Text style={styles.value}>{profile.gender}</Text>
              )}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={profile.phone}
                onChangeText={(text) => setProfile({...profile, phone: text})}
                keyboardType="phone-pad"
              />
            ) : (
              <Text style={styles.value}>{profile.phone}</Text>
            )}
          </View>
        </View>

        {/* Emergency Contact */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Emergency Contact</Text>
          <View style={styles.inputGroup}>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={profile.emergencyContact}
                onChangeText={(text) => setProfile({...profile, emergencyContact: text})}
                placeholder="Name - Phone Number"
              />
            ) : (
              <Text style={styles.value}>{profile.emergencyContact}</Text>
            )}
          </View>
        </View>

        {/* Medical History */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Heart size={20} color="#DC2626" />
            <Text style={styles.sectionTitle}>Medical History</Text>
          </View>
          {profile.medicalHistory.map((item, index) => (
            <View key={item} style={styles.listItem}>
              <Text style={styles.listText}>• {item}</Text>
            </View>
          ))}
          {isEditing && (
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>+ Add Medical History</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Current Medications */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Pill size={20} color="#059669" />
            <Text style={styles.sectionTitle}>Current Medications</Text>
          </View>
          {profile.currentMedications.map((medication, index) => (
            <View key={medication} style={styles.listItem}>
              <Text style={styles.listText}>• {medication}</Text>
            </View>
          ))}
          {isEditing && (
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>+ Add Medication</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <Shield size={20} color="#6B7280" />
            <Text style={styles.settingText}>Privacy & Data</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Bell size={20} color="#6B7280" />
            <Text style={styles.settingText}>Notifications</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <HelpCircle size={20} color="#6B7280" />
            <Text style={styles.settingText}>Help & Support</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.settingItem, styles.signOutItem]}>
            <LogOut size={20} color="#DC2626" />
            <Text style={[styles.settingText, { color: '#DC2626' }]}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            Your health information is encrypted and secure. This app is for educational purposes only.
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
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2563EB',
    gap: 6,
  },
  editText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563EB',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DC2626',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 24,
    gap: 8,
  },
  emergencyText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  inputGroup: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: '#F9FAFB',
  },
  value: {
    fontSize: 16,
    color: '#1F2937',
    paddingVertical: 4,
  },
  listItem: {
    marginBottom: 8,
  },
  listText: {
    fontSize: 16,
    color: '#4B5563',
  },
  addButton: {
    paddingVertical: 8,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 16,
    color: '#2563EB',
    fontWeight: '600',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomColor: '#F3F4F6',
    borderBottomWidth: 1,
    gap: 12,
  },
  signOutItem: {
    borderBottomWidth: 0,
  },
  settingText: {
    fontSize: 16,
    color: '#1F2937',
    flex: 1,
  },
  disclaimer: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 16,
    marginBottom: 32,
  },
  disclaimerText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 18,
  },
});