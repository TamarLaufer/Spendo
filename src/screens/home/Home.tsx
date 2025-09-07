import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import ScreenLayout from '../../components/screenLayout/ScreenLayout';
import { useExpenses } from '../../zustandState/useExpenses';
import LastExpenses from '../../components/lastExpenses/LastExpenses';
import Logo from '../../assets/icons/graph.svg';

const Home = () => {
  const loadExpenses = useExpenses(state => state.loadExpenses);

  useEffect(() => {
    loadExpenses();
  }, [loadExpenses]);

  return (
    <ScreenLayout>
      <ScrollView style={styles.scrollView}>
        <View style={styles.logoContainer}>
          <Logo width={300} height={300} />
        </View>
        <LastExpenses />
      </ScrollView>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Assistant',
    fontSize: 20,
  },
});

export default Home;
