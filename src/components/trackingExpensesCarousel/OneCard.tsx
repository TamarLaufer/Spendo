import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { theme } from '../../theme/theme';
import { CARD_WIDTH } from '../../config/consts';

type CategoryCard = {
  id: string;
  name: string;
  maxAmount?: number;
};

const OneCard = (item: CategoryCard) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.maxAmount}>{item.maxAmount}</Text>
    </View>
  );
};

export default OneCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.color.green,
    borderRadius: 10,
    padding: 20,
    marginRight: 10,
    width: CARD_WIDTH,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'MPLUSRounded1c-Regular',
  },
  maxAmount: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'MPLUSRounded1c-Regular',
  },
});
