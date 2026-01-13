import styled from 'styled-components/native';

export const SkeletonContainer = styled.View`
  background-color: white;
  flex-direction: row;
  padding: 10px;
  align-items: center;
`;

export const SkeletonBox = styled.View<{
  width: number;
  height: number;
}>`
  background-color: #e5e5e5;
  border-radius: 6px;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`;

export const IconPlaceholder = styled(SkeletonBox)`
  margin-end: 10px;
`;

export const MiddleCol = styled.View`
  flex: 1;
  gap: 6px;
`;

export const RightCol = styled.View`
  align-items: flex-end;
  gap: 6px;
`;
