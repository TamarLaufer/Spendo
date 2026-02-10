import React from 'react';
import LoginComponent from '../../../components/login/Login';
import { signInWithEmailPassword } from '../../../firebase/services/authService';
import TopWave from '../../../components/topWave/TopWave';
import { Icons } from '../../../assets/icons';
import { Screen } from './Login.styles';

type LoginFormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const handleLogin = async ({ email, password }: LoginFormValues) => {
    await signInWithEmailPassword(email, password);
  };

  return (
    <Screen>
      <TopWave />
      <LoginComponent
        logo={<Icons.logo width={70} height={70} />}
        onSubmit={handleLogin}
      />
    </Screen>
  );
};

export default Login;
