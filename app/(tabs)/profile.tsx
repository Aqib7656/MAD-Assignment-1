import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useStore } from '../../src/store/useStore';

export default function Profile() {
  const user = useStore(state => state.user);
  const setUser = useStore(state => state.setUser);
  const router = useRouter();

  const handleLogout = () => {
    setUser(null);
    router.replace('/(auth)/login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={40} color="#27AE60" />
        </View>
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.email}>{user?.isGuest ? 'Guest Account' : 'user@example.com'}</Text>
      </View>

      <View style={styles.optionsList}>
        <TouchableOpacity style={styles.option} onPress={() => router.push('/booking')}>
          <Ionicons name="calendar-outline" size={24} color="#2C3E50" />
          <Text style={styles.optionText}>Table Reservations</Text>
          <Ionicons name="chevron-forward" size={20} color="#95A5A6" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => router.push('/favorites' as any)}>
          <Ionicons name="heart-outline" size={24} color="#E74C3C" />
          <Text style={styles.optionText}>Favorites</Text>
          <Ionicons name="chevron-forward" size={20} color="#95A5A6" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => router.push('/orders')}>
          <Ionicons name="time-outline" size={24} color="#2C3E50" />
          <Text style={styles.optionText}>Order History</Text>
          <Ionicons name="chevron-forward" size={20} color="#95A5A6" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => router.push('/settings')}>
          <Ionicons name="settings-outline" size={24} color="#2C3E50" />
          <Text style={styles.optionText}>Settings</Text>
          <Ionicons name="chevron-forward" size={20} color="#95A5A6" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.option, styles.logoutBtn]} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#E74C3C" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FBF9', padding: 20, paddingTop: 80 },
  header: { alignItems: 'center', marginBottom: 40 },
  avatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#E8F5E9', justifyContent: 'center', alignItems: 'center', marginBottom: 15, shadowColor: '#27AE60', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.2, shadowRadius: 10, elevation: 5 },
  name: { fontSize: 24, fontWeight: 'bold', color: '#2C3E50' },
  email: { fontSize: 14, color: '#7F8C8D', marginTop: 5 },
  optionsList: { flex: 1 },
  option: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 20, borderRadius: 15, marginBottom: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  optionText: { flex: 1, fontSize: 16, color: '#2C3E50', marginLeft: 15, fontWeight: '500' },
  logoutBtn: { marginTop: 20 },
  logoutText: { flex: 1, fontSize: 16, color: '#E74C3C', marginLeft: 15, fontWeight: 'bold' }
});
