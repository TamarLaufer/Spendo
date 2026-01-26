import React from 'react';
import { Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamsType } from '../../../navigation/types';
import { useCategory } from '../../../zustandState/useCategory';
import { STRINGS } from '../../../strings/hebrew';
import {
  CategoryForm,
  CategoryFormSchema,
} from '../../../shared/categorySchema';

import {
  Screen,
  HeaderContainer,
  HeaderText,
  Content,
  InputWrapper,
  StyledInput,
  Footer,
  SaveButton,
  SaveText,
  DeleteButton,
  DeleteText,
} from './EditCategory.styles';

type EditCategoryRoute = RouteProp<RootStackParamsType, 'EditCategory'>;
type RootNav = NativeStackNavigationProp<RootStackParamsType>;

const EditCategory = () => {
  const {
    params: { categoryId },
  } = useRoute<EditCategoryRoute>();
  const navigation = useNavigation<RootNav>();

  const categories = useCategory(state => state.categories);
  const category = categories.find(cat => cat.id === categoryId);

  const updateCategory = useCategory(state => state.updateCategory);
  const deleteCategory = useCategory(state => state.softDeleteCategory);

  // const existingNames = useMemo(
  //   () => categories.filter(c => c.id !== categoryId).map(c => c.categoryName),
  //   [categories, categoryId],
  // );

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { isValid },
  } = useForm<CategoryForm>({
    resolver: zodResolver(CategoryFormSchema),
    mode: 'onChange',
    defaultValues: {
      categoryName: category?.name ?? '',
      maxAmount: String(category?.maxAmount ?? 0),
    },
  });

  const submitLogic = async (data: CategoryForm) => {
    try {
      await updateCategory(categoryId, {
        name: data.categoryName,
        maxAmount: Number(data.maxAmount),
      });
      Alert.alert(STRINGS.SAVED, STRINGS.CATEGORY_UPDATED_SUCCESSFULLY);
      navigation.goBack();
    } catch {
      Alert.alert(STRINGS.CATEGORY_UPDATED_ERROR, STRINGS.TRY_AGAIN_LATER);
    }
  };

  const confirmDelete = () => {
    Alert.alert(
      STRINGS.DELETE_CATEGORY,
      STRINGS.ARE_YOU_SURE,
      [
        { text: STRINGS.CANCEL, style: 'cancel' },
        {
          text: STRINGS.DELETE,
          style: 'destructive',
          onPress: () => {
            deleteCategory(categoryId);
            navigation.goBack();
          },
        },
      ],
      { cancelable: true },
    );
  };

  if (!category) return null;

  return (
    <Screen>
      <HeaderContainer>
        <HeaderText>{STRINGS.EDIT_CATEGORY}</HeaderText>
      </HeaderContainer>

      <Content>
        <InputWrapper>
          <StyledInput
            value={watch('categoryName')}
            onChangeText={v =>
              setValue('categoryName', v, { shouldValidate: true })
            }
            placeholder={STRINGS.CATEGORY_NAME}
          />

          <StyledInput
            value={watch('maxAmount')}
            onChangeText={v =>
              setValue('maxAmount', v, { shouldValidate: true })
            }
            placeholder={STRINGS.MAX_AMOUNT}
            keyboardType="numeric"
          />
        </InputWrapper>
      </Content>

      <Footer>
        <SaveButton disabled={!isValid} onPress={handleSubmit(submitLogic)}>
          <SaveText>{STRINGS.SAVE}</SaveText>
        </SaveButton>

        <DeleteButton onPress={confirmDelete}>
          <DeleteText>{STRINGS.DELETE}</DeleteText>
        </DeleteButton>
      </Footer>
    </Screen>
  );
};

export default EditCategory;
