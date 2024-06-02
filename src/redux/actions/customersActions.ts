import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Customer } from "../../types/types";

export const fetchCustomers = createAsyncThunk<Customer[]>(
  "customers/fetchCustomers",
  async () => {
    try {
      const response = await axios.get<Customer[]>(
        import.meta.env.VITE_REACT_APP_CUSTOMER_LIST_API
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch customers");
    }
  }
);
