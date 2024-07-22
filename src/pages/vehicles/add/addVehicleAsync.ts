import { createAsyncThunk } from "@reduxjs/toolkit";
import { Vehicle } from "interfaces/vehicles";
import addNewVehicle from "./addNewVehicle";
import { addVehicle } from "src/stores/vehiclesSlice";


/// NOT IN USE !!!
export const addVehicleAsync = createAsyncThunk(
    'vehicless/add/addVehicleAsync',
    async(newVehicle: Vehicle, {dispatch}) =>{
        try {
            const response = await addNewVehicle(newVehicle);

            if(response.status === 201 ){
                dispatch(addVehicle(newVehicle));
                return { success: true, message: 'Vehicle added successfully!' };
              } else {
                return { success: false, message: 'Failed to add vehicle to server' };
              }
            } catch (error) {
              return { success: false, message: 'An error occurred while adding employee' };
            }
    }
)