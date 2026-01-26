import styled from "styled-components/native";

export const ProgressBarContainer = styled.View`
  height: 8px;
  background-color: #eee;
  border-radius: 6px;
`;

export const ProgressBarFill = styled.View<{ percent: number }>`
  height: 8px;
  width: ${({ percent }: { percent: number }) => `${percent}%`};
  background-color: ${({ percent }: { percent: number }) => percent > 80 ? '#E74C3C' : '#4CAF50'};
  border-radius: 6px;
`;