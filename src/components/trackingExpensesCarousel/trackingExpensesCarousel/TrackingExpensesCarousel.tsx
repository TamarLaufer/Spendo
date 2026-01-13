import { FlatList } from 'react-native';
import React from 'react';
import OneCard from '../oneCard/OneCard';
import { CARD_WIDTH, SPACING } from '../../../config/consts';
import { Category } from '../../../shared/categoryType';
import { Container } from './TrackingExpensesCarousel.styles';

const TrackingExpensesCarousel = ({
  categories,
}: {
  categories: Category[];
}) => {
  const renderItem = ({ item }: { item: Category }) => (
    <OneCard
      icon={item?.icon ?? 'defaultIcon'}
      id={item.id}
      name={item.name}
      maxAmount={item.maxAmount}
    />
  );

  return (
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
  );
};

export default TrackingExpensesCarousel;
