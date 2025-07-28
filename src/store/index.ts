import { configureStore } from '@reduxjs/toolkit';
import expencesReducer from './expensesSlice.ts';

export const store = configureStore({
  reducer: {
    my: expencesReducer,
  },
});
