import React from 'react';
import { FlatList } from 'react-native';
import ScreenLayout from '../../components/screenLayout/ScreenLayout';
import Balance from '../../components/balance/Balance';
import TrackingExpensesCarousel from '../../components/trackingExpensesCarousel/trackingExpensesCarousel/TrackingExpensesCarousel';
import LastExpensesListView from '../../components/lastExpensesListView/LastExpensesListView';
import { useHomeData } from '../../hooks/useHomeData';
import {
  BalanceSection,
  CarouselSection,
  ErrorText,
  HomeContainer,
} from './Home.styles';
import { STRINGS } from '../../strings/hebrew';
import HomeHeader from '../../components/homeHeader/HomeHeader';

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
            <HomeHeader />
            <BalanceSection>
              <Balance />
            </BalanceSection>

            <CarouselSection>
              <TrackingExpensesCarousel categories={categories} />
            </CarouselSection>

            <LastExpensesListView
              data={expenses.slice(0, 3)}
              loading={loading}
            />
          </HomeContainer>
        }
      />
    </ScreenLayout>
  );
};

export default Home;
