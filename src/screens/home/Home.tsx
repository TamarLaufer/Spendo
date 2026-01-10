import { useEffect, useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import ScreenLayout from '../../components/screenLayout/ScreenLayout';
import { useExpenses } from '../../zustandState/useExpenses';
import Balance from '../../components/balance/Balance';
import { useCategory } from '../../zustandState/useCategory';
import { DEV_HOUSEHOLD_ID } from '../../config/consts';
import { useEnsureSubcatIndex } from '../../hooks/useEnsureSubcatIndex';
import ExpensesListView from '../../components/expensesListView/ExpensesListView';
import TrackingExpensesCarousel from '../../components/trackingExpensesCarousel/TrackingExpensesCarousel';

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

    return () => {
      unsubExp?.();
      unsubCat?.();
    };
  }, [loadExpenses, loadCategories, subscribeExpenses, subscribeCategories]);

  return (
    <ScreenLayout>
      <ScrollView>
        <View style={styles.balanceContainer}>
          <Balance />
        </View>
        <View style={styles.caruselContainer}>
          <TrackingExpensesCarousel categories={categories} />
        </View>
        <View style={styles.lastExpenses}>
          <ExpensesListView numOfTransactions={3} header link />
        </View>
      </ScrollView>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
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
  caruselContainer: {
    alignItems: 'center',
  },
});

export default Home;
