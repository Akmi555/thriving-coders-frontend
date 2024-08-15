import axios from 'axios';

const deleteCustomerAsync = async (id) => {

  // TODO: обработать все статусы ответа 200, 404, 400, 500

  try {
    const response = await axios.delete('http://localhost:4567/customers/' + id);
    console.log('Customer deleted successfully:', response.data);
    return response;
  } catch (error) {
    console.error('Error deleting customer:');
    // throw error.response.data;
    console.log(error)
  }
};

export default deleteCustomerAsync;