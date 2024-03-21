import { useEffect, useState } from "react";
import { fetchAllEmployees } from "../../hooks/employeesData";


const EmployeesTable = () => {
    const [employeesData, setEmployeesData] = useState({
        employees: [],
        isLoading: true,
        isError: false,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchAllEmployees();
                console.log(result);
                setEmployeesData({
                    employees: result.employees,
                    isLoading: false,
                    isError: result.isError,
                });
            } catch (error) {
                console.error('Error fetching data:', error);
                setEmployeesData({
                    employees: [],
                    isLoading: false,
                    isError: true,
                });
            }
        };

        fetchData();
    }, []);

    return (
        <>
            Employees Table here
        </>
    );
}

export default EmployeesTable;