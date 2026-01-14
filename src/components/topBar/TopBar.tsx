import { FC } from 'react';
import { Icons } from '../../assets/icons';
import { Container, TitleText } from './TopBar.styles';
const TopBar: FC = () => {
  return (
    <Container>
      <Icons.Payment width={50} height={50} />
      <TitleText>חסכוני</TitleText>
    </Container>
  );
};

export default TopBar;
