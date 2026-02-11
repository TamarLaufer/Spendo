import React from 'react';
import RegisterComponent from '../../../components/register/Register';
import { registerWithEmailPassword } from '../../../firebase/services/authService';
import { useNavigation } from '@react-navigation/native';
import { AuthStackParamsType } from '../../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

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
    await registerWithEmailPassword(name, email, password);
  };
  const onNavigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <RegisterComponent
      onSubmit={handleRegister}
      onNavigateToLogin={onNavigateToLogin}
    />
  );
};

export default Register;
