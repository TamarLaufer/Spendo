import React from 'react';
import {
  ActionButtonText,
  ActionContainer,
  Elements,
} from './ItemActions.style';
import { STRINGS } from '../../strings/hebrew';
import { theme } from '../../theme/theme';

type ItemActionsPropsType = {
  onDeletePress: () => void;
  onEditPress: () => void;
};

const ItemActions = ({ onDeletePress, onEditPress }: ItemActionsPropsType) => {
  const handleDeletePress = () => {
    onDeletePress();
  };
  const handleEditPress = () => {
    onEditPress();
  };
  return (
    <Elements>
      <ActionContainer
        backgroundColor={theme.color.white}
        borderColor={theme.color.shadowColor}
        onPress={handleDeletePress}
      >
        <ActionButtonText textColor={theme.color.shadowColor}>
          {STRINGS.DELETE}
        </ActionButtonText>
      </ActionContainer>
      <ActionContainer
        backgroundColor={theme.color.lightBlue}
        borderColor={theme.color.lightBlue}
        onPress={handleEditPress}
      >
        <ActionButtonText textColor={theme.color.white}>
          {STRINGS.EDIT}
        </ActionButtonText>
      </ActionContainer>
    </Elements>
  );
};

export default ItemActions;
