import styled from 'styled-components/native';

export const Container = styled.View`
  align-items: flex-start;
  flex-direction: column;
  margin-top: 10px;
  padding-left: 40px;
  flex-direction: row;
`;

export const IconAndTextContainer = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const GreetingText = styled.Text`
  font-family: Assistant;
  font-size: 28px;
  color: #222;
  text-align: right;
  font-family: 'MPLUSRounded1c-Medium';
  line-height: 34px;
`;

export const SubtitleText = styled.Text`
  font-family: Assistant;
  font-size: 18px;
  font-family: 'MPLUSRounded1c-Regular';
`;

export const GreetingIcon = styled.Text`
  font-size: 28px;
  color: #222;
  font-family: 'MPLUSRounded1c-Regular';
`;
