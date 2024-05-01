import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Employee } from 'interfaces/employee'


/// NOT IN USE !!!

interface EmployeesState {
    employees: Employee[];
    loading: boolean;
    error: string | null;
}

const initialState: EmployeesState = {
    employees: [],
    loading: false,
    error: null,
};

export const employeesSlice = createSlice({
    name: 'EMPLOYEES',
    initialState,
    reducers: {
        fetchEmployeesStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchEmployeesSuccess: (state, action: PayloadAction<Employee[]>) => {
            state.loading = false;
            state.employees = action.payload;
        },
        fetchEmployeesFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        addEmployee: (state, action: PayloadAction<Employee>) => {
            state.employees.push(action.payload);
        },
    }
});

// Action creators are generated for each case reducer function
export const {
    fetchEmployeesStart,
    fetchEmployeesSuccess,
    fetchEmployeesFailure,
    addEmployee,
  } = employeesSlice.actions;
  
  export default employeesSlice.reducer;