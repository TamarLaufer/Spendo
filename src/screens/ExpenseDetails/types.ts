import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamsType } from '../../navigation/types';

export type DetailsRoute = RouteProp<RootStackParamsType, 'DetailsExpense'>;
export type RootNav = NativeStackNavigationProp<RootStackParamsType>;
