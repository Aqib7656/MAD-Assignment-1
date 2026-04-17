import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../../src/store/useStore';

export default function Checkout() {
  const router = useRouter();
  const { cart, clearCart } = useStore();
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  
  const [address, setAddress] = useState('');
  const [card, setCard] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const handlePay = () => {
    if (!address || !card || !expiry || !cvv) {
      if (typeof window !== 'undefined' && window.alert) window.alert('Please fill out all payment details.');
      else Alert.alert('Error', 'Please fill out all payment details.');
      return;
    }
    
    if (typeof window !== 'undefined' && window.alert) {
      window.alert(`Payment Successful!\n$${(total + 5.99).toFixed(2)} charged to card ending in ${card.slice(-4) || 'XXXX'}`);
      clearCart();
      router.replace('/(tabs)');
    } else {
      Alert.alert('Payment Successful!', `$${(total + 5.99).toFixed(2)} charged to card ending in ${card.slice(-4) || 'XXXX'}`, [
        { text: 'Done', onPress: () => { clearCart(); router.replace('/(tabs)'); } }
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#2C3E50" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Secure Checkout</Text>
        <View style={{width: 40}} /> 
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Delivery Address</Text>
        <TextInput 
          style={styles.input} 
          placeholder="123 React Native St, Expo City" 
          placeholderTextColor="#95A5A6"
          value={address}
          onChangeText={setAddress}
        />

        <Text style={styles.sectionTitle}>Payment Method</Text>
        <View style={styles.cardContainer}>
          <Ionicons name="card-outline" size={30} color="#27AE60" style={{marginBottom: 15}} />
          <TextInput 
            style={styles.input} 
            placeholder="Card Number (e.g. 4111 1111 ...)" 
            keyboardType="numeric"
            placeholderTextColor="#95A5A6"
            value={card}
            onChangeText={setCard}
            maxLength={16}
          />
          <View style={styles.row}>
            <TextInput 
              style={[styles.input, {flex: 1, marginRight: 10}]} 
              placeholder="MM/YY" 
              placeholderTextColor="#95A5A6"
              value={expiry}
              onChangeText={setExpiry}
              maxLength={5}
            />
            <TextInput 
              style={[styles.input, {flex: 1}]} 
              placeholder="CVV" 
              keyboardType="numeric"
              placeholderTextColor="#95A5A6"
              value={cvv}
              onChangeText={setCvv}
              secureTextEntry
              maxLength={3}
            />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Order Summary</Text>
        <View style={styles.summaryBox}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${total.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee</Text>
            <Text style={styles.summaryValue}>$5.99</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryTotal}>Total</Text>
            <Text style={styles.summaryTotalVal}>${(total + 5.99).toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.payBtn} onPress={handlePay}>
          <Ionicons name="lock-closed" size={18} color="#FFF" style={{marginRight: 8}} />
          <Text style={styles.payText}>Pay ${(total + 5.99).toFixed(2)}</Text>
        </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FBF9' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 20, paddingTop: 10, backgroundColor: '#FFF', shadowColor: '#000', shadowOffset: {width:0, height:2}, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F1F1F1', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#2C3E50' },
  content: { padding: 20 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#7F8C8D', textTransform: 'uppercase', marginBottom: 15, marginTop: 10 },
  input: { backgroundColor: '#FFF', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#E8ECE8', fontSize: 16, color: '#2C3E50', marginBottom: 15 },
  cardContainer: { backgroundColor: '#FFF', padding: 20, borderRadius: 15, shadowColor: '#000', shadowOffset: {width:0, height:2}, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2, marginBottom: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  summaryBox: { backgroundColor: '#FFF', padding: 20, borderRadius: 15, marginBottom: 40, shadowColor: '#000', shadowOffset: {width:0, height:2}, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  summaryLabel: { fontSize: 15, color: '#7F8C8D' },
  summaryValue: { fontSize: 15, color: '#2C3E50', fontWeight: '500' },
  divider: { height: 1, backgroundColor: '#E8ECE8', marginVertical: 15 },
  summaryTotal: { fontSize: 18, color: '#2C3E50', fontWeight: 'bold' },
  summaryTotalVal: { fontSize: 18, color: '#27AE60', fontWeight: 'bold' },
  footer: { padding: 20, paddingBottom: 30, backgroundColor: '#FFF', shadowColor: '#000', shadowOffset: {width:0, height:-5}, shadowOpacity: 0.05, shadowRadius: 10, elevation: 10 },
  payBtn: { backgroundColor: '#2C3E50', paddingVertical: 18, borderRadius: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  payText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }
});
