import React from 'react';
import { FlatList } from 'react-native';
import ScreenLayout from '../../components/screenLayout/ScreenLayout';
import Balance from '../../components/balance/Balance';
import TrackingExpensesCarousel from '../../components/trackingExpensesCarousel/trackingExpensesCarousel/TrackingExpensesCarousel';
import ExpensesListView from '../../components/expensesListView/ExpensesListView';
import { useHomeData } from '../../hooks/useHomeData';
import {
  BalanceSection,
  CarouselSection,
  ErrorText,
  Spacer,
  HomeContainer,
} from './Home.styles';
import { STRINGS } from '../../strings/hebrew';

const Home = () => {
  const { categories, expenses, loading, error } = useHomeData();

  if (error) {
    return <ErrorText>{STRINGS.GENERIC_ERROR}</ErrorText>;
  }

  return (
    <ScreenLayout>
      <FlatList
        data={[]} // Data is not needed for this list
        renderItem={null}
        ListHeaderComponent={
          <HomeContainer>
            <BalanceSection>
              <Balance />
            </BalanceSection>

            <CarouselSection>
              <TrackingExpensesCarousel categories={categories} />
            </CarouselSection>

            <Spacer />

            <ExpensesListView data={expenses.slice(0, 3)} loading={loading} />
          </HomeContainer>
        }
      />
    </ScreenLayout>
  );
};

export default Home;
