import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamsType } from '../../../navigation/types';

export type ExpenseDetailsRoute = RouteProp<
  RootStackParamsType,
  'ExpenseDetails'
>;
export type RootNav = NativeStackNavigationProp<RootStackParamsType>;
