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
  modalHeader: string;
  children?: React.ReactNode;
  modalSecondaryText?: string;
  visible?: boolean;
  modalButtonTextRight?: string;
  modalButtonTextLeft?: string;
  onClose: () => void;
  onConfirm: (event: GestureResponderEvent) => void;
  onCancel: () => void;
};

const PopModal = ({
  visible,
  onClose,
  modalHeader,
  modalButtonTextRight,
  modalButtonTextLeft,
  onConfirm,
  onCancel,
  children,
}: PopModalPropsType) => {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{modalHeader}</Text>
            {children}
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
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  modalText: {
    textAlign: 'center',
    fontSize: 22,
    fontFamily: 'PlaypenSansHebrew-Regular',
    marginBottom: 15,
  },
  modalView: {
    justifyContent: 'center',
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
    width: 335,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 15,
  },
  pressRight: {
    backgroundColor: '#F08787',
    padding: 8,
    paddingHorizontal: 22,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    width: 112,
    height: 58,
  },
  pressLeft: {
    backgroundColor: '#BBDCE5',
    padding: 8,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 58,
  },
  buttonText: {
    color: theme.color.shadowColor,
    fontSize: 18,
    fontFamily: 'PlaypenSansHebrew-Regular',
  },
});

export default PopModal;
