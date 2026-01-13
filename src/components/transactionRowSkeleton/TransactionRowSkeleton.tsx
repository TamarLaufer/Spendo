import {
  IconPlaceholder,
  MiddleCol,
  RightCol,
  SkeletonBox,
  SkeletonContainer,
} from './TransactionRowSkeleton.styles';

const TransactionRowSkeleton = () => {
  return (
    <SkeletonContainer>
      <IconPlaceholder width={36} height={36} />

      <MiddleCol>
        <SkeletonBox width={120} height={14} />
        <SkeletonBox width={80} height={12} />
      </MiddleCol>

      <RightCol>
        <SkeletonBox width={60} height={14} />
        <SkeletonBox width={50} height={12} />
      </RightCol>
    </SkeletonContainer>
  );
};

export default TransactionRowSkeleton;
