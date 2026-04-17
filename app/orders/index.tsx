import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Mock orders since we don't have a backend yet
const MOCK_ORDERS = [
  { id: 'ORD-1204', date: 'Today, 2:30 PM', total: 24.50, status: 'Completed', items: 'Classic Cheeseburger, Avocado Salad' },
  { id: 'ORD-0955', date: 'Yesterday, 7:15 PM', total: 45.00, status: 'Completed', items: 'Margherita Pizza, Spicy Tuna Roll (x2)' },
  { id: 'ORD-0812', date: 'Apr 12, 1:00 PM', total: 14.00, status: 'Completed', items: 'Spicy Tuna Roll' },
];

export default function Orders() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#2C3E50" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order History</Text>
        <View style={{width:40}} /> 
      </View>

      <ScrollView style={styles.content}>
        {MOCK_ORDERS.map(order => (
          <View key={order.id} style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderId}>{order.id}</Text>
              <Text style={styles.orderStatus}>{order.status}</Text>
            </View>
            <Text style={styles.orderDate}>{order.date}</Text>
            <View style={styles.divider} />
            <Text style={styles.orderItems}>{order.items}</Text>
            <View style={styles.orderFooter}>
              <Text style={styles.orderTotal}>Total: ${order.total.toFixed(2)}</Text>
              <TouchableOpacity style={styles.reorderBtn}>
                <Text style={styles.reorderText}>Reorder</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FBF9' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 20, paddingTop: 10, backgroundColor: '#FFF', shadowColor: '#000', shadowOffset: {width:0, height:2}, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F1F1F1', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#2C3E50' },
  content: { padding: 20 },
  orderCard: { backgroundColor: '#FFF', borderRadius: 15, padding: 20, marginBottom: 15, shadowColor: '#000', shadowOffset: {width:0, height:2}, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  orderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  orderId: { fontSize: 16, fontWeight: 'bold', color: '#2C3E50' },
  orderStatus: { fontSize: 12, fontWeight: 'bold', color: '#27AE60', backgroundColor: '#E8F5E9', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10 },
  orderDate: { fontSize: 13, color: '#95A5A6', marginTop: 5 },
  divider: { height: 1, backgroundColor: '#F1F1F1', marginVertical: 15 },
  orderItems: { fontSize: 14, color: '#7F8C8D', lineHeight: 20, marginBottom: 15 },
  orderFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  orderTotal: { fontSize: 16, fontWeight: 'bold', color: '#2C3E50' },
  reorderBtn: { backgroundColor: '#2C3E50', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 12 },
  reorderText: { color: '#FFF', fontSize: 14, fontWeight: 'bold' }
});
