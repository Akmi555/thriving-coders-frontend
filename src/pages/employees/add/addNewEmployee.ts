import axios from 'axios';

const addNewEmployee = async (employeeData) => {
  try {
    const response = await axios.post('https://api.thriving-coders.com/employees', employeeData);
    console.log('Employee added successfully:', response.data);
    return response;
  } catch (error) {
    console.error('Error adding employee:');
    throw error.response.data;
  }
};

export default addNewEmployee;
