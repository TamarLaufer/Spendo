import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useCategory } from '../../zustandState/useCategory';
import {
  addCategory,
  upsertSubCategory,
} from '../../firebase/services/categoriesService';
import {
  CategoryCreateSchema,
  CategoryIcon,
  type CategoryCreateInput,
} from '../../shared/categorySchema';
import { toId } from '../../firebase/services/categoriesService';
import { DEV_HOUSEHOLD_ID } from '../../config/consts';
import { STRINGS } from '../../strings/hebrew';
import {
  AddButton,
  AddButtonText,
  CloseButtonContainer,
  CloseText,
  Container,
  ErrorText,
  Input,
  Label,
} from './AddCategorySection.styles';

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
  const [icon, setIcon] = useState<CategoryIcon>('defaultIcon');
  const loadCategories = useCategory(state => state.loadCategories);

  const setError = useCategory(state => state.setError);

  const handleAddCategoryPress = async () => {
    if (!categoryName.trim()) {
      setSubmitError(STRINGS.CATEGORY_NAME_REQUIRED_ERROR);
      return;
    }
    const parsedAmount = Number(maxAmount);
    if (!Number.isFinite(parsedAmount) || parsedAmount < 0) {
      setSubmitError(STRINGS.CATEGORY_MAX_AMOUNT_REQUIRED_ERROR);
      return;
    }

    const categoryPayload: CategoryCreateInput = {
      categoryName: categoryName.trim(),
      maxAmount: parsedAmount,
      householdId: DEV_HOUSEHOLD_ID,
      icon: icon,
      order: Date.now(),
      active: true,
    };

    // Full Zod validation
    const result = CategoryCreateSchema.safeParse(categoryPayload);
    if (!result.success) {
      setSubmitError(STRINGS.CATEGORY_CREATE_SCHEMA_INCORRECT_VALUES);
      return;
    }

    setSubmitLoader(true);
    setSubmitError(null);

    try {
      const categoryId = await addCategory(categoryPayload);
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
      await loadCategories();
      // reset form
      setCategoryName('');
      setSubcategoriesText('');
      setMaxAmount('');
      setIcon('defaultIcon');
      setError(null);
      setDisplayAddCategory(false);
    } catch (e: any) {
      if (e.message === 'CATEGORY_ALREADY_EXISTS') {
        setSubmitError(STRINGS.CATEGORY_ALREADY_EXISTS_ERROR);
      } else {
        setSubmitError(e?.message ?? STRINGS.CATEGORY_CREATE_FAILED_ERROR);
      }
    } finally {
      setSubmitLoader(false);
    }
  };

  return (
    <Container>
      <CloseButtonContainer
        onPress={() => setDisplayAddCategory(false)}
        // style={styles.xContainer}
      >
        <CloseText>X</CloseText>
      </CloseButtonContainer>

      {submitLoader && <ActivityIndicator />}
      {submitError && <ErrorText>{submitError}</ErrorText>}

      <Label>שם קטגוריה</Label>
      <Input
        value={categoryName}
        onChangeText={setCategoryName}
        placeholder="למשל: מזון"
      />

      <Label>תקציב מקסימלי</Label>
      <Input
        value={maxAmount}
        onChangeText={setMaxAmount}
        placeholder="1500"
        keyboardType="numeric"
      />

      <Label>תתי־קטגוריות (פסיקים בין ערכים)</Label>
      <Input
        value={subcategoriesText}
        onChangeText={setSubcategoriesText}
        placeholder="למשל: סופר, ירקות, מוצרי חלב"
        keyboardType="default"
      />

      <AddButton onPress={handleAddCategoryPress} disabled={submitLoader}>
        <AddButtonText>הוספה</AddButtonText>
      </AddButton>
    </Container>
  );
};

export default AddCategory;
