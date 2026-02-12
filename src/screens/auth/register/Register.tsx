import React from 'react';
import RegisterComponent from '../../../components/register/Register';
import { registerWithEmailPassword } from '../../../firebase/services/authService';
import { useNavigation } from '@react-navigation/native';
import { AuthStackParamsType } from '../../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icons } from '../../../assets/icons';
import { getAuth } from '@react-native-firebase/auth';
import { useAuthStore } from '../../../zustandState/useAuthStore';

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
};

type NavigationType = NativeStackNavigationProp<
  AuthStackParamsType,
  'Register'
>;

const Register = () => {
  const navigation = useNavigation<NavigationType>();

  const handleRegister = async ({
    name,
    email,
    password,
  }: RegisterFormValues) => {
    const user = await registerWithEmailPassword(name, email, password);

    await user.reload();

    const freshUser = getAuth().currentUser;

    if (freshUser) {
      useAuthStore.getState().setUser(freshUser);
    }
  };
  const onNavigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <RegisterComponent
      logo={<Icons.Logo width={70} height={70} />}
      onSubmit={handleRegister}
      onNavigateToLogin={onNavigateToLogin}
    />
  );
};

export default Register;
