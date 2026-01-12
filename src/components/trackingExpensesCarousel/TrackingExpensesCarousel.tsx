import { FlatList, StyleSheet, View } from 'react-native';
import React from 'react';
import OneCard from './OneCard';
import { CARD_WIDTH, SPACING } from '../../config/consts';
import { Category } from '../../shared/categoryType';

const TrackingExpensesCarousel = ({
  categories,
}: {
  categories: Category[];
}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        horizontal
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <OneCard id={item.id} name={item.name} maxAmount={item.maxAmount} />
        )}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + SPACING}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: SPACING }}
      />
    </View>
  );
};

export default TrackingExpensesCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10,
    justifyContent: 'center',
  },
});
