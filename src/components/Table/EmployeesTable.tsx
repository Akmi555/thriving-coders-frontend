import { useEffect, useMemo, useState } from "react";
import { fetchAllEmployees } from "../../hooks/employeesData";
import { mdiClose, mdiSort, mdiSortAlphabeticalVariant } from '@mdi/js';

import { Employee } from "../../interfaces/employee";
import UserAvatar from "../UserAvatar";
import Button from '../Button'
import Buttons from '../Buttons'
import Icon from "../Icon";


const EmployeesTable = () => {
    const [employeesData, setEmployeesData] = useState({
        employees: [],
        isLoading: true,
        isError: false,
    });

    const [sortConfig, setSortConfig] = useState({ field: null, direction: 'ascending' });

    const perPage = 5;

    const [currentPage, setCurrentPage] = useState(0);

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

    const handleSort = (field: string) => {

        console.log(field);

        const direction = sortConfig.field === field && sortConfig.direction === 'ascending' ? 'descending' : 'ascending';
        setSortConfig({ field, direction });
    };

    const sortedEmployees = useMemo(() => {
        if (!employeesData.employees || employeesData.employees.length === 0) return [];

        let sortedData = [...employeesData.employees];

        if (sortConfig.field) {
            sortedData = [...employeesData.employees].sort((a, b) => {
                const aValue = a[sortConfig.field];
                const bValue = b[sortConfig.field];
                if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
                return 0;
            });
        }

        return sortedData;
    }, [employeesData.employees, sortConfig]);

    const employeesPaginated = sortedEmployees.slice(perPage * currentPage, perPage * (currentPage + 1));

    const numPages = Math.ceil(sortedEmployees.length / perPage);

    const pagesList = [];

    for (let i = 0; i < numPages; i++) {
        pagesList.push(i)
    }

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th />
                        <th>Name</th>
                        <th style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>Position</span>
                            <Icon path={mdiSort} onClick={() => handleSort('position')} />
                        </th>
                        <th>Hourly rate</th>
                        <th>Contact</th>
                    </tr>
                </thead>
                <tbody>
                    {employeesPaginated.map((employee: Employee) => (
                        <tr key={employee.employeeId}>
                            <td className="border-b-0 lg:w-6 before:hidden">
                                <UserAvatar username={employee.firstName} className="w-24 h-24 mx-auto lg:w-6 lg:h-6" />
                            </td>
                            <td data-label="Name">{employee.firstName} {employee.lastName}</td>
                            <td>{employee.position}</td>
                            <td>{employee.hourlyRate}</td>
                            <td>{employee.contactInfo}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
                <div className="flex flex-col md:flex-row items-center justify-between py-3 md:py-0">
                    <Buttons>
                        {pagesList.map((page) => (
                            <Button
                                key={page}
                                active={page === currentPage}
                                label={page + 1}
                                color={page === currentPage ? 'lightDark' : 'whiteDark'}
                                small
                                onClick={() => setCurrentPage(page)}
                            />
                        ))}
                    </Buttons>
                    <small className="mt-6 md:mt-0">
                        Page {currentPage + 1} of {numPages}
                    </small>
                </div>
            </div>
        </>
    );
}

export default EmployeesTable;