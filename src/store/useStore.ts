import { create } from 'zustand';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface StoreState {
  user: { id: string; name: string; isGuest: boolean } | null;
  setUser: (user: StoreState['user']) => void;
  cart: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (id: string, all?: boolean) => void;
  clearCart: () => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
}

export const useStore = create<StoreState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  
  cart: [],
  addToCart: (product) => set((state) => {
    const existing = state.cart.find(item => item.id === product.id);
    if (existing) {
      return { cart: state.cart.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i) };
    }
    return { cart: [...state.cart, { id: product.id, name: product.name, price: product.price, quantity: 1 }] };
  }),
  removeFromCart: (id, all = false) => set((state) => {
    const existing = state.cart.find(item => item.id === id);
    if (!existing) return state;
    if (all || existing.quantity === 1) {
      return { cart: state.cart.filter(item => item.id !== id) };
    }
    return { cart: state.cart.map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i) };
  }),
  clearCart: () => set({ cart: [] }),
  
  favorites: [],
  toggleFavorite: (id) => set((state) => ({
    favorites: state.favorites.includes(id) 
      ? state.favorites.filter(fId => fId !== id)
      : [...state.favorites, id]
  })),
}));
