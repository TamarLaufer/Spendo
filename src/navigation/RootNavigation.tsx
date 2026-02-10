import React, { useEffect, useState } from 'react';
import StackNavigation from './AppStackNavigator';
import {
  FirebaseAuthTypes,
  getAuth,
  onAuthStateChanged,
} from '@react-native-firebase/auth';
import { AuthStackNavigator } from './AuthStackNavigator';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../screens/splash/Splash';

const RootNavigation = () => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const theme = {
    ...DefaultTheme,
    colors: { ...DefaultTheme.colors, background: '#f6f7f9' },
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), firebaseUser => {
      setUser(firebaseUser);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  if (isLoading) return <SplashScreen />;

  return (
    <NavigationContainer theme={theme}>
      {user ? <StackNavigation /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigation;
