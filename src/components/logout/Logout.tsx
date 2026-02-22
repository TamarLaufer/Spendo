import { TouchableOpacity } from 'react-native';
import React from 'react';
import { Icons } from '../../assets/icons';
import { logout } from '../../firebase/services/authService';

const Logout = () => {
  return (
    <TouchableOpacity onPress={logout}>
      <Icons.Logout width={30} height={30} />
    </TouchableOpacity>
  );
};

export default Logout;
