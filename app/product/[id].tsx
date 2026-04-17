import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { PRODUCTS } from '../../src/data/mockData';
import { useStore } from '../../src/store/useStore';
import { Ionicons } from '@expo/vector-icons';

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const product = PRODUCTS.find(p => p.id === id);
  const { addToCart, toggleFavorite, favorites } = useStore();

  if (!product) return <View style={styles.container}><Text>Product not found.</Text></View>;

  const isFav = favorites.includes(product.id);

  return (
    <ScrollView style={styles.container} bounces={false} showsVerticalScrollIndicator={false}>
      <View style={styles.imageContainer}>
        <Image source={product.image} style={styles.image} />
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="close" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.favBtn} onPress={() => toggleFavorite(product.id)}>
          <Ionicons name={isFav ? "heart" : "heart-outline"} size={24} color={isFav ? "#E74C3C" : "#000"} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{product.name}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          <View style={styles.calPill}>
            <Ionicons name="flame-outline" size={16} color="#E67E22" />
            <Text style={styles.calText}>{product.calories} Cal</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Details</Text>
        <Text style={styles.desc}>{product.description}</Text>

        <TouchableOpacity style={styles.addToCartBtn} onPress={() => { addToCart(product); router.back(); }}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
          <Text style={styles.addToCartPrice}>${product.price.toFixed(2)}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  imageContainer: { width: '100%', height: 350, position: 'relative' },
  image: { width: '100%', height: '100%' },
  backBtn: { position: 'absolute', top: 50, left: 20, backgroundColor: '#FFF', padding: 8, borderRadius: 20, shadowColor: '#000', shadowOffset: {width:0, height:2}, shadowOpacity: 0.1, shadowRadius: 5 },
  favBtn: { position: 'absolute', top: 50, right: 20, backgroundColor: '#FFF', padding: 8, borderRadius: 20, shadowColor: '#000', shadowOffset: {width:0, height:2}, shadowOpacity: 0.1, shadowRadius: 5 },
  content: { padding: 25, backgroundColor: '#FFF', borderTopLeftRadius: 30, borderTopRightRadius: 30, marginTop: -30 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#2C3E50', marginBottom: 15 },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
  price: { fontSize: 24, fontWeight: 'bold', color: '#27AE60' },
  calPill: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FDF2E9', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  calText: { color: '#E67E22', fontWeight: 'bold', marginLeft: 5 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#2C3E50', marginBottom: 10 },
  desc: { fontSize: 15, color: '#7F8C8D', lineHeight: 24, marginBottom: 40 },
  addToCartBtn: { backgroundColor: '#27AE60', padding: 18, borderRadius: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', shadowColor: '#27AE60', shadowOffset: {width:0, height:5}, shadowOpacity: 0.3, shadowRadius: 10, elevation: 5 },
  addToCartText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  addToCartPrice: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }
});
