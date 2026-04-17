# Dino-Flow 🍔🥗🍣🍕

A premium, full-featured restaurant application built with React Native and Expo. Designed with a clean, high-end minimalist aesthetic, this app provides a seamless user experience from browsing to checkout.

## 🌟 Key Features

- **Authentication Flow:** Fully functional login, signup, and "Continue as Guest" modes.
- **Dynamic Dashboard:** Real-time search tracking, dynamically curated category items, and beautifully styled promotion banners.
- **Full Menu & Filtering:** A highly visual menu screen that allows dynamic filtering by category with preserved states and deep-linking integrations.
- **Smart Shopping Cart:** Global floating cart action button, easy quantity management, and an interactive mock checkout process (with address and payment forms).
- **Table Reservations:** A built-in real-time reservation tool with selectable dates, times, and party sizes.
- **Favorites System:** "Like" system for menu items, automatically saved to a personalized Favorites screen.
- **User Profile:** Manage order history, settings (with dark mode toggles), reservations, and account logouts directly from the Profile tab.
- **Animations:** High-end entrance and transition animations powered by `react-native-reanimated`.
- **Responsive Layouts:** Designed meticulously with `react-native-safe-area-context` to automatically avoid dynamic mobile notches and navigation gesture bars.

## 🚀 Tech Stack

- **Framework:** [Expo](https://expo.dev/) (SDK 54) & [React Native](https://reactnative.dev/)
- **Routing:** [Expo Router](https://docs.expo.dev/router/introduction/) (File-based navigation)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Animations:** `react-native-reanimated`
- **Iconography:** `@expo/vector-icons` (Ionicons)
- **Language:** TypeScript 

## 📂 Project Structure

```text
├── app/
│   ├── (auth)/        # Login, Signup layouts
│   ├── (tabs)/        # Bottom Navigation (Home, Menu, Cart, Profile)
│   ├── booking/       # Table Reservation modal
│   ├── checkout/      # Payment & Address secure layout
│   ├── favorites/     # Favorited items screen
│   ├── orders/        # Order history
│   ├── product/       # Product details page (dynamic [id])
│   ├── settings/      # User settings and toggles
│   └── _layout.tsx    # Global entry point and Safe Area Wrapper
├── assets/
│   └── images/
│       └── products/  # High-quality local product photography
├── src/
│   ├── data/          # Mock data structures (Products, Categories)
│   └── store/         # Zustand global state (Auth, Cart, Favorites)
```

## 🛠️ Installation & Getting Started

**1. Clone the repository**
```bash
git clone https://github.com/your-username/dino-flow.git
cd dino-flow
```

**2. Install Dependencies**
```bash
npm install
```

**3. Start the application**
```bash
npm start
```

**4. Run on your actual device**
- Download the "Expo Go" app on your iOS or Android device.
- Scan the QR code presented in your terminal after starting the app.
- *(Note: If you are on a restricted network, run `npx expo start --tunnel` instead).*

**5. Run on Web (Browser)**
```bash
npm run web
```

## 🔮 Future Roadmap (Backend Integration)
This prototype utilizes highly normalized mock data specifically designed for easy migration. To plug into a real database (like **Firebase** or **Supabase**), you simply need to rewrite the global functions inside `src/store/useStore.ts` to execute API requests instead of modifying the local Zustand state!
