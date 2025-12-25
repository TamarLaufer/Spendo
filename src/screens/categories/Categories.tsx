import { FC, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import ScreenLayout from '../../components/screenLayout/ScreenLayout';
import TransactionList from '../../components/transactionList/TransactionList';
import { useCategory } from '../../zustandState/useCategory';
import { IconRegistry } from '../../assets/icons';
import AddCategory from '../../components/addCategory/AddCategory';
import { theme } from '../../theme/theme';
import { STRINGS } from '../../strings/hebrew';

const Categories: FC = () => {
  const categories = useCategory(state => state.categories);
  const [displayAdding, setDisplayAdding] = useState(false);

  const handleDisplayPress = () => {
    setDisplayAdding(true);
  };

  const onCategoryPress = () => {};

  return (
    <ScreenLayout>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>{STRINGS.CATEGORIES}</Text>
          </View>
          <TransactionList
            data={categories}
            mapItem={item => {
              const Icon = item.icon ? IconRegistry[item.icon] : undefined;
              return {
                text: item.name ?? '',
                icon: Icon,
                amount: item.maxAmount,
                onPress: onCategoryPress,
              };
            }}
          />
          {displayAdding && (
            <AddCategory setDisplayAddCategory={setDisplayAdding} />
          )}
          {!displayAdding && (
            <Pressable style={styles.addCategory} onPress={handleDisplayPress}>
              <Text style={styles.buttonText}>{STRINGS.ADD_NEW_CATEGORY}</Text>
            </Pressable>
          )}
        </View>
      </ScrollView>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginBottom: 40,
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
  addCategory: {
    marginTop: 12,
    backgroundColor: theme.color.lightBlue,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontSize: 18, fontWeight: '700' },
});

export default Categories;
