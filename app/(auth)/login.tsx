import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useStore } from '../../src/store/useStore';

export default function Login() {
  const router = useRouter();
  const setUser = useStore(state => state.setUser);

  const handleLogin = () => {
    setUser({ id: 'u1', name: 'John Doe', isGuest: false });
    router.replace('/(tabs)');
  };

  const handleGuestLogin = () => {
    setUser({ id: 'guest', name: 'Guest User', isGuest: true });
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.brand}>Dino-Flow</Text>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Sign in to continue</Text>

      <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#aaa" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry placeholderTextColor="#aaa" />

      <TouchableOpacity style={styles.btnPrimary} onPress={handleLogin}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.divider}>
        <View style={styles.line}/>
        <Text style={styles.or}>OR</Text>
        <View style={styles.line}/>
      </View>

      <TouchableOpacity style={styles.btnSecondary} onPress={handleGuestLogin}>
        <Text style={styles.btnTextSecondary}>Continue as Guest</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => router.push('/(auth)/signup')} style={{ alignItems: 'center', marginTop: 25 }}>
        <Text style={styles.linkText}>Don't have an account? Sign up</Text>
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
  btnSecondary: { backgroundColor: '#FFF', padding: 18, borderRadius: 10, alignItems: 'center', borderWidth: 1, borderColor: '#27AE60' },
  btnText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
  btnTextSecondary: { color: '#27AE60', fontSize: 16, fontWeight: '600' },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: 20 },
  line: { flex: 1, height: 1, backgroundColor: '#E0E0E0' },
  or: { marginHorizontal: 10, color: '#888', fontWeight: 'bold' },
  linkText: { color: '#2C3E50', fontSize: 14, fontWeight: '500' }
});
