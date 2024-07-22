import axios from 'axios';

const addNewVehicle = async (vehicleData) => {
  try {
    const response = await axios.post('http://localhost:4567/vehicles', vehicleData);
    console.log('Vehicle added successfully:', response.data);
    return response;
  } catch (error) {
    console.error('Error adding vehicle:');
    throw error.response.data;
  }
};

export default addNewVehicle;