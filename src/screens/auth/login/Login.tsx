import React from 'react';
import LoginComponent from '../../../components/login/Login';
import { signInWithEmailPassword } from '../../../firebase/services/authService';
// import TopWave from '../../../components/topWave/TopWave';
import { Icons } from '../../../assets/icons';
import { Screen } from './Login.styles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamsType } from '../../../navigation/types';
import { useAuthStore } from '../../../zustandState/useAuthStore';

type LoginFormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamsType, 'Login'>>();
  const setIsLoggingIn = useAuthStore(state => state.setIsLoggingIn);

  const handleLogin = async ({ email, password }: LoginFormValues) => {
    setIsLoggingIn(true);

    try {
      await signInWithEmailPassword(email, password);
    } catch (error) {
      console.log('Login error', error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <Screen>
      {/* <TopWave /> */}
      <LoginComponent
        logo={<Icons.LogoWallet width={80} height={80} />}
        onSubmit={handleLogin}
        onNavigateToRegister={() => navigation.navigate('Register')}
      />
    </Screen>
  );
};

export default Login;
