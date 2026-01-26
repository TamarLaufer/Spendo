import { ProgressBarContainer, ProgressBarFill } from "./ProgressBar.styles";

type ProgressBarProps = {
  percent: number;
};

const ProgressBar = ({ percent }: ProgressBarProps) => {
  console.log('percent', percent);
  return (
    <ProgressBarContainer>
      <ProgressBarFill percent={percent} />
    </ProgressBarContainer>
  );
};

export default ProgressBar