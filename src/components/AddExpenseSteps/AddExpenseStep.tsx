import React, { Fragment, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import z from 'zod';
import { formatAmount } from '../../functions/functions';
import { theme } from '../../theme/theme';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useExpenseWizard } from '../../zustandState/useExpenseWizard';
import ContinueButton from './continueButton/ContinueButton';

const numbers = [
  ['3', '2', '1'],
  ['6', '5', '4'],
  ['9', '8', '7'],
  ['.', '0', '⌫'],
];

type AddExpenseStepProps = {
  onClose: () => void;
  onNext: () => void;
};

const AddExpenseStep: React.FC<AddExpenseStepProps> = ({ onNext }) => {
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
    handleSubmit,
    setValue: setFormValue,
    formState: { errors },
    trigger,
  } = useForm<ExpenseFormType>({
    resolver: zodResolver(expenseSchema),
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
  };

  const handleContinue = handleSubmit(data => {
    setAmount(Number(data.expenseAmount)); // save on Zustand
    onNext(); // moving to next page
  });

  return (
    <Fragment>
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
          <Text style={{ color: 'red', marginTop: 6 }}>
            {errors.expenseAmount.message}
          </Text>
        )}
        <View style={styles.keypad}>
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
        <View style={styles.actions}>
          <ContinueButton
            onPress={async () => {
              const isValid = await trigger('expenseAmount');
              if (isValid) handleContinue();
            }}
            disabled={!value}
          />
        </View>
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  sheetContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 2,
    backgroundColor: 'white',
    borderRadius: 24,
    justifyContent: 'center',
  },
  display: {
    fontSize: 32,
    marginBottom: 14,
    fontWeight: '600',
    color: 'black',
  },
  keypad: {
    width: '90%',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 8,
  },
  key: {
    width: 65,
    height: 65,
    borderRadius: 20,
    backgroundColor: '#f6f6f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    elevation: 3,
  },
  keyText: {
    fontSize: 28,
    color: '#321d63',
    fontWeight: '500',
  },
  actions: {
    flex: 1,
    width: 300,
    justifyContent: 'space-between',
    marginTop: 28,
    // gap: 8,
  },
  // cancelButton: {
  //   flex: 1,
  //   height: 48,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // cancelText: {
  //   fontSize: 18,
  //   fontWeight: 'bold',
  //   letterSpacing: 1,
  // },
});

export default AddExpenseStep;
