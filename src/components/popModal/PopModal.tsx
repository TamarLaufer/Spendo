import { GestureResponderEvent, Modal } from 'react-native';
import React from 'react';
import {
  Backdrop,
  ButtonsContainer,
  ButtonText,
  CenteredView,
  ModalText,
  ModalView,
  PressLeft,
  PressRight,
} from './PopModal.styles';

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
      <Backdrop onPress={onClose}>
        <CenteredView>
          <ModalView>
            <ModalText>{modalHeader}</ModalText>
            {children}
            <ButtonsContainer>
              <PressLeft onPress={onConfirm}>
                <ButtonText>{modalButtonTextLeft}</ButtonText>
              </PressLeft>
              <PressRight onPress={onCancel}>
                <ButtonText>{modalButtonTextRight}</ButtonText>
              </PressRight>
            </ButtonsContainer>
          </ModalView>
        </CenteredView>
      </Backdrop>
    </Modal>
  );
};

export default PopModal;
