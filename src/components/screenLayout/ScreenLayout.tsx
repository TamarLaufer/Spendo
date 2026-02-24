import React from 'react';
import TopBar from '../topBar/TopBar';
import { Container } from './ScreenLayout.styles';
import { RootNav } from '../../screens/expenses/expenseDetails/types';
import { useNavigation } from '@react-navigation/native';

export default function ScreenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigation = useNavigation<RootNav>();

  const handleIconPress = () => {
    navigation.navigate('MainTabs', {
      screen: 'Home',
    });
  };
  return (
    <Container>
      <TopBar onPress={handleIconPress} />
      {children}
    </Container>
  );
}
