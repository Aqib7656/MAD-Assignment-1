import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { useStore } from '../../src/store/useStore';
import { CATEGORIES, PRODUCTS } from '../../src/data/mockData';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function Home() {
  const user = useStore(state => state.user);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddToCart = (product: any) => {
    useStore.getState().addToCart(product);
  };

  const displayedProducts = searchQuery.trim() !== ''
    ? PRODUCTS.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : [
        PRODUCTS.find(p => p.categoryId === '1'),
        PRODUCTS.find(p => p.categoryId === '2'),
        PRODUCTS.find(p => p.categoryId === '3'),
        PRODUCTS.find(p => p.categoryId === '4')
      ].filter((p): p is typeof PRODUCTS[0] => p !== undefined);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, {user?.name.split(' ')[0]}</Text>
          <Text style={styles.subGreeting}>What would you like to eat?</Text>
        </View>
        <TouchableOpacity style={styles.avatar} onPress={() => router.push('/(tabs)/profile')}>
          <Ionicons name="person" size={20} color="#27AE60" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#95A5A6" />
        <TextInput 
          style={styles.searchText}
          placeholder="Search for food..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#95A5A6"
        />
      </View>

      {/* Banner */}
      <View style={styles.banner}>
        <View style={styles.bannerContent}>
          <Text style={styles.bannerTitle}>30% OFF</Text>
          <Text style={styles.bannerSubtitle}>On all healthy salads</Text>
          <TouchableOpacity style={styles.bannerBtn} onPress={() => router.push('/(tabs)/menu')}>
            <Text style={styles.bannerBtnText}>Order Now</Text>
          </TouchableOpacity>
        </View>
        <Ionicons name="leaf" size={70} color="#FFF" style={{ opacity: 0.3 }} />
      </View>

      {/* Categories */}
      <Text style={styles.sectionTitle}>Categories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catList}>
        {CATEGORIES.map(cat => (
          <TouchableOpacity key={cat.id} style={styles.catCard} onPress={() => router.push(`/(tabs)/menu?category=${cat.id}` as any)}>
            <View style={styles.catIconContainer}>
              <Ionicons name={cat.icon as any} size={24} color="#27AE60" />
            </View>
            <Text style={styles.catName}>{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Popular Items */}
      <View style={styles.rowBetween}>
        <Text style={styles.sectionTitle}>Popular Items</Text>
        <TouchableOpacity onPress={() => router.push('/(tabs)/menu')}><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
      </View>
      
      <View style={styles.grid}>
        {displayedProducts.map((product, index) => (
          <Animated.View key={product.id} entering={FadeInDown.delay(index * 100).springify()} style={{ width: '47%', marginBottom: 15 }}>
            <TouchableOpacity style={[styles.productCard, {width: '100%', marginBottom: 0}]} onPress={() => router.push(`/product/${product.id}`)}>
              <Image source={product.image} style={styles.productImg} />
              <Text style={styles.productName} numberOfLines={1}>{product.name}</Text>
              <View style={styles.priceRow}>
                <Text style={styles.price}>${product.price.toFixed(2)}</Text>
                <TouchableOpacity style={styles.addBtn} onPress={() => handleAddToCart(product)}>
                  <Ionicons name="add" size={18} color="#FFF" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>

      <View style={{height: 40}} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FBF9', paddingHorizontal: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 60, marginBottom: 20 },
  greeting: { fontSize: 24, fontWeight: 'bold', color: '#2C3E50' },
  subGreeting: { fontSize: 14, color: '#7F8C8D', marginTop: 4 },
  avatar: { width: 45, height: 45, borderRadius: 22.5, backgroundColor: '#E8F5E9', justifyContent: 'center', alignItems: 'center' },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', paddingHorizontal: 15, paddingVertical: 12, borderRadius: 15, marginBottom: 25, shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  searchText: { marginLeft: 10, color: '#2C3E50', fontSize: 15, flex: 1, paddingVertical: 0 },
  banner: { backgroundColor: '#27AE60', borderRadius: 20, padding: 25, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30, shadowColor: '#27AE60', shadowOffset: {width: 0, height: 5}, shadowOpacity: 0.3, shadowRadius: 10, elevation: 5 },
  bannerContent: { flex: 1 },
  bannerTitle: { color: '#FFF', fontSize: 26, fontWeight: 'bold' },
  bannerSubtitle: { color: '#E8F5E9', fontSize: 14, marginTop: 5, marginBottom: 15 },
  bannerBtn: { backgroundColor: '#FFF', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20, alignSelf: 'flex-start' },
  bannerBtnText: { color: '#27AE60', fontWeight: 'bold', fontSize: 12 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#2C3E50', marginBottom: 15 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, marginBottom: 15 },
  seeAll: { color: '#27AE60', fontWeight: '600' },
  catList: { marginBottom: 20 },
  catCard: { alignItems: 'center', marginRight: 20 },
  catIconContainer: { width: 60, height: 60, borderRadius: 20, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2, marginBottom: 8 },
  catName: { fontSize: 13, color: '#34495E', fontWeight: '500' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  productCard: { width: '47%', backgroundColor: '#FFF', borderRadius: 20, padding: 12, marginBottom: 15, shadowColor: '#000', shadowOffset: {width: 0, height: 3}, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  productImg: { width: '100%', height: 110, borderRadius: 15, marginBottom: 10 },
  productName: { fontSize: 14, fontWeight: 'bold', color: '#2C3E50', marginBottom: 8 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  price: { fontSize: 16, fontWeight: 'bold', color: '#27AE60' },
  addBtn: { backgroundColor: '#27AE60', width: 28, height: 28, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
});
