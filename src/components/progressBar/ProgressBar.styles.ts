import styled from "styled-components/native";

export const ProgressBarContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-top: 10px;
`;

export const ProgressBarFillContainer = styled.View`
  background-color: #eee;
  border-radius: 6px;
  width: 75%;
`;

export const PercentText = styled.Text`
  font-size: 14px;
  font-family: 'MPLUSRounded1c-Medium';
`;

export const ProgressBarFill = styled.View<{ percent: number, level: string }>`
  height: 8px;
  width: ${({ percent }: { percent: number }) => `${percent}%`};
  background-color: ${({ level }: { level: string }) => level === 'over' ? '#C3110C'
   : level === 'high' ? 'red' : level === 'medium' ? '#FACE68' : '#4CAF50'};
  border-radius: 6px;
`;

export const ProgressBarTextContainer = styled.View`
  align-items: center;
`;
export const ProgressBarText = styled.Text`
  font-size: 14px;
  text-align: center;
  font-family: 'MPLUSRounded1c-Medium';
`;