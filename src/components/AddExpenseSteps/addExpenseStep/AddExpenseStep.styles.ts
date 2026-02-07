import styled from 'styled-components/native';

export const SheetContainer = styled.View`
  align-items: center;
  justify-content: center;
  border-radius: 24px;
  margin-bottom: 30px;
`;

export const Display = styled.TextInput`
  font-size: 32px;
  margin-bottom: 14px;
  font-weight: 600;
  color: black;
  font-family: 'MPLUSRounded1c-Medium';
`;

export const ErrorText = styled.Text`
  color: red;
  text-align: center;
  font-family: 'MPLUSRounded1c-Medium';
  font-size: 16px;
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-vertical: 8px;
`;

export const KeyButton = styled.TouchableOpacity`
  width: 68px;
  height: 68px;
  border-radius: 20px;
  background-color: white;
  justify-content: center;
  align-items: center;
  margin-horizontal: 8px;
  elevation: 2;
`;

export const KeyText = styled.Text`
  font-size: 26px;
  color: #321d63;
  font-weight: 500;
  font-family: 'MPLUSRounded1c-Medium';
`;
