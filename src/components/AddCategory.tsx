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
import {
  addCategory,
  upsertSubCategory,
} from '../firebase/services/categories';
import {
  CategoryCreateSchema,
  type CategoryCreateInput,
} from '../shared/categorySchema';
import { toId } from '../firebase/services/categories';
import { DEV_HOUSEHOLD_ID } from '../config/consts';
import { type IconKey } from '../assets/icons';

type AddCategoryPropsType = {
  setDisplayAddCategory: (value: boolean) => void;
};

const parseCsv = (raw?: string) =>
  (raw ?? '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

const AddCategory = ({ setDisplayAddCategory }: AddCategoryPropsType) => {
  const [categoryName, setCategoryName] = useState('');
  const [subcategoriesText, setSubcategoriesText] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [submitLoader, setSubmitLoader] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [icon, setIcon] = useState<IconKey>('defaultIcon');

  const setError = useCategory(state => state.setError);

  const handleAddCategoryPress = async () => {
    // ולידציה בסיסית מהירה
    if (!categoryName.trim()) {
      setSubmitError('נא להזין שם קטגוריה');
      return;
    }
    const parsedAmount = Number(maxAmount);
    if (!Number.isFinite(parsedAmount) || parsedAmount < 0) {
      setSubmitError('תקציב חייב להיות מספר תקין');
      return;
    }

    // payload "דק" לפי המודל השטוח – בלי subCategories בתוך הקטגוריה
    const categoryPayload: CategoryCreateInput = {
      categoryName: categoryName.trim(),
      maxAmount: parsedAmount,
      householdId: DEV_HOUSEHOLD_ID,
      icon: icon ?? 'defaultIcon',
      order: Date.now(),
      active: true,
    };

    // ולידציית Zod מלאה
    const result = CategoryCreateSchema.safeParse(categoryPayload);
    if (!result.success) {
      setSubmitError('שדות לא תקינים, בדקי את הקלט בבקשה');
      return;
    }

    setSubmitLoader(true);
    setSubmitError(null);

    try {
      // 1) יצירת קטגוריה
      const categoryId = await addCategory(categoryPayload);

      // 2) (אופציונלי) כתיבת תתי־קטגוריות מ-CSV, כל תת־קטגוריה כ־doc נפרד
      const names = parseCsv(subcategoriesText);
      if (names.length) {
        await Promise.all(
          names.map((name, idx) =>
            upsertSubCategory(
              categoryId,
              toId(name) || `${Date.now()}-${idx}`,
              {
                subCategoryName: name,
                icon: 'defaultIcon',
                order: idx,
                active: true,
              },
            ),
          ),
        );
      }

      // reset form
      setCategoryName('');
      setSubcategoriesText('');
      setMaxAmount('');
      setIcon('defaultIcon');
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
