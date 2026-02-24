import { Icons } from '../../assets/icons';
import { Container, LogoWrapper } from './TopBar.styles';
import Logout from '../logout/Logout';

type TopBarProps = {
  onPress?: () => void;
};

const TopBar = ({ onPress }: TopBarProps) => {
  return (
    <Container onPress={onPress}>
      <LogoWrapper>
        <Icons.LogoWallet width={45} height={45} />
      </LogoWrapper>
      <Logout />
    </Container>
  );
};

export default TopBar;
