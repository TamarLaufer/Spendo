import React, { useEffect } from 'react';
import StackNavigator from './AppStackNavigator';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import { AuthStackNavigator } from './AuthStackNavigator';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../screens/splash/Splash';
import { useAuthStore } from '../zustandState/useAuthStore';

const RootNavigator = () => {
  const user = useAuthStore(state => state.user);
  const isLoading = useAuthStore(state => state.isAuthLoading);
  const setUserToStore = useAuthStore(state => state.setUser);
  const setIsAuthLoading = useAuthStore(state => state.setIsAuthLoading);

  const theme = {
    ...DefaultTheme,
    colors: { ...DefaultTheme.colors, background: '#f6f7f9' },
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), firebaseUser => {
      setUserToStore(firebaseUser);
      setIsAuthLoading(false);
    });

    return unsubscribe;
  }, [setUserToStore, setIsAuthLoading]);

  if (isLoading) return <SplashScreen />;

  return (
    <NavigationContainer theme={theme}>
      {user ? <StackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;
