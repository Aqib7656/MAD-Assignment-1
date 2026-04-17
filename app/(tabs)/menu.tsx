import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { CATEGORIES, PRODUCTS } from '../../src/data/mockData';
import { useStore } from '../../src/store/useStore';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function Menu() {
  const { category } = useLocalSearchParams();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const router = useRouter();

  useEffect(() => {
    if (category) {
      setActiveCategory(Array.isArray(category) ? category[0] : category);
    } else {
      setActiveCategory('all');
    }
  }, [category]);

  const handleAddToCart = (product: any) => {
    useStore.getState().addToCart(product);
  };

  const handleToggleFavorite = (product: any) => {
    useStore.getState().toggleFavorite(product.id);
  };

  const favorites = useStore(state => state.favorites);
  const displayedProducts = activeCategory === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.categoryId === activeCategory);

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Full Menu</Text>

      {/* Category Submenu */}
      <View style={{height: 60}}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
          <TouchableOpacity onPress={() => setActiveCategory('all')} style={[styles.catPill, activeCategory === 'all' && styles.catPillActive]}>
            <Text style={[styles.catPillText, activeCategory === 'all' && styles.catPillTextActive]}>All Menu</Text>
          </TouchableOpacity>
          {CATEGORIES.map(cat => {
            const isActive = activeCategory === cat.id;
            return (
              <TouchableOpacity key={cat.id} onPress={() => setActiveCategory(cat.id)} style={[styles.catPill, isActive && styles.catPillActive]}>
                <Text style={[styles.catPillText, isActive && styles.catPillTextActive]}>{cat.name}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Products list */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {displayedProducts.map(product => {
          const isFav = favorites.includes(product.id);
          return (
            <TouchableOpacity key={product.id} style={styles.card} onPress={() => router.push(`/product/${product.id}`)}>
              <Image source={product.image} style={styles.image} />
              <View style={styles.details}>
                <View style={styles.titleRow}>
                  <Text style={styles.title}>{product.name}</Text>
                  <TouchableOpacity onPress={() => handleToggleFavorite(product)}>
                    <Ionicons name={isFav ? "heart" : "heart-outline"} size={22} color={isFav ? "#E74C3C" : "#95A5A6"} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.desc} numberOfLines={2}>{product.description}</Text>
                <View style={styles.priceRow}>
                  <Text style={styles.price}>${product.price.toFixed(2)}</Text>
                  <TouchableOpacity style={styles.addBtn} onPress={() => handleAddToCart(product)}>
                    <Text style={styles.addBtnText}>Add</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FBF9', paddingTop: 60, paddingHorizontal: 20 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#2C3E50', marginBottom: 20 },
  catScroll: { paddingBottom: 10 },
  catPill: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, backgroundColor: '#FFF', marginRight: 10, borderWidth: 1, borderColor: '#E8ECE8', height: 40, justifyContent: 'center' },
  catPillActive: { backgroundColor: '#27AE60', borderColor: '#27AE60' },
  catPillText: { color: '#7F8C8D', fontWeight: '600' },
  catPillTextActive: { color: '#FFF' },
  card: { backgroundColor: '#FFF', borderRadius: 20, marginBottom: 20, padding: 15, flexDirection: 'row', shadowColor: '#000', shadowOffset: {width:0, height:3}, shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 },
  image: { width: 90, height: 90, borderRadius: 15, marginRight: 15 },
  details: { flex: 1, justifyContent: 'space-between' },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  title: { fontSize: 16, fontWeight: 'bold', color: '#2C3E50', flex: 1, marginRight: 10 },
  desc: { fontSize: 13, color: '#7F8C8D', marginTop: 4, marginBottom: 10 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  price: { fontSize: 16, fontWeight: 'bold', color: '#27AE60' },
  addBtn: { backgroundColor: '#27AE60', paddingHorizontal: 15, paddingVertical: 6, borderRadius: 12 },
  addBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 12 }
});
