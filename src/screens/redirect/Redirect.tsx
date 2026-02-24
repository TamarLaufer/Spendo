import { ActivityIndicator } from 'react-native';
import { Container, DirectingText } from './Redirect.styles';

const Redirect = () => {
  return (
    <Container>
      <ActivityIndicator size="large" />
      <DirectingText>מעבירים אותך...</DirectingText>
    </Container>
  );
};

export default Redirect;
