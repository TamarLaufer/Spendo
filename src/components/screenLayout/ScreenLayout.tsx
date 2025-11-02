import React from 'react';
import TopBar from '../topBar/TopBar';
import { StyleSheet, View } from 'react-native';

export default function ScreenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <View style={styles.container}>
      <TopBar />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
