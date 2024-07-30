import axios from 'axios';

const deleteVehicle = async (vehicleData) => {
  try {
    const response = await axios.delete('http://localhost:4567/vehicles/{id}/delete', vehicleData);
    console.log('Vehicle deleted successfully:', response.data);
    return response;
  } catch (error) {
    console.error('Error deleting vehicle:');
    throw error.response.data;
  }
};

export default deleteVehicle;