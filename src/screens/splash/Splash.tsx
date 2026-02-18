import { Icons } from '../../assets/icons';
import { Container } from './Splash.styles';
import { useAnimatedRef } from 'react-native-reanimated';

const SplashScreen = () => {
  const animatedRef = useAnimatedRef();

  return (
    <Container>
      <Icons.Logo width={100} height={100} />
    </Container>
  );
};
export default SplashScreen;
