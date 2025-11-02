import { useEffect, useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import ScreenLayout from '../../components/screenLayout/ScreenLayout';
import { useExpenses } from '../../zustandState/useExpenses';
import LastExpenses from '../../components/lastExpenses/LastExpenses';
import Logo from '../../assets/icons/graph.svg';
import Balance from '../../components/balance/Balance';
import { useCategory } from '../../zustandState/useCategory';
import { DEV_HOUSEHOLD_ID } from '../../config/consts';
import { useEnsureSubcatIndex } from '../../zustandState/useEnsureSubcatIndex';

const Home = () => {
  const loadExpenses = useExpenses(state => state.loadExpenses);
  const subscribeExpenses = useExpenses(state => state.subscribeExpenses);
  const loadCategories = useCategory(state => state.loadCategories);
  const subscribeCategories = useCategory(state => state.subscribe);
  const expError = useExpenses(state => state.error);
  const catError = useCategory(state => state.error);
  const categories = useCategory(state => state.categories);
  const categoryIds = useMemo(
    () => categories.map(cat => cat.id),
    [categories],
  );

  const topIds = useMemo(() => categoryIds.slice(0, 30), [categoryIds]);

  useEnsureSubcatIndex(topIds);

  useEffect(() => {
    if (expError) console.log('[Home] expenses.error =', expError);
    if (catError) console.log('[Home] categories.error =', catError);
  }, [expError, catError]);

  useEffect(() => {
    let unsubExp: (() => void) | undefined;
    let unsubCat: (() => void) | undefined;

    (async () => {
      try {
        await loadExpenses();
        await loadCategories();

        unsubExp = subscribeExpenses(DEV_HOUSEHOLD_ID);
        unsubCat = subscribeCategories?.();
      } catch (e) {
        console.error(e);
      }
    })();

    // 3) cleanup בעת עזיבת המסך
    return () => {
      unsubExp?.();
      unsubCat?.();
    };
  }, [loadExpenses, loadCategories, subscribeExpenses, subscribeCategories]);

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
    // marginVertical: 5,
  },
});

export default Home;
