import React from 'react';
import { PressableProps } from 'react-native';
import { Container, Plus } from './AddButton.styles';

const AddButton: React.FC<PressableProps> = ({ onPress, ...props }) => {
  return (
    <Container onPress={onPress} {...props}>
      <Plus>+</Plus>
    </Container>
  );
};

export default AddButton;
