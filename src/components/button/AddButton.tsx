import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../../theme/theme';

type AddButtonType = {
  onPress: () => void;
  style?: ViewStyle;
};

const AddButton: React.FC<AddButtonType> = ({ onPress, style }) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.plus}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 30,
    width: 72,
    height: 72,
    borderRadius: 50,
    backgroundColor: theme.color.purple,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    marginLeft: 4,
  },
  plus: {
    fontSize: 45,
    color: 'white',
    marginTop: -2,
  },
});

export default AddButton;
