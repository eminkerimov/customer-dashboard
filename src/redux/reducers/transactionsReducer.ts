import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import { Transaction, TransactionsState } from "../../types/types";
import { fetchTransactions } from '../actions/transactionsActions';

const initialState: TransactionsState = {
  transactions: [],
  loading: false,
  error: null,
  logs:[]
};

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTransactions.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTransactions.fulfilled, (state, action: PayloadAction<Transaction[]>) => {
      state.transactions = action.payload;
      state.loading = false;
      state.logs.push({ message: 'Transactions fetched', timestamp: Date.now() })
    });
    builder.addCase(fetchTransactions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch transactions';
    });
  },
});

export default transactionsSlice.reducer;