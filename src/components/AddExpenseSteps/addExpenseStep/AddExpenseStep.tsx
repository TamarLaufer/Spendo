import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { formatAmount } from '../../../utils/formatting';
import { theme } from '../../../theme/theme';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useExpenseWizard } from '../../../zustandState/useExpenseWizard';
import { NUMBERS } from '../../../config/consts';
import { STRINGS } from '../../../strings/hebrew';
import {
  Display,
  ErrorText,
  KeyButton,
  KeyText,
  Row,
  SheetContainer,
} from './AddExpenseStep.styles';

const AddExpenseStep = () => {
  const [value, setValue] = useState('');
  const setAmount = useExpenseWizard(state => state.setAmount);

  const expenseSchema = z.object({
    expenseAmount: z
      .string()
      .min(1, STRINGS.EXPENSE_AMOUNT_REQUIRED)
      .nonempty(STRINGS.EXPENSE_AMOUNT_REQUIRED)
      .refine(
        val => Number(val) > 0,
        STRINGS.EXPENSE_AMOUNT_REQUIRED_GREATER_THAN_ZERO,
      ),
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
    <SheetContainer>
      <Display
        value={value === '' ? '' : formatAmount(value)}
        editable={false}
        placeholder={STRINGS.EXPENSE_AMOUNT_PLACEHOLDER}
        keyboardType="numeric"
        placeholderTextColor={theme.color.placeholder}
      />
      {errors.expenseAmount && (
        <ErrorText>{errors.expenseAmount.message}</ErrorText>
      )}
      {NUMBERS.map((row, i) => (
        <Row key={i}>
          {row.map(num => (
            <KeyButton key={num} onPress={() => handlePress(num)}>
              <KeyText>{num}</KeyText>
            </KeyButton>
          ))}
        </Row>
      ))}
    </SheetContainer>
  );
};

export default AddExpenseStep;
