import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamsType } from './types';
import MainTabsWithBottomSheet from '../components/mainTabWithBottomSheet/MainTabsWithBottomSheet';

const Stack = createStackNavigator<RootStackParamsType>();
const STACK_SCREEN_OPTIONS = { headerShown: false };

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={STACK_SCREEN_OPTIONS}>
        <Stack.Screen name="MainTabs" component={MainTabsWithBottomSheet} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
