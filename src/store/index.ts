import { configureStore } from '@reduxjs/toolkit';
import expencesReducer from './expensesSlice.ts';

export const store = configureStore({
  reducer: {
    expenses: expencesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
