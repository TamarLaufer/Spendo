type SkeletonPropsType = {
  ready: boolean;
  skeleton: React.ReactNode;
  children: React.ReactNode;
};

const WithSkeleton = ({ ready, skeleton, children }: SkeletonPropsType) => {
  if (!ready) return <>{skeleton}</>;
  return <>{children}</>;
};

export default WithSkeleton;
