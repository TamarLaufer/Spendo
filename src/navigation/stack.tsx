import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamsType } from './types';
import AllExpenses from '../screens/expenses/allExpenses/AllExpenses';
import ExpenseDetails from '../screens/expenses/expenseDetails/ExpenseDetails';
import MainTabsWithBottomSheet from '../components/mainTabWithBottomSheet/MainTabsWithBottomSheet';
import EditExpenseScreen from '../screens/expenses/editExpense/EditExpense';

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
        <Stack.Screen name="DetailsExpense" component={ExpenseDetails} />
        <Stack.Screen name="AllExpenses" component={AllExpenses} />
        <Stack.Screen
          name="EditExpenseScreen"
          component={EditExpenseScreen}
          options={{ title: 'עריכת הוצאה' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
