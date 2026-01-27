import {  PercentText, ProgressBarContainer, ProgressBarFill, ProgressBarFillContainer, ProgressBarText, ProgressBarTextContainer } from "./ProgressBar.styles";
import { formatPercent } from "../../utils/formatting";
import { STRINGS } from "../../strings/hebrew";

type ProgressBarPropsType = {
  percent: number;
};

type ProgressBarLevelType = 'over' | 'high' | 'medium' | 'low';

const ProgressBar = ({ percent }: ProgressBarPropsType) => {
  const safePercent = Math.max(0, Math.min(percent, 100));  // 0-100

  function getProgressBarLevel(rawPercent: number): ProgressBarLevelType {
    if (rawPercent > 100) return 'over';
    if (rawPercent >= 80) return 'high';
    if (rawPercent >= 50) return 'medium';
    return 'low';
  }

  console.log('percent', percent);
  
  const progressBarLevel = getProgressBarLevel(percent);

  return (
    <>
      <ProgressBarContainer>
        <PercentText>{formatPercent(percent)}</PercentText>
        <ProgressBarFillContainer>
          <ProgressBarFill percent={safePercent} level={progressBarLevel} />
        </ProgressBarFillContainer>
      </ProgressBarContainer>
      <ProgressBarTextContainer>
        {progressBarLevel === 'over' && <ProgressBarText>{STRINGS.OVER_BUDGET}</ProgressBarText>}
        {progressBarLevel === 'high' && <ProgressBarText>{STRINGS.BE_CAREFUL}</ProgressBarText>}
        {progressBarLevel === 'medium' && <ProgressBarText>{STRINGS.PAY_ATTENTION}</ProgressBarText>}
        {progressBarLevel === 'low' && <ProgressBarText>{STRINGS.YOU_ARE_IN_GOOD_STATE}</ProgressBarText>}
      </ProgressBarTextContainer>
    </>
  );
};

export default ProgressBar;   