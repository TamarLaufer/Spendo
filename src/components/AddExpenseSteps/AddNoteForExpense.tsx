import { StyleSheet, TextInput, View } from 'react-native';
import React from 'react';
import { useExpenseWizard } from '../../zustandState/useExpenseWizard';

const AddNoteForExpense = () => {
  const setNote = useExpenseWizard(state => state.setNote);
  const note = useExpenseWizard(state => state.note);

  const handleNoteInput = (value: string) => {
    setNote(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="תרצה/י להוסיף פירוט להוצאה?"
          value={note}
          onChangeText={e => handleNoteInput(e)}
          multiline
          textAlignVertical="top"
          style={styles.input}
        />
      </View>
    </View>
  );
};

export default AddNoteForExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    marginHorizontal: 25,
  },
  input: {
    minHeight: 190,
    padding: 12,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
});
