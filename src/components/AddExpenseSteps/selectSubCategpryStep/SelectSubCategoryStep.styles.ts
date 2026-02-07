import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding-vertical: 18px;
  margin-horizontal: 35px;
`;

export const Msg = styled.Text`
  text-align: center;
  margin-top: 20px;
  font-size: 16px;
`;
export const Loader = styled.View`
  margin-top: 20px;
`;
export const Error = styled.Text`
  text-align: center;
  margin-top: 20px;
  font-size: 16px;
  color: red;
`;
export const Row = styled.Pressable`
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
`;
export const RowText = styled.Text`
  font-size: 18px;
  margin-left: 12px;
  font-family: 'MPLUSRounded1c-Medium';
`;
