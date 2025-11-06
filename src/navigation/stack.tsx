import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamsType } from './types';
import AllExpenses from '../screens/AllExpenses/AllExpenses';
import DetailsExpense from '../screens/ExpenseDetails/ExpenseDetails';
import MainTabsWithBottomSheet from '../components/mainTabWithBottomSheet/MainTabsWithBottomSheet';
import EditExpenseScreen from '../screens/EditExpenseScreen';

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
        <Stack.Screen name="DetailsExpense" component={DetailsExpense} />
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
