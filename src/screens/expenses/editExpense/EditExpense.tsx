import { Alert } from 'react-native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useExpenses } from '../../../zustandState/useExpenses';
import { useCategory } from '../../../zustandState/useCategory';
import { RootStackParamsType } from '../../../navigation/types';
import { STRINGS } from '../../../strings/hebrew';
import { IconRegistry } from '../../../assets/icons';
import {
  PAYMENT_METHODS,
  PaymentMethods,
} from '../../../bottomSheetExpenses/types';

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
  SheetRow,
  SheetRowText,
  ListContainer,
} from './EditExpense.styles';

import {
  editExpenseUiSchema,
  EditExpenseUiDraft,
} from '../../../shared/editExpenseUiSchema';
import { getPaymentMethodLabel } from '../../../utils/paymentMethods';

type RootNav = NativeStackNavigationProp<RootStackParamsType>;
type EditExpenseRoute = RouteProp<RootStackParamsType, 'EditExpense'>;
type SheetMode = 'category' | 'payment' | null;

const EditExpense = () => {
  const {
    params: { expenseId, categoryId },
  } = useRoute<EditExpenseRoute>();
  const navigation = useNavigation<RootNav>();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [sheetMode, setSheetMode] = useState<SheetMode>(null);
  const categories = useCategory(state => state.categories);
  const findCategoryById = useCategory(state => state.findCategoryById);
  const updateExpense = useExpenses(state => state.updateExpense);
  const expense = useExpenses(state =>
    state.expenses.find(e => e.id === expenseId),
  );
  const snapPoints = useMemo(() => ['75%'], []);

  const {
    watch,
    setValue,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<EditExpenseUiDraft>({
    resolver: zodResolver(editExpenseUiSchema),
    mode: 'onChange',
    defaultValues: {
      categoryId: categoryId ?? '',
      amountText: String(expense?.amount ?? ''),
      paymentMethodId: expense?.paymentMethodId ?? '',
      noteText: expense?.note ?? '',
    },
  });

  useEffect(() => {
    if (!expense) return;

    reset({
      categoryId: expense.categoryId ?? '',
      amountText: String(expense.amount ?? ''),
      paymentMethodId: expense.paymentMethodId ?? '',
      noteText: expense.note ?? '',
    });
  }, [expense, expense?.id, reset]);

  const openSheet = (mode: SheetMode) => {
    setSheetMode(mode);
    bottomSheetRef.current?.expand();
  };

  const closeSheet = () => {
    setSheetMode(null);
    bottomSheetRef.current?.close();
  };

  const handleSheetClosed = () => {
    setSheetMode(null);
  };

  const submitLogic = async (data: EditExpenseUiDraft) => {
    try {
      updateExpense(expenseId, {
        categoryId: data.categoryId,
        amount: Number(data.amountText),
        paymentMethodId: data.paymentMethodId,
        note: data.noteText ?? '',
      });
      Alert.alert(STRINGS.SAVED, STRINGS.EXPENSE_UPDATED_SUCCESSFULLY);
      navigation.goBack();
    } catch {
      Alert.alert(STRINGS.ERROR_IN_UPDATING_EXPENSE, STRINGS.TRY_AGAIN_LATER);
    }
  };

  const selectedCategoryId = watch('categoryId');
  const selectedCategory = findCategoryById(selectedCategoryId);
  const selectedPaymentMethodId = watch('paymentMethodId');
  const selectedAmountText = watch('amountText');
  const selectedNoteText = watch('noteText');

  return (
    <Screen>
      <HeaderContainer>
        <HeaderText>{STRINGS.EDIT_EXPENSE}</HeaderText>
      </HeaderContainer>
      <Content>
        <ChangeCategoryButton onPress={() => openSheet('category')}>
          <ChangeCategoryText>
            {selectedCategory?.name || STRINGS.CHANGE_CATEGORY}
          </ChangeCategoryText>
        </ChangeCategoryButton>
        <ChangeCategoryButton onPress={() => openSheet('payment')}>
          <ChangeCategoryText>
            {selectedPaymentMethodId
              ? getPaymentMethodLabel(
                  selectedPaymentMethodId as PaymentMethods['id'],
                )
              : STRINGS.SELECT_PAYMENT_METHOD}
          </ChangeCategoryText>
        </ChangeCategoryButton>
        <InputWrapper>
          <StyledInput
            value={selectedAmountText}
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
            value={selectedNoteText}
            onChangeText={v =>
              setValue('noteText', v, { shouldValidate: true })
            }
            placeholder={STRINGS.NOTE}
            placeholderTextColor="#9CA3AF"
          />
        </InputWrapper>
      </Content>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onClose={handleSheetClosed}
        enablePanDownToClose
        enableDynamicSizing={false}
      >
        <ListContainer>
          {sheetMode === 'category' && (
            <BottomSheetFlatList
              key={sheetMode}
              data={categories}
              showsVerticalScrollIndicator={false}
              keyExtractor={category => category.id}
              extraData={selectedCategoryId}
              renderItem={({ item }) => {
                const Icon = item.icon ? IconRegistry[item.icon] : undefined;
                const isSelected = item.id === selectedCategoryId;
                return (
                  <SheetRow
                    isSelected={isSelected}
                    onPress={() => {
                      setValue('categoryId', item.id, { shouldValidate: true });
                      closeSheet();
                    }}
                  >
                    {Icon && <Icon width={24} height={24} />}
                    <SheetRowText>{item.name}</SheetRowText>
                  </SheetRow>
                );
              }}
            />
          )}
          {sheetMode === 'payment' && (
            <BottomSheetFlatList
              key={sheetMode}
              data={PAYMENT_METHODS}
              extraData={selectedPaymentMethodId}
              showsVerticalScrollIndicator={false}
              keyExtractor={payment => payment.id}
              renderItem={({ item }) => {
                const isSelected = item.id === selectedPaymentMethodId;
                return (
                  <SheetRow
                    isSelected={isSelected}
                    onPress={() => {
                      setValue('paymentMethodId', item.id, {
                        shouldValidate: true,
                      });
                      closeSheet();
                    }}
                  >
                    <SheetRowText>{item.name}</SheetRowText>
                  </SheetRow>
                );
              }}
            />
          )}
        </ListContainer>
      </BottomSheet>
      <Footer>
        <SaveButton disabled={!isValid} onPress={handleSubmit(submitLogic)}>
          <SaveText>{STRINGS.SAVE}</SaveText>
        </SaveButton>
      </Footer>
    </Screen>
  );
};

export default EditExpense;
