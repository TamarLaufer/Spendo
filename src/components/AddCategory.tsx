import React, { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { theme } from '../theme/theme';
import { useCategory } from '../zustandState/useCategory';
import { addCategory } from '../firebase/services/categories';
import { getApp } from '@react-native-firebase/app';
import {
  getFirestore,
  collection,
  doc,
} from '@react-native-firebase/firestore';
import {
  CategoryCreateSchema,
  type CategoryCreateInput,
} from '../shared/categorySchema';

const appInstance = getApp();
const firestoreDb = getFirestore(appInstance);

const generateId = () => doc(collection(firestoreDb, '_ids')).id;

type AddCategoryPropsType = {
  setDisplayAddCategory: (value: boolean) => void;
};

const AddCategory = ({ setDisplayAddCategory }: AddCategoryPropsType) => {
  const [categoryName, setCategoryName] = useState('');
  const [subcategoriesText, setSubcategoriesText] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [submitLoader, setSubmitLoader] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const setError = useCategory(state => state.setError);

  const handleAddCategoryPress = async () => {
    if (!categoryName.trim()) {
      setSubmitError('נא להזין שם קטגוריה');
      return;
    }
    const parsedAmount = Number(maxAmount);
    if (!Number.isFinite(parsedAmount) || parsedAmount < 0) {
      setSubmitError('תקציב חייב להיות מספר תקין');
      return;
    }

    const uniqueNames = Array.from(
      new Set(
        subcategoriesText
          .split(',')
          .map(s => s.trim())
          .filter(Boolean),
      ),
    );

    const subCategoryObjects = uniqueNames.map(name => ({
      subCategoryId: generateId(),
      subCategoryName: name,
      icon: null,
      active: true,
    }));

    const candidatePayload: CategoryCreateInput = {
      categoryName: categoryName.trim(),
      maxAmount: parsedAmount,
      // icon אופציונלי, אפשר להוסיף בהמשך:
      // icon: 'car' as any,
      subCategories: subCategoryObjects,
      // אפשר להוסיף שדות אופציונליים אם קיימים בסכימה: order/active וכו'
    };

    // ולידציית Zod מלאה
    const result = CategoryCreateSchema.safeParse(candidatePayload);
    if (!result.success) {
      setSubmitError('שדות לא תקינים, בדקי את הקלט בבקשה');
      // אם תרצי, אפשר להדפיס ל-console את פירוט השגיאות:
      // console.log(result.error.format());
      return;
    }

    setSubmitLoader(true);
    setSubmitError(null);

    try {
      await addCategory(result.data);

      // reset form
      setCategoryName('');
      setSubcategoriesText('');
      setMaxAmount('');
      setError(null);

      setDisplayAddCategory(false);
    } catch (e: any) {
      setSubmitError(e?.message ?? 'נכשלה הוספת קטגוריה');
    } finally {
      setSubmitLoader(false);
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

      {submitLoader && <ActivityIndicator />}
      {submitError && <Text style={styles.error}>{submitError}</Text>}

      <Text style={styles.label}>שם קטגוריה</Text>
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

      <Text style={styles.label}>תתי־קטגוריות (פסיקים בין ערכים)</Text>
      <TextInput
        value={subcategoriesText}
        onChangeText={setSubcategoriesText}
        placeholder="למשל: סופר, ירקות, מוצרי חלב"
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
  error: { color: 'red' },
  xContainer: { flex: 1 },
  x: { textAlign: 'right', paddingEnd: 20, fontSize: 20 },
});

export default AddCategory;
