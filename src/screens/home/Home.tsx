import { useEffect, useMemo } from 'react';
import { ScrollView } from 'react-native';
import ScreenLayout from '../../components/screenLayout/ScreenLayout';
import { useExpenses } from '../../zustandState/useExpenses';
import Balance from '../../components/balance/Balance';
import { useCategory } from '../../zustandState/useCategory';
import { DEV_HOUSEHOLD_ID, NUM_OF_TRANSACTIONS } from '../../config/consts';
import { useEnsureSubcatIndex } from '../../hooks/useEnsureSubcatIndex';
import ExpensesListView from '../../components/expensesListView/ExpensesListView';
import TrackingExpensesCarousel from '../../components/trackingExpensesCarousel/TrackingExpensesCarousel';
import {
  BalanceContainer,
  CarouselContainer,
  ErrorText,
  LastExpenses,
  Loader,
} from './Home.styles';
import { STRINGS } from '../../strings/hebrew';

const Home = () => {
  const loadExpenses = useExpenses(state => state.loadExpenses);
  const subscribeExpenses = useExpenses(state => state.subscribeExpenses);
  const loadCategories = useCategory(state => state.loadCategories);
  const subscribeCategories = useCategory(state => state.subscribe);

  const expenses = useExpenses(state => state.expenses);
  const loading = useExpenses(state => state.loading);
  const expError = useExpenses(state => state.error);
  const catError = useCategory(state => state.error);
  const categories = useCategory(state => state.categories);
  const categoryIds = useMemo(
    () => categories.map(cat => cat.id),
    [categories],
  );

  const topIds = useMemo(() => categoryIds.slice(0, 30), [categoryIds]);

  useEnsureSubcatIndex(topIds);

  const lastExpenses = useMemo(
    () => expenses.slice(0, NUM_OF_TRANSACTIONS),
    [expenses],
  );

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

  if (expError)
    return <ErrorText>{STRINGS.ERROR_IN_LOADING_EXPENSES}</ErrorText>;
  if (catError)
    return <ErrorText>{STRINGS.ERROR_IN_LOADING_CATEGORIES}</ErrorText>;
  if (loading) return <Loader />;

  return (
    <ScreenLayout>
      <ScrollView>
        <BalanceContainer>
          <Balance />
        </BalanceContainer>
        <CarouselContainer>
          <TrackingExpensesCarousel categories={categories} />
        </CarouselContainer>
        <LastExpenses>
          <ExpensesListView data={lastExpenses} header link />
        </LastExpenses>
      </ScrollView>
    </ScreenLayout>
  );
};

export default Home;
