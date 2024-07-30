import axios from 'axios';

const deleteVehicleAsync = async (id) => {

  // TODO: обработать все статусы ответа 200, 404, 400, 500

  try {
    const response = await axios.delete('http://localhost:4567/vehicles/' + id);
    console.log('Vehicle deleted successfully:', response.data);
    return response;
  } catch (error) {
    console.error('Error deleting vehicle:');
    // throw error.response.data;
    console.log(error)
  }
};

export default deleteVehicleAsync;