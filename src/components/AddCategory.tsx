import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { addCategory } from '../firebase/services/categoriesCrud';
import { useCategory } from '../zustandState/useCategory';

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [submitLoader, setSubmitLoder] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const setError = useCategory(state => state.setError);
  const loadCategories = useCategory(state => state.loadCategories);
  const loading = useCategory(state => state.loading);

  const handleAddCategoryPress = async () => {
    const amountNum = Number(maxAmount || 0);
    setSubmitLoder(true);
    setSubmitError(null);
    try {
      await addCategory({ categoryName, maxAmount: amountNum });
      await loadCategories();
      setCategoryName('');
      setMaxAmount('');
      setError(null);
    } catch (e: any) {
      setSubmitError(e?.message ?? 'Failed to add category');
    } finally {
      setSubmitLoder(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>שם קטגוריה</Text>
      {submitLoader && <ActivityIndicator />}
      {submitError && <Text style={styles.error}>{submitError}</Text>}
      <TextInput
        value={categoryName}
        onChangeText={setCategoryName}
        placeholder="למשל: סופר"
        style={styles.input}
      />
      <Text style={styles.label}>תקציב מקסימלי</Text>
      <TextInput
        value={maxAmount}
        onChangeText={setMaxAmount}
        placeholder="1500"
        keyboardType="numeric"
        style={styles.input}
      />
      <Pressable
        onPress={handleAddCategoryPress}
        style={styles.button}
        disabled={loading}
      >
        <Text style={styles.buttonText}>הוסף קטגוריה</Text>
      </Pressable>
    </View>
  );
};

export default AddCategory;

const styles = StyleSheet.create({
  container: { padding: 16, gap: 10 },
  label: { fontSize: 14, fontWeight: '600' },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
  },
  button: {
    marginTop: 12,
    backgroundColor: '#321d63',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontWeight: '700' },
  error: {
    color: 'red',
  },
});
