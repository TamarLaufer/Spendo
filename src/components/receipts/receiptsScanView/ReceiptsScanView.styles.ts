import styled from 'styled-components/native';

export const Screen = styled.View`
  flex: 1;
  background-color: black;
`;

export const CameraView = styled.View`
  width: 260,
  height: 360,
  borderWidth: 2,
  borderColor: 'white',
  borderRadius: 16,
  opacity: 0.9,
`;

export const CameraViewContainer = styled.View`
  flex: 1;
  justifycontent: 'center';
  alignitems: 'center';
`;

export const TextDescription = styled.Text`
  color: white;
  textalign: 'center';
  fontsize: 16;
`;

export const TextDescriptionContainer = styled.View`
  paddingbottom: 32;
  paddinghorizontal: 20;
`;
