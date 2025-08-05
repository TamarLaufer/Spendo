import React from 'react';
import TopBar from '../topBar/TopBar';
import { View } from 'react-native';

export default function ScreenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <TopBar />
      {children}
    </View>
  );
}
