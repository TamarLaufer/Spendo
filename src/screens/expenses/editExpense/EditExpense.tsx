import { Alert, FlatList, Pressable, StyleSheet, Text } from 'react-native';
import React, { useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useExpenses } from '../../../zustandState/useExpenses';
import { useCategory } from '../../../zustandState/useCategory';
import { RootStackParamsType } from '../../../navigation/types';
import { STRINGS } from '../../../strings/hebrew';
import { IconRegistry } from '../../../assets/icons';
import { PAYMENT_METHODS } from '../../../bottomSheetExpenses/types';

import {
  Screen,
  HeaderContainer,
  HeaderText,
  Content,
  InputWrapper,
  StyledInput,
  ErrorText,
  ChangeCategoryButton,
  ChangeCategoryText,
  Footer,
  SaveButton,
  SaveText,
} from './EditExpense.styles';

import {
  editExpenseUiSchema,
  EditExpenseUiDraft,
} from '../../../shared/editExpenseUiSchema';

type RootNav = NativeStackNavigationProp<RootStackParamsType>;
type EditExpenseRoute = RouteProp<RootStackParamsType, 'EditExpenseScreen'>;
type SheetMode = 'category' | 'payment' | null;

const EditExpenseScreen = () => {
  const {
    params: { expenseId, categoryId },
  } = useRoute<EditExpenseRoute>();
  const navigation = useNavigation<RootNav>();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [sheetMode, setSheetMode] = useState<SheetMode>(null);
  const categories = useCategory(state => state.categories);
  const findCategoryById = useCategory(state => state.findCategoryById);
  const findExpenseById = useExpenses(state => state.findExpenseById);
  const updateExpense = useExpenses(state => state.updateExpense);
  const expense = findExpenseById(expenseId);
  const currentCategory = findCategoryById(categoryId);
  const snapPoints = useMemo(() => ['75%'], []);

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<EditExpenseUiDraft>({
    resolver: zodResolver(editExpenseUiSchema),
    mode: 'onChange',
    defaultValues: {
      categoryId: currentCategory?.id ?? '',
      amountText: String(expense?.amount ?? ''),
      paymentMethod: expense?.paymentMethod ?? '',
      noteText: expense?.note ?? '',
    },
  });

  const openSheet = (mode: SheetMode) => {
    setSheetMode(mode);
    bottomSheetRef.current?.expand();
  };

  const closeSheet = () => {
    bottomSheetRef.current?.close();
    setSheetMode(null);
  };

  const submitLogic = async (data: EditExpenseUiDraft) => {
    try {
      updateExpense(expenseId, {
        categoryId: data.categoryId,
        amount: Number(data.amountText),
        paymentMethod: data.paymentMethod,
        note: data.noteText ?? '',
      });
      Alert.alert(STRINGS.SAVED, STRINGS.EXPENSE_UPDATED_SUCCESSFULLY);
      navigation.goBack();
    } catch {
      Alert.alert(STRINGS.ERROR_IN_UPDATING_EXPENSE, STRINGS.TRY_AGAIN_LATER);
    }
  };

  return (
    <Screen>
      <HeaderContainer>
        <HeaderText>{STRINGS.EDIT_EXPENSE}</HeaderText>
      </HeaderContainer>
      <Content>
        <ChangeCategoryButton onPress={() => openSheet('category')}>
          <ChangeCategoryText>{STRINGS.CHANGE_CATEGORY}</ChangeCategoryText>
        </ChangeCategoryButton>
        <ChangeCategoryButton onPress={() => openSheet('payment')}>
          <ChangeCategoryText>
            {watch('paymentMethod') || STRINGS.SELECT_PAYMENT_METHOD}
          </ChangeCategoryText>
        </ChangeCategoryButton>
        <InputWrapper>
          <StyledInput
            {...register('amountText')}
            value={watch('amountText')}
            onChangeText={v =>
              setValue('amountText', v, { shouldValidate: true })
            }
            placeholder={STRINGS.AMOUNT}
            keyboardType="numeric"
          />
          {errors.amountText && (
            <ErrorText>{errors.amountText.message}</ErrorText>
          )}

          <StyledInput
            {...register('noteText')}
            value={watch('noteText')}
            onChangeText={v => setValue('noteText', v)}
            placeholder={STRINGS.NOTE}
          />
        </InputWrapper>
      </Content>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onClose={closeSheet}
        enablePanDownToClose
        enableDynamicSizing={false}
      >
        <BottomSheetScrollView>
          {sheetMode === 'category' && (
            <FlatList
              data={categories}
              keyExtractor={category => category.id}
              renderItem={({ item }) => {
                const Icon = item.icon ? IconRegistry[item.icon] : undefined;
                const isSelected = item.id === watch('categoryId');
                return (
                  <Pressable
                    style={[styles.sheetRow, isSelected && styles.selectedRow]}
                    onPress={() => {
                      setValue('categoryId', item.id, { shouldValidate: true });
                      closeSheet();
                    }}
                  >
                    {Icon && <Icon width={24} height={24} />}
                    <Text style={styles.sheetRowText}>{item.name}</Text>
                  </Pressable>
                );
              }}
            />
          )}
          {sheetMode === 'payment' && (
            <FlatList
              data={PAYMENT_METHODS}
              keyExtractor={payment => payment.id}
              renderItem={({ item }) => {
                const isSelected = item.name === watch('paymentMethod');
                return (
                  <Pressable
                    style={[styles.sheetRow, isSelected && styles.selectedRow]}
                    onPress={() => {
                      setValue('paymentMethod', item.name, {
                        shouldValidate: true,
                      });
                      closeSheet();
                    }}
                  >
                    <Text style={styles.sheetRowText}>{item.name}</Text>
                  </Pressable>
                );
              }}
            />
          )}
        </BottomSheetScrollView>
      </BottomSheet>
      <Footer>
        <SaveButton disabled={!isValid} onPress={handleSubmit(submitLogic)}>
          <SaveText>{STRINGS.SAVE}</SaveText>
        </SaveButton>
      </Footer>
    </Screen>
  );
};

export default EditExpenseScreen;

const styles = StyleSheet.create({
  sheetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'white',
    marginBottom: 8,
  },
  selectedRow: {
    borderWidth: 2,
    borderColor: '#4da6ff',
  },
  sheetRowText: {
    fontSize: 18,
    marginStart: 12,
  },
});
