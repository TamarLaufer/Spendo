import React from 'react';
import { View, StyleSheet } from 'react-native';
import TopBar from '../topBar/TopBar';

export default function ScreenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <View style={styles.container}>
      <TopBar />
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1 },
});
