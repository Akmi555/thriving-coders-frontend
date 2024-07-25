import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Customer } from 'interfaces/customer'


/// NOT IN USE !!!

interface CustomersState {
    customers: Customer[];
    loading: boolean;
    error: string | null;
}

const initialState: CustomersState = {
    customers: [],
    loading: false,
    error: null,
};

export const customersSlice = createSlice({
    name: 'CUSTOMERS',
    initialState,
    reducers: {
        fetchCustomersStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchCustomersSuccess: (state, action: PayloadAction<Customer[]>) => {
            state.loading = false;
            state.customers = action.payload;
        },
        fetchCustomersFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        addCustomer: (state, action: PayloadAction<Customer>) => {
            state.customers.push(action.payload);
        },
    }
});

// Action creators are generated for each case reducer function
export const {
    fetchCustomersStart,
    fetchCustomersSuccess,
    fetchCustomersFailure,
    addCustomer,
  } = customersSlice.actions;
  
  export default customersSlice.reducer;