import { FlatList } from 'react-native';
import React from 'react';
import OneCard from '../oneCard/OneCard';
import { CARD_WIDTH, SPACING } from '../../../config/consts';
import { CategoryType } from '../../../shared/categoryType';
import { Container } from './TrackingExpensesCarousel.styles';
import WithSkeleton from '../../skeleton/withSkeleton/WithSkeleton';
import SkeletonBlock from '../../skeleton/skeletonBlock/SkeletonBlock';

const TrackingExpensesCarousel = ({
  categories,
}: {
  categories: CategoryType[];
}) => {
  const renderItem = ({ item }: { item: CategoryType }) => (
    <OneCard
      icon={item?.icon ?? 'defaultIcon'}
      id={item.id}
      name={item.name}
      maxAmount={item.maxAmount}
    />
  );

  const isReady = categories.length > 0;

  return (
    <WithSkeleton
      ready={isReady}
      skeleton={<SkeletonBlock height={130} radius={12} />}
    >
      <Container>
        <FlatList
          data={categories}
          horizontal
          keyExtractor={item => item.id}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH + SPACING}
          decelerationRate="fast"
          contentContainerStyle={{ paddingHorizontal: SPACING }}
        />
      </Container>
    </WithSkeleton>
  );
};

export default TrackingExpensesCarousel;
