import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Transaction } from "../../types/types";

interface TransactionsState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}

const initialState: TransactionsState = {
  transactions: [],
  loading: false,
  error: null,
};

// Define the async thunk for fetching transactions
export const fetchTransactions = createAsyncThunk<Transaction[]>(
  "transactions/fetchTransactions",
  async () => {
    try {
      const response = await axios.get<Transaction[]>(
        import.meta.env.VITE_REACT_APP_TRANSACTION_LIST_API
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch transactions");
    }
  }
);

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
    });
    builder.addCase(fetchTransactions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch transactions';
    });
  },
});

export default transactionsSlice.reducer;