import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamsType } from './types';
import AllExpenses from '../screens/expenses/allExpenses/AllExpenses';
import ExpenseDetails from '../screens/expenses/expenseDetails/ExpenseDetails';
import MainTabsWithBottomSheet from '../components/mainTabWithBottomSheet/MainTabsWithBottomSheet';
import EditExpense from '../screens/expenses/editExpense/EditExpense';
import CategoryDetails from '../screens/categories/categoryDetails/CategoryDetails';

const theme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: '#fff' },
};
const Stack = createNativeStackNavigator<RootStackParamsType>();

const STACK_SCREEN_OPTIONS = {
  headerShown: false,
  contentStyle: { backgroundColor: '#fff' },
  animation: 'default',
} as const;

export default function StackNavigation() {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={STACK_SCREEN_OPTIONS}>
        <Stack.Screen name="MainTabs" component={MainTabsWithBottomSheet} />
        <Stack.Screen name="ExpenseDetails" component={ExpenseDetails} />
        <Stack.Screen name="AllExpenses" component={AllExpenses} />
        <Stack.Screen
          name="EditExpense"
          component={EditExpense}
          options={{ title: 'עריכת הוצאה' }}
        />
        <Stack.Screen
          name="CategoryDetails"
          component={CategoryDetails}
          options={{ title: 'פרטי קטגוריה' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
