import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../../src/store/useStore';
import { View, Text } from 'react-native';

export default function TabLayout() {
  const cart = useStore(state => state.cart);
  const cartSize = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#27AE60',
      tabBarInactiveTintColor: '#95A5A6',
      tabBarStyle: { borderTopWidth: 0, elevation: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, shadowOffset: {width:0, height:-5}, height: 65, paddingBottom: 10, paddingTop: 10 },
    }}>
      <Tabs.Screen name="index" options={{
        title: 'Home',
        tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={24} color={color} />
      }} />
      <Tabs.Screen name="menu" options={{
        title: 'Menu',
        tabBarIcon: ({ color }) => <Ionicons name="restaurant-outline" size={24} color={color} />
      }} />
      <Tabs.Screen name="cart" options={{
        title: 'Cart',
        tabBarIcon: ({ color }) => (
          <View>
            <Ionicons name="cart-outline" size={24} color={color} />
            {cartSize > 0 && (
              <View style={{ position: 'absolute', right: -8, top: -5, backgroundColor: '#E74C3C', borderRadius: 10, width: 20, height: 20, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>{cartSize}</Text>
              </View>
            )}
          </View>
        )
      }} />
      <Tabs.Screen name="profile" options={{
        title: 'Profile',
        tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={24} color={color} />
      }} />
    </Tabs>
  );
}
