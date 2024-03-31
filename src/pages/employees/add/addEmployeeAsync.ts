import { createAsyncThunk } from "@reduxjs/toolkit";
import { Employee } from "interfaces/employee";
import addNewEmployee from "./addNewEmployee";
import { addEmployee } from "src/stores/employeesSlice";


/// NOT IN USE !!!
export const addEmployeeAsync = createAsyncThunk(
    'employees/add/addEmployeeAsync',
    async(newEmployee:Employee, {dispatch}) =>{
        try {
            const response = await addNewEmployee(newEmployee);

            if(response.status === 201 ){
                dispatch(addEmployee(newEmployee));
                return { success: true, message: 'Employee added successfully!' };
              } else {
                return { success: false, message: 'Failed to add employee to server' };
              }
            } catch (error) {
              return { success: false, message: 'An error occurred while adding employee' };
            }
    }
)