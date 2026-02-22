import LottieView from 'lottie-react-native';
import { Container } from './Splash.styles';

const SplashScreen = () => {
  return (
    <Container>
      <LottieView
        source={require('../../assets/lotties/wallet-animated.json')}
        autoPlay
        loop
        style={{ width: 160, height: 160 }}
        resizeMode="contain"
      />
    </Container>
  );
};

export default SplashScreen;
