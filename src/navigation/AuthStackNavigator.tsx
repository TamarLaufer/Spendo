import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/auth/login/Login';
import Register from '../screens/auth/register/Register';
import { AuthStackParamsType } from './types';

const AuthStack = createNativeStackNavigator<AuthStackParamsType>();

export function AuthStackNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Register" component={Register} />
    </AuthStack.Navigator>
  );
}
