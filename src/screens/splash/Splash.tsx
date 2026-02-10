import { View } from 'react-native';
import { Icons } from '../../assets/icons';

const SplashScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#f6f7f9',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Icons.logo width={100} height={100} />
    </View>
  );
};
export default SplashScreen;
