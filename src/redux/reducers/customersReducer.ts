import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Customer, CustomersState } from "../../types/types";
import { fetchCustomers } from '../actions/customersActions';
import { toast } from 'react-toastify';

const initialState: CustomersState = {
  customers: [],
  filteredCustomers: [],
  loading: false,
  error: null,
  logs: [],
};

export const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    setCustomers: (state, action: PayloadAction<Customer[]>) => {
      state.customers = action.payload;
      state.filteredCustomers = action.payload;
      state.logs.push({ message: 'Customers set', timestamp: Date.now() });
    },
    addCustomer: (state, action: PayloadAction<Customer>) => {
      state.customers.push(action.payload);
      state.filteredCustomers.push(action.payload);
      toast.success('Customer added successfully');
      state.logs.push({ message: 'Customer added', timestamp: Date.now() });
    },
    deleteCustomer: (state, action: PayloadAction<string>) => {
      state.customers = state.customers.filter(customer => customer.CustomerID !== action.payload);
      state.filteredCustomers = state.filteredCustomers.filter(customer => customer.CustomerID !== action.payload);
      toast.success('Customer deleted successfully');
      state.logs.push({ message: 'Customer deleted', timestamp: Date.now() });
    },
    filterCustomers: (state, action: PayloadAction<string>) => {
      state.filteredCustomers = state.customers.filter(c =>
        c.Name.toLowerCase().includes(action.payload.toLowerCase())
      );
      state.logs.push({ message: 'Customers filtered', timestamp: Date.now()});
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
      state.logs.push({ message: 'Customers fetched', timestamp: Date.now() });
    });
    builder.addCase(fetchCustomers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch customers';
      state.logs.push({ message: 'Failed to fetch customers', timestamp: Date.now() });
    });
  },
});

export const { setCustomers, addCustomer, deleteCustomer, filterCustomers } = customersSlice.actions;

export default customersSlice.reducer;