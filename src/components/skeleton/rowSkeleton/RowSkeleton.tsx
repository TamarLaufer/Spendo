import React from 'react';
import SkeletonBlock from '../skeletonBlock/SkeletonBlock';
import {
  SkeletonRowContainer,
  SkeletonMiddleCol,
  SkeletonLeftCol,
} from './RowSkeleton.styles';

const RowSkeleton = () => {
  return (
    <SkeletonRowContainer>
      {/* Icon */}
      <SkeletonBlock width={36} height={36} radius={18} />

      {/* Title + SubTitle */}
      <SkeletonMiddleCol>
        <SkeletonBlock height={14} marginBottom={6} />
        <SkeletonBlock width="60%" height={12} />
      </SkeletonMiddleCol>

      {/* Amount + Date */}
      <SkeletonLeftCol>
        <SkeletonBlock width={50} height={14} marginBottom={6} />
        <SkeletonBlock width={40} height={12} />
      </SkeletonLeftCol>
    </SkeletonRowContainer>
  );
};

export default RowSkeleton;
