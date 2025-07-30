import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ExpensesType } from './types';

type expensesStateType = {
  expensesList: ExpensesType[];
};

const initialState: expensesStateType = {
  expensesList: [],
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState: initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<ExpensesType>) => {
      state.expensesList.push(action.payload);
    },
    deleteExpense: (state, action: PayloadAction<ExpensesType>) => {
      state.expensesList = state.expensesList.filter(
        expense => expense.id !== action.payload.id,
      );
    },
    editExpense: (state, action: PayloadAction<ExpensesType>) => {
      state.expensesList = state.expensesList.filter(
        expense => expense.id !== action.payload.id,
      );
    },
  },
});

export const { addExpense } = expensesSlice.actions;
export default expensesSlice.reducer;
