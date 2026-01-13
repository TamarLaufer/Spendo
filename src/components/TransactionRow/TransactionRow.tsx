import { StyleProp, TextStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { formatAmount, formatShortDate } from '../../utils/formatting';
import {
  Amount,
  Container,
  DateText,
  IconContainer,
  LeftCol,
  MiddleCol,
  SubTitle,
  Title,
} from './TransactionRow.styles';

export type TransactionRowProps = {
  text: string;
  textStyle?: StyleProp<TextStyle>;
  icon?: React.ComponentType<SvgProps>;
  iconSize?: number;
  amount?: number;
  createdAt?: Date | null;
  subText?: string;
  onPress?: () => void;
};

const TransactionRow = ({
  text,
  icon: Icon,
  iconSize = 36,
  amount,
  createdAt,
  subText,
  onPress,
}: TransactionRowProps) => (
  <Container onPress={onPress} disabled={!onPress}>
    <IconContainer>
      {Icon && <Icon width={iconSize} height={iconSize} />}
    </IconContainer>
    <MiddleCol>
      <Title numberOfLines={1}>{text}</Title>
      {subText && <SubTitle numberOfLines={1}>{subText}</SubTitle>}
    </MiddleCol>
    <LeftCol>
      {typeof amount === 'number' && (
        <Amount numberOfLines={1}>{formatAmount(amount)}</Amount>
      )}
      {createdAt && (
        <DateText numberOfLines={1}>{formatShortDate(createdAt)}</DateText>
      )}
    </LeftCol>
  </Container>
);

export default TransactionRow;
