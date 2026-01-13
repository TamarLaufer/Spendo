import styled from 'styled-components/native';
import { SkeletonBlockProps } from './SkeletonBlock';

export const Block = styled.View<SkeletonBlockProps>`
  background-color: #e5e5e5;
  border-radius: ${({ radius = 8 }) => radius}px;
  height: ${({ height = 14 }) => height}px;
  width: ${({ width = '100%' }) =>
    typeof width === 'number' ? `${width}px` : width};
  margin-bottom: ${({ marginBottom = 0 }) => marginBottom}px;
`;
