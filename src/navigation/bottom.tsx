import React, { useCallback } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/home/Home';
import Receipts from '../screens/receipts/Receipts';
import Settings from '../screens/settings/Settings';
import Categories from '../screens/categories/Categories';
import { MainBottomTabsParamsListTypes } from './types';
import { STRINGS } from '../strings/hebrew';
import AddButton from '../components/button/AddButton';
import { theme } from '../theme/theme';
import TabBarIcon from '../components/tabBarIcon/TabBarIcon';
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

export type TabIconProps = Parameters<
  NonNullable<BottomTabNavigationOptions['tabBarIcon']>
>[0];

const Tab = createBottomTabNavigator<MainBottomTabsParamsListTypes>();

const TAB_BAR_STYLE = { height: 70 } as const;
const TAB_SCREEN_OPTIONS = {
  tabBarActiveTintColor: theme.color.purple,
  tabBarInactiveTintColor: 'gray',
  headerShown: false,
  tabBarStyle: TAB_BAR_STYLE,
} as const;

const IconHome = ({ focused, color, size }: TabIconProps) => (
  <TabBarIcon routeName="Home" focused={focused} color={color} size={size} />
);
const IconCategories = ({ focused, color, size }: TabIconProps) => (
  <TabBarIcon
    routeName="Categories"
    focused={focused}
    color={color}
    size={size}
  />
);
const IconReceipts = ({ focused, color, size }: TabIconProps) => (
  <TabBarIcon
    routeName="Receipts"
    focused={focused}
    color={color}
    size={size}
  />
);
const IconSettings = ({ focused, color, size }: TabIconProps) => (
  <TabBarIcon
    routeName="Settings"
    focused={focused}
    color={color}
    size={size}
  />
);

const HOME_OPTIONS = {
  tabBarLabel: STRINGS.HOME,
  tabBarIcon: IconHome,
} as const;
const CATEGORIES_OPTIONS = {
  tabBarLabel: STRINGS.CATEGORIES,
  tabBarIcon: IconCategories,
} as const;
const RECEIPTS_OPTIONS = {
  tabBarLabel: STRINGS.RECEIPS,
  tabBarIcon: IconReceipts,
} as const;
const SETTINGS_OPTIONS = {
  tabBarLabel: STRINGS.SETTINGS,
  tabBarIcon: IconSettings,
} as const;

const DummyComponent = () => null;

type PropsType = { openBottomSheet: () => void };

const MainTabs = ({ openBottomSheet }: PropsType) => {
  const renderAddButton = useCallback(
    () => <AddButton onPress={openBottomSheet} />,
    [openBottomSheet],
  );

  const addOptions = React.useMemo(
    () => ({ tabBarLabel: '', tabBarButton: renderAddButton }),
    [renderAddButton],
  );

  return (
    <Tab.Navigator screenOptions={TAB_SCREEN_OPTIONS}>
      <Tab.Screen name="Home" component={Home} options={HOME_OPTIONS} />
      <Tab.Screen
        name="Categories"
        component={Categories}
        options={CATEGORIES_OPTIONS}
      />
      <Tab.Screen name="Add" component={DummyComponent} options={addOptions} />
      <Tab.Screen
        name="Receipts"
        component={Receipts}
        options={RECEIPTS_OPTIONS}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={SETTINGS_OPTIONS}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
