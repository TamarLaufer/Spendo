import { FC } from 'react';
import { Icons } from '../../assets/icons';
import { Container, TitleText } from './TopBar.styles';
import { STRINGS } from '../../strings/hebrew';
const TopBar: FC = () => {
  return (
    <Container>
      <Icons.Payment width={50} height={50} />
      <TitleText>{STRINGS.FINANCIAL_SAVVY}</TitleText>
    </Container>
  );
};

export default TopBar;
