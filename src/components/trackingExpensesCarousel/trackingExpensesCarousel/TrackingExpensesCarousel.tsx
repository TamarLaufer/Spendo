import { FlatList } from 'react-native';
import React from 'react';
import OneCard from '../oneCard/OneCard';
import { CARD_WIDTH, SPACING } from '../../../config/consts';
import { CategoryType } from '../../../shared/categoryType';
import { Container } from './TrackingExpensesCarousel.styles';
import WithSkeleton from '../../skeleton/withSkeleton/WithSkeleton';
import SkeletonBlock from '../../skeleton/skeletonBlock/SkeletonBlock';
import { useNavigation } from '@react-navigation/native';
import { RootNav } from '../../../screens/expenses/expenseDetails/types';

const TrackingExpensesCarousel = ({
  categories,
}: {
  categories: CategoryType[];
}) => {
  const navigation = useNavigation<RootNav>();
  const onCategoryPress = (categoryId: string) => {
    navigation.navigate('CategoryDetails', { categoryId });
  };

  const renderItem = ({ item }: { item: CategoryType }) => (
    <OneCard
      icon={item?.icon ?? 'defaultIcon'}
      id={item.id}
      name={item.name}
      maxAmount={item.maxAmount}
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
            paddingTop: 15,
          }}
        />
      </Container>
    </WithSkeleton>
  );
};

export default TrackingExpensesCarousel;
