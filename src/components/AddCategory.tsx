import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { addCategory } from '../firebase/services/categories';
import { useCategory } from '../zustandState/useCategory';
import { theme } from '../theme/theme';

type AddCategoryPropsType = {
  setDisplayAddCategory: (value: boolean) => void;
};

const AddCategory = ({ setDisplayAddCategory }: AddCategoryPropsType) => {
  const [categoryName, setCategoryName] = useState('');
  const [subCategoryName, setSubCategoryName] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [submitLoader, setSubmitLoder] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const setError = useCategory(state => state.setError);

  const handleAddCategoryPress = async () => {
    if (!categoryName.trim()) {
      setSubmitError('נא להזין שם קטגוריה');
      return;
    }
    const amountNum = Number(maxAmount);
    if (!Number.isFinite(amountNum) || amountNum < 0) {
      setSubmitError('תקציב חייב להיות מספר תקין');
      return;
    }

    setSubmitLoder(true);
    setSubmitError(null);
    try {
      await addCategory({ categoryName, maxAmount: Number(maxAmount) });
      console.log({ categoryName });

      setCategoryName('');
      setMaxAmount('');
      setError(null);
      setDisplayAddCategory(false);
    } catch (e: any) {
      setSubmitError(e?.message ?? 'Failed to add category');
    } finally {
      setSubmitLoder(false);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => setDisplayAddCategory(false)}
        style={styles.xContainer}
      >
        <Text style={styles.x}>X</Text>
      </Pressable>
      <Text style={styles.label}>שם קטגוריה</Text>
      {submitLoader && <ActivityIndicator />}
      {submitError && <Text style={styles.error}>{submitError}</Text>}
      <TextInput
        value={categoryName}
        onChangeText={setCategoryName}
        placeholder="למשל: מזון"
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
      <Text style={styles.label}>תת-קטגוריה (לא חובה)</Text>
      <TextInput
        value={subCategoryName}
        onChangeText={setSubCategoryName}
        placeholder="למשל: סופר"
        keyboardType="default"
        style={styles.input}
      />
      <Pressable
        onPress={handleAddCategoryPress}
        style={styles.button}
        disabled={submitLoader}
      >
        <Text style={styles.buttonText}>הוספה</Text>
      </Pressable>
    </View>
  );
};

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
    backgroundColor: theme.color.lightGreen,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontSize: 18, fontWeight: '700' },
  error: {
    color: 'red',
  },
  xContainer: {
    flex: 1,
  },
  x: {
    textAlign: 'right',
    paddingEnd: 20,
    fontSize: 20,
  },
});

export default AddCategory;
