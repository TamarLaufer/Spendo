import React from 'react';
import { useExpenseWizard } from '../../../zustandState/useExpenseWizard';
import { STRINGS } from '../../../strings/hebrew';
import { Container, StyledInput } from './AddNoteStep.styles';
import { theme } from '../../../theme/theme';

const AddNoteForExpense = () => {
  const setNote = useExpenseWizard(state => state.setNote);
  const note = useExpenseWizard(state => state.note);

  const handleNoteInput = (value: string) => {
    setNote(value);
  };

  return (
    <Container>
      <StyledInput
        placeholder={STRINGS.ADD_NOTE_PLACEHOLDER}
        value={note}
        onChangeText={text => handleNoteInput(text)}
        multiline
        textAlignVertical="top"
        placeholderTextColor={theme.color.placeholder}
      />
    </Container>
  );
};

export default AddNoteForExpense;
