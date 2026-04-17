import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const DATES = ['Today', 'Tomorrow', 'Apr 17', 'Apr 18', 'Apr 19'];
const TIMES = ['18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'];
const GUESTS = [1, 2, 3, 4, 5, 6];

export default function Booking() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(DATES[0]);
  const [selectedTime, setSelectedTime] = useState(TIMES[2]);
  const [selectedGuests, setSelectedGuests] = useState(2);

  const handleBook = () => {
    if (typeof window !== 'undefined' && window.alert) {
      window.alert(`Table Reserved!\nYour table for ${selectedGuests} on ${selectedDate} at ${selectedTime} is confirmed.`);
      router.back();
    } else {
      Alert.alert('Table Reserved!', `Your table for ${selectedGuests} on ${selectedDate} at ${selectedTime} is confirmed.`, [
        { text: 'OK', onPress: () => router.back() }
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#2C3E50" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reserve a Table</Text>
        <View style={{width: 40}} /> 
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        
        <Text style={styles.sectionTitle}>Date</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollRow}>
          {DATES.map(date => (
            <TouchableOpacity key={date} onPress={() => setSelectedDate(date)} style={[styles.pill, selectedDate === date && styles.pillActive]}>
              <Text style={[styles.pillText, selectedDate === date && styles.pillTextActive]}>{date}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Time</Text>
        <View style={styles.grid}>
          {TIMES.map(time => {
            // Mock randomly unavailable times
            const isUnavailable = time === '19:30' || time === '20:00';
            return (
              <TouchableOpacity key={time} disabled={isUnavailable} onPress={() => setSelectedTime(time)} style={[styles.timeBox, selectedTime === time && styles.timeBoxActive, isUnavailable && styles.timeBoxDisabled]}>
                <Text style={[styles.timeText, selectedTime === time && styles.timeTextActive, isUnavailable && styles.timeTextDisabled]}>{time}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>Number of Guests</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollRow}>
          {GUESTS.map(g => (
            <TouchableOpacity key={g} onPress={() => setSelectedGuests(g)} style={[styles.guestPill, selectedGuests === g && styles.pillActive]}>
              <Text style={[styles.pillText, selectedGuests === g && styles.pillTextActive]}>{g}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.bookBtn} onPress={handleBook}>
          <Text style={styles.bookText}>Confirm Reservation</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FBF9' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 60, paddingHorizontal: 20, paddingBottom: 20, backgroundColor: '#FFF', shadowColor: '#000', shadowOffset: {width:0, height:2}, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F1F1F1', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#2C3E50' },
  content: { padding: 20, paddingBottom: 100 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#2C3E50', marginTop: 20, marginBottom: 15 },
  scrollRow: { maxHeight: 50 },
  pill: { paddingHorizontal: 20, paddingVertical: 12, borderRadius: 25, backgroundColor: '#FFF', marginRight: 10, borderWidth: 1, borderColor: '#E8ECE8' },
  pillActive: { backgroundColor: '#27AE60', borderColor: '#27AE60' },
  pillText: { color: '#7F8C8D', fontWeight: 'bold', fontSize: 14 },
  pillTextActive: { color: '#FFF' },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  timeBox: { width: '30%', backgroundColor: '#FFF', paddingVertical: 15, borderRadius: 12, alignItems: 'center', margin: '1.5%', borderWidth: 1, borderColor: '#E8ECE8' },
  timeBoxActive: { backgroundColor: '#27AE60', borderColor: '#27AE60' },
  timeBoxDisabled: { backgroundColor: '#F1F1F1', borderColor: '#F1F1F1' },
  timeText: { color: '#2C3E50', fontWeight: 'bold' },
  timeTextActive: { color: '#FFF' },
  timeTextDisabled: { color: '#D5DBDB', textDecorationLine: 'line-through' },
  guestPill: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#FFF', marginRight: 10, borderWidth: 1, borderColor: '#E8ECE8', justifyContent: 'center', alignItems: 'center' },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#FFF', padding: 20, paddingBottom: 30, shadowColor: '#000', shadowOffset: {width:0, height:-5}, shadowOpacity: 0.05, shadowRadius: 10, elevation: 10 },
  bookBtn: { backgroundColor: '#2C3E50', paddingVertical: 18, borderRadius: 15, alignItems: 'center' },
  bookText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' }
});
