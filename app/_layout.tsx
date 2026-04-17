import { Stack, useRouter, usePathname } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStore } from '../src/store/useStore';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RootLayout() {
  const cart = useStore(state => state.cart);
  const router = useRouter();
  const pathname = usePathname();
  
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const showFab = cartItemCount > 0 && pathname !== '/cart' && pathname !== '/checkout';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F9FBF9' }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="product/[id]" options={{ presentation: 'modal' }} />
        <Stack.Screen name="booking/index" options={{ presentation: 'modal' }} />
        <Stack.Screen name="checkout/index" options={{ title: 'Checkout', presentation: 'card' }} />
        <Stack.Screen name="orders/index" options={{ title: 'Order History', presentation: 'card' }} />
        <Stack.Screen name="favorites/index" options={{ title: 'Favorites', presentation: 'card' }} />
        <Stack.Screen name="settings/index" options={{ title: 'Settings', presentation: 'card' }} />
      </Stack>

      {showFab && (
        <TouchableOpacity 
          style={styles.fab} 
          onPress={() => router.push('/(tabs)/cart')}
          activeOpacity={0.8}
        >
          <Ionicons name="cart" size={24} color="#FFF" />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{cartItemCount}</Text>
          </View>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fab: { 
    position: 'absolute', 
    bottom: 120, 
    right: 20, 
    width: 56, 
    height: 56, 
    borderRadius: 28, 
    backgroundColor: '#2C3E50', 
    justifyContent: 'center', 
    alignItems: 'center', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 6 }, 
    shadowOpacity: 0.35, 
    shadowRadius: 10, 
    elevation: 8, 
    zIndex: 999 
  },
  badge: { 
    position: 'absolute', 
    top: 4, 
    right: -2, 
    backgroundColor: '#E74C3C', 
    minWidth: 22, 
    height: 22, 
    borderRadius: 11, 
    justifyContent: 'center', 
    alignItems: 'center', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 2, 
    elevation: 3,
    paddingHorizontal: 4
  },
  badgeText: { 
    color: '#FFF', 
    fontSize: 11, 
    fontWeight: 'bold' 
  }
});
