import React, { useEffect, useState } from 'react';
import StackNavigator from './AppStackNavigator';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import { AuthStackNavigator } from './AuthStackNavigator';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../screens/splash/Splash';
import { useAuthStore } from '../zustandState/useAuthStore';
import { useCategory } from '../zustandState/useCategory';
import { useExpenses } from '../zustandState/useExpenses';
import Redirect from '../screens/redirect/Redirect';

const RootNavigator = () => {
  const user = useAuthStore(state => state.user);
  const isLoggingIn = useAuthStore(state => state.isLoggingIn);
  const isAuthChecked = useAuthStore(state => state.isAuthChecked);
  const setUserToStore = useAuthStore(state => state.setUser);
  const loadCategories = useCategory(state => state.loadCategories);
  const loadExpenses = useExpenses(state => state.loadExpenses);
  const setIsAuthChecked = useAuthStore(state => state.setIsAuthChecked);
  const [isAppReady, setIsAppReady] = useState(false);

  const theme = {
    ...DefaultTheme,
    colors: { ...DefaultTheme.colors, background: '#f6f7f9' },
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), async firebaseUser => {
      setUserToStore(firebaseUser);
      setIsAuthChecked(true);
    });

    return unsubscribe;
  }, [setUserToStore, setIsAuthChecked]);

  useEffect(() => {
    const bootstrap = async () => {
      if (!isAuthChecked) return;

      if (!user) {
        setIsAppReady(true);
        return;
      }

      setIsAppReady(false);

      try {
        await Promise.all([loadCategories(), loadExpenses()]);
      } catch (error) {
        console.log('Bootstrap error', error);
      } finally {
        setIsAppReady(true);
      }
    };

    bootstrap();
  }, [user, isAuthChecked, loadCategories, loadExpenses]);

  if (isLoggingIn) {
    return <Redirect />;
  }

  if (!isAppReady) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer theme={theme}>
      {user ? <StackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;
