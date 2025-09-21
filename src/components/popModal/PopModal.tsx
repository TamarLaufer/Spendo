import {
  GestureResponderEvent,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { theme } from '../../theme/theme';

type PopModalPropsType = {
  visible?: boolean;
  onClose: () => void;
  modalHeader: string;
  modalSecondaryText?: string;
  modalButtonTextRight?: string;
  modalButtonTextLeft?: string;
  onConfirm: (event: GestureResponderEvent) => void;
  onCancel: () => void;
};

const PopModal = ({
  visible,
  onClose,
  modalHeader,
  modalSecondaryText,
  modalButtonTextRight,
  modalButtonTextLeft,
  onConfirm,
  onCancel,
}: PopModalPropsType) => {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{modalHeader}</Text>
            <Text style={styles.modalText}>{modalSecondaryText}</Text>
            <View style={styles.buttonsContainer}>
              <Pressable style={styles.pressRight} onPress={onCancel}>
                <Text style={styles.buttonText}>{modalButtonTextRight}</Text>
              </Pressable>
              <Pressable style={styles.pressLeft} onPress={onConfirm}>
                <Text style={styles.buttonText}>{modalButtonTextLeft}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    width: '50%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  modalText: {
    fontSize: 18,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 18,
  },
  pressRight: {
    backgroundColor: '#F08787',
    padding: 12,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressLeft: {
    backgroundColor: '#BBDCE5',
    padding: 12,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: theme.color.shadowColor,
    fontSize: 16,
  },
});

export default PopModal;
