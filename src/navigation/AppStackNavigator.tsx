import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamsType } from './types';
import AllExpenses from '../screens/expenses/allExpenses/AllExpenses';
import ExpenseDetails from '../screens/expenses/expenseDetails/ExpenseDetails';
import MainTabsWithBottomSheet from '../components/mainTabWithBottomSheet/MainTabsWithBottomSheet';
import EditExpense from '../screens/expenses/editExpense/EditExpense';
import CategoryDetails from '../screens/categories/categoryDetails/CategoryDetails';
import EditCategory from '../screens/categories/editCategory/EditCategory';
import { STRINGS } from '../strings/hebrew';

const Stack = createNativeStackNavigator<RootStackParamsType>();

const STACK_SCREEN_OPTIONS = {
  headerShown: false,
  contentStyle: { backgroundColor: '#fff' },
  animation: 'default',
} as const;

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={STACK_SCREEN_OPTIONS}>
      <Stack.Screen name="MainTabs" component={MainTabsWithBottomSheet} />
      <Stack.Screen name="ExpenseDetails" component={ExpenseDetails} />
      <Stack.Screen name="AllExpenses" component={AllExpenses} />
      <Stack.Screen
        name="EditExpense"
        component={EditExpense}
        options={{ title: STRINGS.EDIT_EXPENSE }}
      />
      <Stack.Screen
        name="CategoryDetails"
        component={CategoryDetails}
        options={{ title: STRINGS.CATEGORY_DETAILS }}
      />
      <Stack.Screen
        name="EditCategory"
        component={EditCategory}
        options={{ title: STRINGS.EDIT_CATEGORY }}
      />
    </Stack.Navigator>
  );
}
