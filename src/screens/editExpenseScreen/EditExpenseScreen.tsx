import z from 'zod';
import { Alert, View } from 'react-native';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useExpenses } from '../../zustandState/useExpenses';
import { useCategory } from '../../zustandState/useCategory';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamsType } from '../../navigation/types';
import { STRINGS } from '../../strings/hebrew';
import BottomSheet from '@gorhom/bottom-sheet';
import { useExpenseWizard } from '../../zustandState/useExpenseWizard';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useBottomSheet } from '../../zustandState/useBottomSheet';
import TransactionList from '../../components/transactionList/TransactionList';
import { IconRegistry } from '../../assets/icons';
import {
  ChangeCategoryButton,
  ChangeCategoryText,
  Content,
  ErrorText,
  Footer,
  HeaderContainer,
  HeaderText,
  InputWrapper,
  SaveButton,
  SaveText,
  Screen,
  StyledInput,
} from './EditExpenseScreen.styles';
import { editExpenseUiSchema } from '../../shared/editExpenseUiSchema';

type EditExpenseUiDraft = z.infer<typeof editExpenseUiSchema>;
type RootNav = NativeStackNavigationProp<RootStackParamsType>;
type EditExpenseRoute = RouteProp<RootStackParamsType, 'EditExpenseScreen'>;
const EditExpenseScreen = () => {
  const {
    params: { expenseId, categoryId },
  } = useRoute<EditExpenseRoute>();
  const findExpenseById = useExpenses(state => state.findExpenseById);
  const updateExpense = useExpenses(state => state.updateExpense);
  const findCategoryById = useCategory(state => state.findCategoryById);
  const resetWizard = useExpenseWizard(state => state.resetWizard);
  const currentCategory = findCategoryById(categoryId);
  const expense = findExpenseById(expenseId);
  const navigation = useNavigation<RootNav>();
  const bottomSheetRef = useRef<BottomSheetMethods | null>(null);
  const setBottomSheetRef = useBottomSheet(state => state.setBottomSheetRef);
  const openBottomSheet = useBottomSheet(state => state.openBottomSheet);
  const closeBottomSheet = useBottomSheet(state => state.closeBottomSheet);
  const snapPoints = useMemo(() => ['75%'], []);
  const [isSaving, setIsSaving] = useState(false);
  const categoriesList = useCategory(state => state.categories);

  useEffect(() => {
    setBottomSheetRef(bottomSheetRef);
  }, [setBottomSheetRef]);

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        resetWizard();
      }
    },
    [resetWizard],
  );

  const submitLogic = async (data: EditExpenseUiDraft) => {
    try {
      updateExpense(expenseId, {
        categoryId: data.categoryId,
        amount: Number(data.amountText) ?? 0,
        paymentMethod: data.paymentMethod ?? '',
        note: data.noteText ?? '',
      });
      setIsSaving(true);
      Alert.alert('נשמר!', 'עדכון ההוצאה נשמר בהצלחה');
    } catch (error) {
      console.log(error);
      Alert.alert('משהו השתבש, נסו שוב עוד מספר דקות');
    }
    setIsSaving(true);
    navigation.goBack();
  };

  const {
    register,
    watch,
    setValue,
    formState: { isValid, errors },
    handleSubmit,
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

  const inputConfig = [
    {
      name: 'amountText' as const,
      placeholder: 'סכום',
      keyboardType: 'numeric' as const,
      validateOnChange: true,
    },
    {
      name: 'noteText' as const,
      placeholder: 'הערה',
      keyboardType: 'default' as const,
      validateOnChange: false,
    },
  ];

  const inputs = inputConfig.map(input => (
    <View key={input.name}>
      <StyledInput
        {...register(input.name)}
        value={watch(input.name)}
        onChangeText={v =>
          setValue(input.name, v, {
            shouldValidate: input.validateOnChange,
          })
        }
        placeholder={input.placeholder}
        keyboardType={input.keyboardType}
      />

      {errors[input.name] && (
        <ErrorText>{errors[input.name]?.message as string}</ErrorText>
      )}
    </View>
  ));

  return (
    <Screen>
      <HeaderContainer>
        <HeaderText>{STRINGS.EDIT_EXPENSE}</HeaderText>
      </HeaderContainer>
      <Content>
        <ChangeCategoryButton onPress={openBottomSheet}>
          <ChangeCategoryText>שינוי קטגוריה</ChangeCategoryText>
        </ChangeCategoryButton>

        <InputWrapper>{inputs}</InputWrapper>
      </Content>
      <ChangeCategoryButton onPress={openPaymentMethodSheet}>
        <ChangeCategoryText>
          {watch('paymentMethod') || 'בחירת אמצעי תשלום'}
        </ChangeCategoryText>
      </ChangeCategoryButton>
      {bottomSheetRef && (
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          enablePanDownToClose={!isSaving}
          enableDynamicSizing={false}
        >
          <TransactionList
            keyExtractor={category => category.id}
            data={categoriesList}
            mapItem={category => ({
              text: category.name,
              onPress: () => {
                setValue('categoryId', category.id, { shouldValidate: true });
                closeBottomSheet();
              },
              selected: category.id === watch('categoryId'),
              icon: category?.icon ? IconRegistry[category.icon] : undefined,
            })}
          />
        </BottomSheet>
      )}
      <Footer>
        <SaveButton onPress={handleSubmit(submitLogic)} disabled={!isValid}>
          <SaveText>שמור</SaveText>
        </SaveButton>
      </Footer>
    </Screen>
  );
};

export default EditExpenseScreen;
