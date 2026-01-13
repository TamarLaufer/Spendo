import { Block } from './SkeletonBlock.styles';

export type SkeletonBlockProps = {
  height?: number;
  width?: number | string;
  radius?: number;
  marginBottom?: number;
};

const SkeletonBlock = (props: SkeletonBlockProps) => {
  return <Block {...props} />;
};

export default SkeletonBlock;
