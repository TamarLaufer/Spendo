import { FC, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import ScreenLayout from '../../components/screenLayout/ScreenLayout';
import { useCategory } from '../../zustandState/useCategory';
import AddCategory from '../../components/addCategory/AddCategory';
import { theme } from '../../theme/theme';
import { STRINGS } from '../../strings/hebrew';
import { Category } from '../../shared/categoryType';

const Categories: FC = () => {
  const categories = useCategory(state => state.categories);
  const [displayAdding, setDisplayAdding] = useState(false);

  const onCategoryPress = (categoryId: string) => {
    console.log(categoryId);
  };

  const renderItem = ({ item }: { item: Category }) => (
    <Pressable style={styles.row} onPress={() => onCategoryPress(item.id)}>
      <Text style={styles.rowText}>{item.name}</Text>
    </Pressable>
  );

  return (
    <ScreenLayout>
      <FlatList
        data={categories}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.container}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <Text style={styles.header}>{STRINGS.CATEGORIES}</Text>
          </View>
        }
        ListFooterComponent={
          <>
            {displayAdding && (
              <AddCategory setDisplayAddCategory={setDisplayAdding} />
            )}

            {!displayAdding && (
              <Pressable
                style={styles.addCategory}
                onPress={() => setDisplayAdding(true)}
              >
                <Text style={styles.buttonText}>
                  {STRINGS.ADD_NEW_CATEGORY}
                </Text>
              </Pressable>
            )}
          </>
        }
      />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingBottom: 40,
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
  row: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: 'white',
    marginBottom: 8,
  },
  rowText: {
    fontSize: 18,
  },
  addCategory: {
    marginTop: 12,
    backgroundColor: theme.color.lightBlue,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default Categories;
