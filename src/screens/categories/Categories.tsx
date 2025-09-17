import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScreenLayout from '../../components/screenLayout/ScreenLayout';
import TransactionList from '../../components/TransactionList/TransactionList';
import { useCategory } from '../../zustandState/useCategory';
import { IconRegistry } from '../../assets/icons';

const Categories: FC = () => {
  const categories = useCategory(state => state.categories);
  return (
    <ScreenLayout>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>קטגוריות</Text>
        </View>
        <TransactionList
          data={categories}
          mapItem={item => {
            const Icon = item.icon ? IconRegistry[item.icon] : undefined;

            return {
              text: item.categoryName ?? '',
              icon: Icon,
              amount: item.maxAmount,
            };
          }}
        />
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  header: {
    fontSize: 23,
    fontWeight: '700',
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
});

export default Categories;
