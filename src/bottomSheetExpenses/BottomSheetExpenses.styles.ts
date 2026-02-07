import BottomSheet from '@gorhom/bottom-sheet';
import styled from 'styled-components/native';

export const BottomSheetContainer = styled(BottomSheet)`
  padding-vertical: 5px;
`;

export const BottomSheetBackground = styled.View`
  background-color: #fbfbfb;
  border-top-right-radius: 40px;
  border-top-left-radius: 40px;
  shadow-color: #000;
  shadow-offset: 0px -2px;
  shadow-opacity: 0.15;
  shadow-radius: 8px;
  elevation: 18;
`;

export const StepContainer = styled.View`
  flex: 1;
  margin-top: 28px;
  margin-horizontal: 10px;
`;

export const BottomSheetView = styled.View`
  padding-bottom: 40px;
`;

export const HeaderText = styled.Text`
  font-size: 26px;
  text-align: center;
  margin-top: 12px;
  font-family: 'MPLUSRounded1c-Medium';
`;

export const BackButton = styled.Pressable`
  position: absolute;
  top: -8px;
  left: 7%;
  z-index: 10;
  transform: rotate(180deg);
`;

export const CancelXButton = styled.Pressable`
  position: absolute;
  top: 0%;
  right: 6%;
  z-index: 10;
`;

export const ActionsContainer = styled.View`
  justify-content: center;
  padding-bottom: 28px;
`;
