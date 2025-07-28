import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';

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
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: '#C562AF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 7,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    marginLeft: 8,
  },
  plus: {
    fontSize: 38,
    color: 'white',
    fontWeight: 'bold',
    marginTop: -2,
  },
});

export default AddButton;
