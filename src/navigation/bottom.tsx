import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '../components/home/Home';
import { MainBottomTabsParamsListTypes } from './types';
import Categories from '../components/categories/Categories';
import Settings from '../components/settings/Settings';
import Receipts from '../components/receipts/Receipts';
import { STRINGS } from '../strings/hebrew';
import AddButton from '../components/button/AddButton';
import { theme } from '../theme/theme';

const Tab = createBottomTabNavigator<MainBottomTabsParamsListTypes>();
const TAB_LABELS = {
  Home: STRINGS.HOME,
  Categories: STRINGS.CATEGORIES,
  Receipts: STRINGS.RECEIPS,
  Settings: STRINGS.SETTINGS,
};

const DummyComponent: React.FC = () => null;

type PropsType = {
  openBottomSheet: () => void;
};

const MainTabs = ({ openBottomSheet }: PropsType) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'home-outline';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Categories') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Receipts') {
            iconName = focused ? 'receipt' : 'receipt-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={focused ? theme.color.purple : color}
            />
          );
        },
        tabBarActiveTintColor: theme.color.purple,
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: {
          height: 70,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ tabBarLabel: TAB_LABELS.Home }}
      />
      <Tab.Screen
        name="Categories"
        component={Categories}
        options={{ tabBarLabel: TAB_LABELS.Categories }}
      />
      <Tab.Screen
        name="Add"
        component={DummyComponent}
        options={{
          tabBarButton: () => <AddButton onPress={openBottomSheet} />,
        }}
      />
      <Tab.Screen
        name="Receipts"
        component={Receipts}
        options={{ tabBarLabel: TAB_LABELS.Receipts }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{ tabBarLabel: TAB_LABELS.Settings }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
