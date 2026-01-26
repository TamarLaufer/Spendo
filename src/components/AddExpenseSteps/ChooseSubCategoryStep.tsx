import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useExpenseWizard } from '../../zustandState/useExpenseWizard';
import { useExpenseWizardNavigation } from '../../hooks/useExpenseWizardNavigation';
import { SubCategoryType } from '../../shared/categoryType';
import { useSubcatIndex } from '../../zustandState/useSubCategoriesIndex';

const ChooseSubCategoryStep = () => {
  const { categoryId, setSubCategoryId } = useExpenseWizard();
  const { handleContinue } = useExpenseWizardNavigation();

  const rows = useSubcatIndex(state =>
    categoryId ? Object.values(state.index[categoryId] ?? {}) : [],
  );

  const handleSelect = (subId: string) => {
    setSubCategoryId(subId);
    handleContinue();
  };

  if (!categoryId) {
    return <Text style={styles.msg}>בחרי קודם קטגוריה</Text>;
  }

  if (rows.length === 0) {
    return <Text style={styles.msg}>אין תתי־קטגוריות לקטגוריה זו</Text>;
  }

  const renderItem = ({ item }: { item: SubCategoryType }) => {
    return (
      <Pressable onPress={() => handleSelect(item.id)}>
        <Text>{item.subCategoryName}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={rows}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 18,
    justifyContent: 'center',
    marginHorizontal: 35,
  },
  loader: { marginTop: 20 },
  msg: { textAlign: 'center', marginTop: 20, fontSize: 16 },
  error: { textAlign: 'center', marginTop: 20, color: 'red' },
});

export default ChooseSubCategoryStep;
