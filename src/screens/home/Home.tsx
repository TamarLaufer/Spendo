import React from 'react';
import { FlatList } from 'react-native';
import ScreenLayout from '../../components/screenLayout/ScreenLayout';
import Balance from '../../components/balance/Balance';
import TrackingExpensesCarousel from '../../components/trackingExpensesCarousel/trackingExpensesCarousel/TrackingExpensesCarousel';
import ExpensesListView from '../../components/expensesListView/ExpensesListView';
import { useHomeData } from '../../hooks/useHomeData';
import {
  BalanceContainer,
  CarouselContainer,
  ErrorText,
  Loader,
} from './Home.styles';
import { STRINGS } from '../../strings/hebrew';

const Home = () => {
  const { categories, expenses, loading, error } = useHomeData();

  if (error) {
    return <ErrorText>{STRINGS.GENERIC_ERROR}</ErrorText>;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <ScreenLayout>
      <FlatList
        data={expenses}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ExpensesListView data={[item]} />}
        ListHeaderComponent={
          <>
            <BalanceContainer>
              <Balance />
            </BalanceContainer>

            <CarouselContainer>
              <TrackingExpensesCarousel categories={categories} />
            </CarouselContainer>
          </>
        }
      />
    </ScreenLayout>
  );
};

export default Home;
