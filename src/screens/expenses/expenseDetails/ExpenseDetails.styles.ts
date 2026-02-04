import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const LogoContainer = styled.View`
  flex: 0.5;
  justify-content: center;
  align-items: center;
`;

export const TextContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  margin-bottom: 40px;
`;

export const TextBase = styled.Text`
  font-size: 20px;
  font-family: 'MPLUSRounded1c-Regular';
  color: white;
`;

export const DetailText = styled.Text`
  font-size: 26px;
  font-family: 'MPLUSRounded1c-Regular';
  margin-vertical: 10px;
`;

export const NoteText = styled.Text`
  text-align: center;
  font-size: 26px;
  font-family: 'MPLUSRounded1c-Bold';
  margin-vertical: 10px;
`;

export const AmountText = styled.Text`
  font-size: 32px;
  font-family: 'MPLUSRounded1c-Bold';
  margin-vertical: 10px;
`;

export const BoldText = styled.Text`
  font-size: 28px;
  font-family: 'MPLUSRounded1c-Bold';
  margin-vertical: 10px;
`;

export const EditButtonText = styled.Text`
  font-size: 16px;
  font-family: 'MPLUSRounded1c-Bold';
  color: white;
`;
