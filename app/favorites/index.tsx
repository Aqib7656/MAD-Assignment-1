import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../../src/store/useStore';
import { PRODUCTS } from '../../src/data/mockData';

export default function Favorites() {
  const router = useRouter();
  const { favorites, toggleFavorite, addToCart } = useStore();

  const favoriteProducts = PRODUCTS.filter(p => favorites.includes(p.id));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#2C3E50" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Favorites</Text>
        <View style={{width:40}} /> 
      </View>

      <ScrollView style={styles.content}>
        {favoriteProducts.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="heart-outline" size={80} color="#E8ECE8" />
            <Text style={styles.emptyText}>No favorites yet!</Text>
          </View>
        ) : (
          favoriteProducts.map(product => (
            <View key={product.id} style={styles.card}>
              <Image source={product.image} style={styles.image} />
              <View style={styles.details}>
                <View style={styles.titleRow}>
                  <Text style={styles.title}>{product.name}</Text>
                  <TouchableOpacity onPress={() => toggleFavorite(product.id)}>
                    <Ionicons name="heart" size={24} color="#E74C3C" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.desc} numberOfLines={2}>{product.description}</Text>
                <View style={styles.priceRow}>
                  <Text style={styles.price}>${product.price.toFixed(2)}</Text>
                  <TouchableOpacity style={styles.addBtn} onPress={() => addToCart(product)}>
                    <Text style={styles.addBtnText}>Add to Cart</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        )}
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
  emptyState: { alignItems: 'center', justifyContent: 'center', marginTop: 100 },
  emptyText: { fontSize: 18, color: '#7F8C8D', marginTop: 15 },
  card: { backgroundColor: '#FFF', borderRadius: 20, marginBottom: 20, padding: 15, flexDirection: 'row', shadowColor: '#000', shadowOffset: {width:0, height:3}, shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 },
  image: { width: 90, height: 90, borderRadius: 15, marginRight: 15 },
  details: { flex: 1, justifyContent: 'space-between' },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 16, fontWeight: 'bold', color: '#2C3E50', flex: 1, marginRight: 10 },
  desc: { fontSize: 13, color: '#7F8C8D', marginTop: 4, marginBottom: 10 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  price: { fontSize: 16, fontWeight: 'bold', color: '#27AE60' },
  addBtn: { backgroundColor: '#27AE60', paddingHorizontal: 15, paddingVertical: 6, borderRadius: 12 },
  addBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 12 }
});
