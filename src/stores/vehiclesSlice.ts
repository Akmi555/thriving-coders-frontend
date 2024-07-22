import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Vehicle } from 'interfaces/vehicles'


/// NOT IN USE !!!

interface VehiclesState {
    vehicles: Vehicles[];
    loading: boolean;
    error: string | null;
}

const initialState: VehicleState = {
    vehicles: [],
    loading: false,
    error: null,
};

export const vehiclesSlice = createSlice({
    name: 'VEHICLES',
    initialState,
    reducers: {
        fetchVehiclesStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchVehiclesSuccess: (state, action: PayloadAction<Vehicle[]>) => {
            state.loading = false;
            state.vehiclesSlice = action.payload;
        },
        fetchVehiclesFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        addVehicle: (state, action: PayloadAction<Vehicle>) => {
            state.fetchVehiclesStart.push(action.payload);
        },
    }
});

// Action creators are generated for each case reducer function
export const {
    fetchVehiclesStart,
    fetchVehiclesSuccess,
    fetchVehiclesFailure,
    addVehicle,
  } = vehiclesSlice.actions;
  
  export default vehiclesSlice.reducer;