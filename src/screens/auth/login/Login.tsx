import React from 'react';
import LoginComponent from '../../../components/login/Login';
import { signInWithEmailPassword } from '../../../firebase/services/authService';
import TopWave from '../../../components/topWave/TopWave';
import { Icons } from '../../../assets/icons';
import { Screen } from './Login.styles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamsType } from '../../../navigation/types';

type LoginFormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamsType, 'Login'>>();

  const handleLogin = async ({ email, password }: LoginFormValues) => {
    await signInWithEmailPassword(email, password);
  };

  return (
    <Screen>
      <TopWave />
      <LoginComponent
        logo={<Icons.Logo width={70} height={70} />}
        onSubmit={handleLogin}
        onNavigateToRegister={() => navigation.navigate('Register')}
      />
    </Screen>
  );
};

export default Login;
