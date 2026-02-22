import { FC } from 'react';
import { Icons } from '../../assets/icons';
import { Container, LogoWrapper } from './TopBar.styles';
import Logout from '../logout/Logout';

const TopBar: FC = () => {
  return (
    <Container>
      <LogoWrapper>
        <Icons.LogoWallet width={45} height={45} />
      </LogoWrapper>
      <Logout />
    </Container>
  );
};

export default TopBar;
