import styled from 'styled-components/native';

export const Elements = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 25px;
  padding-bottom: 20px;
  margin-bottom: 25px;
`;

export const ActionContainer = styled.Pressable<{
  backgroundColor: string;
  borderColor: string;
}>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 8px;
  width: 40%;
  justify-content: center;
  align-items: center;
  padding-horizontal: 20px;
  padding-vertical: 10px;
  border-width: 1px;
  border-color: ${({ borderColor }) => borderColor};
`;
export const ActionButtonText = styled.Text<{ textColor: string }>`
  font-size: 18px;
  font-family: 'MPLUSRounded1c-Bold';
  color: ${({ textColor }) => textColor};
`;
