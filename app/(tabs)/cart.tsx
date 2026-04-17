import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useStore } from '../../src/store/useStore';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Cart() {
  const { cart, addToCart, removeFromCart, clearCart } = useStore();
  const router = useRouter();

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    router.push('/checkout');
  };

  if (cart.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="cart-outline" size={80} color="#E0E0E0" />
        <Text style={styles.emptyTitle}>Your cart is empty</Text>
        <Text style={styles.emptySubtitle}>Looks like you haven't added anything yet.</Text>
        <TouchableOpacity style={styles.shopBtn} onPress={() => router.push('/(tabs)/menu')}>
          <Text style={styles.shopBtnText}>Start Browsing</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>My Cart</Text>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        {cart.map(item => (
          <View key={item.id} style={styles.cartItem}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity style={styles.actionBtn} onPress={() => removeFromCart(item.id)}>
                <Ionicons name="remove" size={18} color="#27AE60" />
              </TouchableOpacity>
              <Text style={styles.qty}>{item.quantity}</Text>
              <TouchableOpacity style={styles.actionBtn} onPress={() => addToCart(item)}>
                <Ionicons name="add" size={18} color="#27AE60" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <View style={{height: 20}} />
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.row}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyContainer: { flex: 1, backgroundColor: '#F9FBF9', justifyContent: 'center', alignItems: 'center', padding: 20 },
  emptyTitle: { fontSize: 22, fontWeight: 'bold', color: '#2C3E50', marginTop: 20, marginBottom: 5 },
  emptySubtitle: { fontSize: 15, color: '#7F8C8D', textAlign: 'center', marginBottom: 30 },
  shopBtn: { backgroundColor: '#27AE60', paddingHorizontal: 30, paddingVertical: 15, borderRadius: 25 },
  shopBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  
  container: { flex: 1, backgroundColor: '#F9FBF9', paddingTop: 60 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#2C3E50', marginBottom: 20, paddingHorizontal: 20 },
  scroll: { paddingHorizontal: 20 },
  cartItem: { backgroundColor: '#FFF', padding: 20, borderRadius: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15, shadowColor: '#000', shadowOffset: {width:0, height:2}, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: 'bold', color: '#2C3E50', marginBottom: 5 },
  itemPrice: { fontSize: 15, color: '#27AE60', fontWeight: '600' },
  actions: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F1F1F1', borderRadius: 20, padding: 5 },
  actionBtn: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: {width:0, height:1}, shadowOpacity: 0.1, shadowRadius: 2, elevation: 1 },
  qty: { marginHorizontal: 15, fontSize: 16, fontWeight: 'bold', color: '#2C3E50' },
  
  footer: { backgroundColor: '#FFF', padding: 25, borderTopLeftRadius: 30, borderTopRightRadius: 30, shadowColor: '#000', shadowOffset: {width:0, height:-5}, shadowOpacity: 0.05, shadowRadius: 10, elevation: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  totalLabel: { fontSize: 18, color: '#7F8C8D', fontWeight: '500' },
  totalValue: { fontSize: 24, fontWeight: 'bold', color: '#2C3E50' },
  checkoutBtn: { backgroundColor: '#27AE60', paddingVertical: 18, borderRadius: 15, alignItems: 'center' },
  checkoutText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }
});
