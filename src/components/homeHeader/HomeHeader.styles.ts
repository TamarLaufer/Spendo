import styled from 'styled-components/native';

export const Container = styled.View`
  align-items: flex-start;
  flex-direction: row;
  margin-top: 10px;
  padding-left: 40px;
`;

export const TextContainer = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const GreetingText = styled.Text`
  font-family: 'MPLUSRounded1c-Medium';
  font-size: 28px;
  color: #222;
  text-align: right;
  line-height: 34px;
`;

export const SubtitleText = styled.Text`
  font-family: 'MPLUSRounded1c-Regular';
  font-size: 20px;
  color: #888;
  margin-start: 25px;
`;
