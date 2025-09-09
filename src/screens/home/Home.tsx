import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import ScreenLayout from '../../components/screenLayout/ScreenLayout';
import { useExpenses } from '../../zustandState/useExpenses';
import LastExpenses from '../../components/lastExpenses/LastExpenses';
import Logo from '../../assets/icons/graph.svg';
import Balance from '../../components/balance/Balance';

const Home = () => {
  const loadExpenses = useExpenses(state => state.loadExpenses);

  useEffect(() => {
    loadExpenses();
  }, [loadExpenses]);

  return (
    <ScreenLayout>
      <ScrollView style={styles.scrollView}>
        <View style={styles.balanceContainer}>
          <Balance />
        </View>
        <View style={styles.logoContainer}>
          <Logo width={150} height={150} />
        </View>
        <View style={styles.lastExpenses}>
          <LastExpenses />
        </View>
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
  balanceContainer: {
    margin: 20,
  },
  text: {
    fontFamily: 'Assistant',
    fontSize: 20,
  },
  lastExpenses: {
    marginVertical: 5,
  },
});

export default Home;
