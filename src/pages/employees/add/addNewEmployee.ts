import axios from 'axios';

const addNewEmployee = async (employeeData) => {
  try {
    const response = await axios.post('http://localhost:4567/employees', employeeData);
    console.log('Employee added successfully:', response.data);
    return response;
  } catch (error) {
    console.error('Error adding employee:');
    throw error.response.data;
  }
};

export default addNewEmployee;
