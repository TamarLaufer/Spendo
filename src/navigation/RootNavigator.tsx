import React, { useEffect } from 'react';
import StackNavigator from './AppStackNavigator';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import { AuthStackNavigator } from './AuthStackNavigator';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../screens/splash/Splash';
import { useAuthStore } from '../zustandState/useAuthStore';
import { useAppBootstrapStore } from '../zustandState/useAppBootstrapStore';
import { useCategory } from '../zustandState/useCategory';
import { useExpenses } from '../zustandState/useExpenses';

const RootNavigator = () => {
  const user = useAuthStore(state => state.user);
  const isLoading = useAuthStore(state => state.isAuthLoading);
  const isAppReady = useAppBootstrapStore(state => state.isAppReady);
  const setAppReady = useAppBootstrapStore(state => state.setAppReady);
  const setUserToStore = useAuthStore(state => state.setUser);
  const setIsAuthLoading = useAuthStore(state => state.setIsAuthLoading);
  const loadCategories = useCategory(state => state.loadCategories);
  const loadExpenses = useExpenses(state => state.loadExpenses);

  const theme = {
    ...DefaultTheme,
    colors: { ...DefaultTheme.colors, background: '#f6f7f9' },
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), async firebaseUser => {
      if (firebaseUser) {
        await firebaseUser.reload();
      }

      setUserToStore(firebaseUser);
      setIsAuthLoading(false);
    });

    return unsubscribe;
  }, [setAppReady, setUserToStore, setIsAuthLoading]);

  useEffect(() => {
    const bootstrap = async () => {
      if (!user) {
        setAppReady(true);
        return;
      }
      setAppReady(false);
      try {
        await Promise.all([loadCategories(), loadExpenses()]);
        setAppReady(true);
      } catch (e) {
        console.log('Bootstrap error', e);
      }
    };

    bootstrap();
  }, [user, setAppReady, loadCategories, loadExpenses]);

  if (!isAppReady || isLoading) return <SplashScreen />;

  return (
    <NavigationContainer theme={theme}>
      {user ? <StackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;
