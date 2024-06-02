import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Transaction } from "../../types/types";

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
