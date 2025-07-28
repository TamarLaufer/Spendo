import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamsType } from './types';
import MainTabsWithBottomSheet from '../components/MainTabsWithBottomSheet';

const Stack = createStackNavigator<RootStackParamsType>();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={MainTabsWithBottomSheet} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
