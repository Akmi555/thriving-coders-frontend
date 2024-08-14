import axios from 'axios';

const editVehicleAsync = async (vehicleData) => {
  try {
    const response = await axios.put('http://localhost:4567/vehicles', vehicleData);
    console.log('Vehicle updated successfully:', response.data);
    return response;
  } catch (error) {
    console.error('Error updating vehicle:');
    throw error.response.data;
  }
};

export default editVehicleAsync;