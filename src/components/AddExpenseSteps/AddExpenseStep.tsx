import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import { z } from 'zod';
import { formatAmount } from '../../functions/functions';
import { theme } from '../../theme/theme';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useExpenseWizard } from '../../zustandState/useExpenseWizard';

const numbers = [
  ['3', '2', '1'],
  ['6', '5', '4'],
  ['9', '8', '7'],
  ['.', '0', '⌫'],
];

const AddExpenseStep = () => {
  const [value, setValue] = useState('');
  const setAmount = useExpenseWizard(state => state.setAmount);

  const expenseSchema = z.object({
    expenseAmount: z
      .string()
      .min(1, 'סכום חובה')
      .nonempty('סכום חובה')
      .refine(val => Number(val) > 0, 'הסכום חייב להיות גדול מאפס'),
  });

  type ExpenseFormType = z.infer<typeof expenseSchema>;

  const {
    setValue: setFormValue,
    formState: { errors },
    trigger,
  } = useForm<ExpenseFormType>({
    resolver: zodResolver(expenseSchema),
    mode: 'onChange',
  });

  const handlePress = (num: string) => {
    let newValue = value;
    if (num === '⌫') {
      newValue = value.slice(0, -1);
    } else if (num === '.' && value.includes('.')) {
      return;
    } else {
      newValue = value + num;
    }

    setValue(newValue);
    setFormValue('expenseAmount', newValue, { shouldValidate: true });
    trigger('expenseAmount');

    // Update the store if valid
    if (newValue && Number(newValue) > 0) {
      setAmount(Number(newValue));
    } else {
      setAmount(0);
    }
  };

  useEffect(() => {
    if (!value) {
      setAmount(0);
    }
  }, [value, setAmount]);

  return (
    <View style={styles.sheetContainer}>
      <TextInput
        value={value === '' ? '' : formatAmount(value)}
        editable={false}
        style={styles.display}
        placeholder="סכום ההוצאה"
        keyboardType="numeric"
        placeholderTextColor={theme.color.placeholder}
      />
      {errors.expenseAmount && (
        <Text style={styles.errorText}>{errors.expenseAmount.message}</Text>
      )}
      {numbers.map((row, i) => (
        <View style={styles.row} key={i}>
          {row.map(num => (
            <TouchableOpacity
              key={num}
              style={styles.key}
              onPress={() => handlePress(num)}
            >
              <Text style={styles.keyText}>{num}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  sheetContainer: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 24,
    justifyContent: 'center',
  },
  display: {
    fontSize: 32,
    marginBottom: 14,
    fontWeight: '600',
    color: 'black',
  },
  errorText: {
    color: 'red',
    marginTop: 6,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 8,
  },
  key: {
    width: 68,
    height: 68,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    elevation: 2,
  },
  keyText: {
    fontSize: 28,
    color: '#321d63',
    fontWeight: '500',
  },
});

export default AddExpenseStep;
