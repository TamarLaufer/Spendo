import z from 'zod';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useExpenses } from '../zustandState/useExpenses';
import { useCategory } from '../zustandState/useCategory';
import { Pressable } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamsType } from '../navigation/types';
import { STRINGS } from '../strings/hebrew';
import BottomSheet from '@gorhom/bottom-sheet';
import { useExpenseWizard } from '../zustandState/useExpenseWizard';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useBottomSheet } from '../zustandState/useBottomSheet';
import TransactionList from '../components/TransactionList/TransactionList';
import { IconRegistry } from '../assets/icons';
import { theme } from '../theme/theme';

const editExpenseUiSchema = z.object({
  categoryId: z.string(),
  amountText: z
    .string()
    .min(1, 'שדה חובה')
    .refine(v => !isNaN(Number(v)), 'חייב להיות מספר')
    .refine(v => Number(v) > 0, 'חייב להיות גדול מאפס'),
  paymentMethod: z.string(),
  noteText: z.string().max(200, 'עד 200 תווים').optional(),
});

type EditExpenseUiDraft = z.infer<typeof editExpenseUiSchema>;
type DetailsRoute = RouteProp<RootStackParamsType, 'DetailsExpense'>;
type RootNav = NativeStackNavigationProp<RootStackParamsType>;

const EditExpenseScreen = () => {
  const {
    params: { expenseId, categoryId },
  } = useRoute<DetailsRoute>();
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
      name: 'paymentMethod' as const,
      placeholder: 'אמצעי תשלום',
      keyboardType: 'default' as const,
      validateOnChange: false,
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
      <TextInput
        {...register(input.name)}
        value={watch(input.name)}
        onChangeText={v =>
          setValue(input.name, v, {
            shouldValidate: input.validateOnChange,
          })
        }
        placeholder={input.placeholder}
        keyboardType={input.keyboardType}
        style={styles.input}
      />

      {errors[input.name] && (
        <Text style={styles.error}>
          {(errors[input.name]?.message as string) ?? ''}
        </Text>
      )}
    </View>
  ));

  return (
    <>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>{STRINGS.EDIT_EXPENSE}</Text>
      </View>
      <View style={styles.container}>
        <Pressable
          style={styles.changeCatContainer}
          onPress={() => openBottomSheet()}
        >
          <Text style={styles.changeCat}>שינוי קטגוריה</Text>
        </Pressable>
        <View style={styles.inputContainer}>{inputs}</View>
      </View>
      {bottomSheetRef && (
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          enablePanDownToClose={!isSaving}
          enableDynamicSizing={false}
          backgroundStyle={styles.bottomSheetBackground}
          style={styles.bottomSheet}
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
      <View style={styles.actions}>
        <Pressable
          onPress={handleSubmit(submitLogic)}
          disabled={!isValid}
          style={styles.pressable}
        >
          <Text style={styles.save}>שמור</Text>
        </Pressable>
      </View>
    </>
  );
};

export default EditExpenseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 4,
    backgroundColor: theme.color.green,
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 22,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    padding: 20,
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    width: 300,
    paddingHorizontal: 10,
    padding: 8,
    borderRadius: 12,
    fontSize: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
  },
  actions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingBottom: 40,
    backgroundColor: theme.color.light_purple,
  },
  cancel: {
    fontSize: 20,
  },
  save: {
    fontSize: 20,
    color: 'white',
  },
  pressable: {
    padding: 15,
    backgroundColor: 'blue',
    borderRadius: 20,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSheetBackground: {
    backgroundColor: '#FBFBFB',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 18,
  },
  bottomSheet: {
    paddingVertical: 5,
  },
  changeCatContainer: {
    backgroundColor: 'red',
  },
  changeCat: {
    paddingVertical: 20,
    fontSize: 20,
  },
});
