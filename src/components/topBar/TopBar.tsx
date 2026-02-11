import { FC } from 'react';
import { Icons } from '../../assets/icons';
import { Container, LogoWrapper } from './TopBar.styles';
import Logout from '../logout/Logout';

const TopBar: FC = () => {
  return (
    <Container>
      <LogoWrapper>
        <Icons.LogoNoBg width={50} height={50} />
      </LogoWrapper>
      <Logout />
    </Container>
  );
};

export default TopBar;
