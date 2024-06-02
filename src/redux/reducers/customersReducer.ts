// customersReducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Customer } from "../../types/types";
import { fetchCustomers } from '../actions/customersActions';

interface CustomersState {
  customers: Customer[];
  filteredCustomers: Customer[];
  loading: boolean;
  error: string | null;
}

const initialState: CustomersState = {
  customers: [],
  filteredCustomers: [],
  loading: false,
  error: null,
};

export const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    setCustomers: (state, action: PayloadAction<Customer[]>) => {
      state.customers = action.payload;
      state.filteredCustomers = action.payload;
    },
    addCustomer: (state, action: PayloadAction<Customer>) => {
      state.customers.push(action.payload);
      state.filteredCustomers.push(action.payload);
    },
    deleteCustomer: (state, action: PayloadAction<string>) => {
      state.customers = state.customers.filter(customer => customer.CustomerID !== action.payload);
      state.filteredCustomers = state.filteredCustomers.filter(customer => customer.CustomerID !== action.payload);
    },
    filterCustomers: (state, action: PayloadAction<string>) => {
      state.filteredCustomers = state.customers.filter(c =>
        c.Name.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchCustomers.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCustomers.fulfilled, (state, action: PayloadAction<Customer[]>) => {
      state.customers = action.payload;
      state.filteredCustomers = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchCustomers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch customers';
    });
  },
});

export const { setCustomers, addCustomer, deleteCustomer, filterCustomers } = customersSlice.actions;

export default customersSlice.reducer;