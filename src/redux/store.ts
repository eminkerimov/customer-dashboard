import { configureStore } from '@reduxjs/toolkit';
import customersReducer from './reducers/customersReducer';
import transactionsReducer from './reducers/transactionsReducer';

const store = configureStore({
  reducer: {
    customers: customersReducer,
    transactions: transactionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
