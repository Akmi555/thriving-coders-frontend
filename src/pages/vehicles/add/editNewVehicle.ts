import axios from 'axios';

const editNewVehicle = async (vehicleData) => {
  try {
    const response = await axios.put('http://localhost:4567/vehicles/id', vehicleData);
    console.log('Vehicle added successfully:', response.data);
    return response;
  } catch (error) {
    console.error('Error adding vehicle:');
    throw error.response.data;
  }
};

export default editNewVehicle;