import { AuthProvider, useAuth } from '@/context/AuthContext';
import * as Font from 'expo-font';
import { Slot, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function RootLayoutNav() {
  const { authData, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const isAtLogin = segments[0] === 'auth';

    if (!authData && !isAtLogin) {
      router.replace('/auth');
    } else if (authData && isAtLogin) {
      router.replace('/main/chatScreen');
    }
  }, [authData, loading, segments]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#efeae2' }}>
        <ActivityIndicator size="large" color="#008069" />
      </View>
    );
  }

  return <Slot />;
}

export default function Layout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({});
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.warn('Error loading app resources', error);
      } finally {
        await SplashScreen.hideAsync();
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <RootLayoutNav />
      </AuthProvider>
    </SafeAreaProvider>
  );
}