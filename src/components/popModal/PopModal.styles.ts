import styled from 'styled-components/native';

export const Backdrop = styled.Pressable`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.35);
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

export const ModalView = styled.View`
  justify-content: center;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  align-items: center;
  elevation: 5;
`;

export const ModalText = styled.Text`
  text-align: center;
  font-size: 24px;
  font-family: 'MPLUSRounded1c-Medium';
  margin-bottom: 20px;
`;

export const ActionsContainer = styled.View`
  flex-direction: row;
  gap: 12px;
  margin-top: 20px;
`;

export const ActionButtonContainer = styled.Pressable<{
  backgroundColor: string;
  borderColor: string;
}>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding: 10px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  width: 50%;
  border-width: 1px;
  border-color: ${({ borderColor }) => borderColor};
`;

export const ButtonText = styled.Text<{ textColor: string }>`
  font-size: 20px;
  font-family: 'MPLUSRounded1c-Regular';
  color: ${({ textColor }) => textColor};
`;
