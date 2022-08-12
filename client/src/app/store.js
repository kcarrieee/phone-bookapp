import { configureStore } from '@reduxjs/toolkit';
import dataReducer from '../features/phones/dataSlice';

export const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});
