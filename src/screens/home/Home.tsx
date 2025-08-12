import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import ScreenLayout from '../../components/screenLayout/ScreenLayout';
import { useExpenses } from '../../zustandState/useExpenses';
import LastExpenses from '../../components/lastExpenses/LastExpenses';

const Home = () => {
  const loadExpenses = useExpenses(s => s.loadExpenses);

  useEffect(() => {
    loadExpenses();
  }, [loadExpenses]);

  return (
    <ScreenLayout>
      <View style={styles.container}>
        <LastExpenses />
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'blue',
  },
  text: {
    fontFamily: 'Assistant',
    fontSize: 20,
  },
});

export default Home;
