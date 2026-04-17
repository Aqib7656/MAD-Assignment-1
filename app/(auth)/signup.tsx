import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useStore } from '../../src/store/useStore';

export default function Signup() {
  const router = useRouter();
  const setUser = useStore(state => state.setUser);

  const handleSignup = () => {
    setUser({ id: 'u2', name: 'New User', isGuest: false });
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.brand}>Dino-Flow</Text>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Join us for delicious food</Text>

      <TextInput style={styles.input} placeholder="Full Name" placeholderTextColor="#aaa" />
      <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#aaa" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry placeholderTextColor="#aaa" />

      <TouchableOpacity style={styles.btnPrimary} onPress={handleSignup}>
        <Text style={styles.btnText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/(auth)/login')} style={{ alignItems: 'center', marginTop: 20 }}>
        <Text style={styles.linkText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#F9FBF9' },
  brand: { fontSize: 20, fontWeight: '700', color: '#27AE60', marginBottom: 40, textAlign: 'center', letterSpacing: 2 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#2C3E50', marginBottom: 5 },
  subtitle: { fontSize: 16, color: '#7F8C8D', marginBottom: 30 },
  input: { backgroundColor: '#FFF', padding: 15, borderRadius: 10, marginBottom: 15, borderWidth: 1, borderColor: '#E8ECE8' },
  btnPrimary: { backgroundColor: '#27AE60', padding: 18, borderRadius: 10, alignItems: 'center', marginBottom: 15, shadowColor: '#27AE60', shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.3, shadowRadius: 5, elevation: 4 },
  btnText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
  linkText: { color: '#2C3E50', fontSize: 14, fontWeight: '500' },
});
