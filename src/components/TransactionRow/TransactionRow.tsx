import { StyleProp, TextStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { formatAmount, formatShortDate } from '../../utils/formatting';
import {
  Amount,
  Container,
  Date,
  IconContainer,
  LeftCol,
  MiddleCol,
  SubTitle,
  Title,
} from './TransactionRow.styles';

export type TransactionRowProps = {
  text: string;
  onPress?: () => void;
  textStyle?: StyleProp<TextStyle>;
  icon?: React.ComponentType<SvgProps>;
  iconSize?: number;
  amount?: number;
  createdAt?: Date | null;
  subText?: string;
};

const TransactionRow = ({
  text,
  onPress,
  icon: Icon,
  iconSize = 30,
  amount,
  createdAt,
  subText,
}: TransactionRowProps) => (
  <Container onPress={onPress} disabled={!onPress}>
    <IconContainer>
      {Icon ? <Icon width={iconSize} height={iconSize} /> : null}
    </IconContainer>
    <MiddleCol>
      <Title numberOfLines={1}>{text}</Title>
      {subText ? <SubTitle numberOfLines={1}>{subText}</SubTitle> : null}
    </MiddleCol>
    <LeftCol>
      {typeof amount === 'number' ? (
        <Amount numberOfLines={1}>{formatAmount(amount)}</Amount>
      ) : null}
      {createdAt ? (
        <Date numberOfLines={1}>{formatShortDate(createdAt)}</Date>
      ) : null}
    </LeftCol>
  </Container>
);

export default TransactionRow;
