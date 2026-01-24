import { GestureResponderEvent, Modal } from 'react-native';
import React from 'react';
import {
  ActionButtonContainer,
  ActionsContainer,
  Backdrop,
  ButtonText,
  ModalText,
  ModalView,
} from './PopModal.styles';
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
      <Backdrop onPress={onClose}>
        <ModalView>
          <ModalText>{modalHeader}</ModalText>
          {children}
          <ActionsContainer>
            <ActionButtonContainer
              backgroundColor={theme.color.lightBlue}
              borderColor={theme.color.lightBlue}
              onPress={onConfirm}
            >
              <ButtonText textColor={theme.color.white}>
                {modalButtonTextLeft}
              </ButtonText>
            </ActionButtonContainer>
            <ActionButtonContainer
              backgroundColor={theme.color.white}
              borderColor={theme.color.shadowColor}
              onPress={onCancel}
            >
              <ButtonText textColor={theme.color.shadowColor}>
                {modalButtonTextRight}
              </ButtonText>
            </ActionButtonContainer>
          </ActionsContainer>
        </ModalView>
      </Backdrop>
    </Modal>
  );
};

export default PopModal;
