import { FlatList } from 'react-native';
import React from 'react';
import OneCard from '../oneCard/OneCard';
import { CARD_WIDTH, SPACING } from '../../../config/consts';
import { CategoryType } from '../../../shared/categoryType';
import {
  Container,
  HeaderContainer,
  HeaderText,
} from './TrackingExpensesCarousel.styles';
import WithSkeleton from '../../skeleton/withSkeleton/WithSkeleton';
import SkeletonBlock from '../../skeleton/skeletonBlock/SkeletonBlock';
import { useNavigation } from '@react-navigation/native';
import { RootNav } from '../../../screens/expenses/expenseDetails/types';
import { STRINGS } from '../../../strings/hebrew';
import { useBudgetStats } from '../../../hooks/useBudgetStats';

const TrackingExpensesCarousel = ({
  categories,
}: {
  categories: CategoryType[];
}) => {
  const navigation = useNavigation<RootNav>();
  const onCategoryPress = (categoryId: string) => {
    navigation.navigate('CategoryDetails', { categoryId });
  };
  const { byCategory } = useBudgetStats();
  console.log('byCategory', byCategory);
  

  console.log('byCategory', byCategory);
  const renderItem = ({ item }: { item: CategoryType }) => (
    <OneCard
      icon={item?.icon ?? 'defaultIcon'}
      name={item.name}
      maxAmount={item.maxAmount}
      spent={byCategory[item.id]?.spent ?? 0}
      percent={byCategory[item.id]?.percent ?? 0}
      onPress={() => onCategoryPress(item.id)}
    />
  );

  const isReady = categories.length > 0;

  return (
    <WithSkeleton
      ready={isReady}
      skeleton={<SkeletonBlock height={130} radius={12} />}
    >
      <Container>
        <HeaderContainer>
          <HeaderText>{STRINGS.TRACKING_EXPENSES}</HeaderText>
        </HeaderContainer>
        <FlatList
          data={categories}
          horizontal
          keyExtractor={item => item.id}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH + SPACING}
          decelerationRate="fast"
          contentContainerStyle={{
            paddingHorizontal: SPACING,
            paddingBottom: 8,
            paddingTop: 10,
          }}
        />
      </Container>
    </WithSkeleton>
  );
};

export default TrackingExpensesCarousel;
