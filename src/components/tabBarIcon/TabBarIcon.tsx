import React from 'react';
import { theme } from '../../theme/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MainBottomTabsParamsListTypes } from '../../navigation/types';

type RouteName = keyof MainBottomTabsParamsListTypes;

type TabBarIconPropsType = {
  focused: boolean;
  color: string;
  size: number;
  routeName: RouteName;
};

const ICONS: Record<RouteName, { active: string; inactive: string }> = {
  Home: { active: 'home', inactive: 'home-outline' },
  Categories: { active: 'list', inactive: 'list-outline' },
  Receipts: { active: 'receipt', inactive: 'receipt-outline' },
  Settings: { active: 'settings', inactive: 'settings-outline' },
  // Just in case:
  Add: { active: 'add', inactive: 'add-outline' },
};

const TabBarIcon = ({
  focused,
  color,
  size,
  routeName,
}: TabBarIconPropsType) => {
  const names = ICONS[routeName] ?? ICONS.Home;
  const iconName = focused ? names.active : names.inactive;

  return (
    <Ionicons
      name={iconName}
      size={size}
      color={focused ? theme.color.purple : color}
    />
  );
};

export default React.memo(TabBarIcon);
