// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { Customer } from "interfaces/customer";
// import addNewCustomer from "./addNewCustomer";
// import { addCustomer} from "src/stores/customersSlice";


// export const addDeliveryAddressesAsync = createAsyncThunk(
//     'customers/add/addCustomerAsync',
//     async(newCustomer:Customer, {dispatch}) =>{
//         try {
//             const response = await addNewCustomer(newCustomer);

//             if(response.status === 201 ){
//                 dispatch(addCustomer(newCustomer));
//                 return { success: true, message: 'Customer added successfully!' };
//               } else {
//                 return { success: false, message: 'Failed to add customer to server' };
//               }
//             } catch (error) {
//               return { success: false, message: 'An error occurred while adding customer' };
//             }
//     }
// )