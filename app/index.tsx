import { Redirect } from 'expo-router';
import { useStore } from '../src/store/useStore';

export default function Index() {
  const user = useStore(state => state.user);
  
  if (user) {
    return <Redirect href="/(tabs)" />;
  }
  return <Redirect href="/(auth)/login" />;
}
