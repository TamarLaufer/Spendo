import styled from 'styled-components/native';

export const Container = styled.View`
  align-items: center;
  justify-content: center;
  padding: 17px;
  background-color: white;
  margin: 20px 25px 0px 25px;

  /* shadow */
  elevation: 4;
  border-radius: 8px;
`;

export const RegularText = styled.Text`
  font-size: 22px;
  font-family: MPLUSRounded1c-Medium;
`;
export const BalanceAmount = styled.Text`
  font-size: 36px;
  font-family: MPLUSRounded1c-Medium;
`;

export const MaxAmount = styled.Text`
  font-size: 26px;
  font-family: MPLUSRounded1c-Regular;
`;

export const BalanceTextContainer = styled.View`
  align-items: center;
  justify-content: center;
`;
