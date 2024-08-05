import { mdiClose, mdiSort, mdiSortAlphabeticalVariant } from '@mdi/js';
import Button from "components/Button";
import Buttons from "components/Buttons";
import Icon from "components/Icon";
import UserAvatar from "components/UserAvatar";
import { Customer } from "interfaces/customer";
import { useEffect, useMemo, useState } from "react";
import customer from "src/pages/customers/add/customer";
import {fetchAllCustomers} from "../../hooks/customersData";


const CustomersTable  = () => {
    const [customersData, setCustomersData] = useState({
        customers:[],
        isLoading: true,
        isError: false,
    })  
    const [sortConfig, setSortConfig] = useState({ field: null, direction: 'ascending'});
    
    const perPage = 5;

    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchAllCustomers();
                console.log(result);
                setCustomersData({
                    customers: result.customers,
                    isLoading: false,
                    isError: result.isError,
                });
           } catch (error) {
                console.error('Error fetching data:', error);
                setCustomersData({
                    customers: [],
                    isLoading: false,
                    isError: true,
                });
           }
        };

        fetchData();
    },[]);

    const handleSort = (field: string) =>{

        console.log(field);

        const direction = sortConfig.field === field && sortConfig.direction === 'ascending' ? 'descending' : 'ascending';
        setSortConfig({ field, direction});
    };

    const sortedCustomers = useMemo(() => {
        if (!customersData.customers || customersData.customers.length === 0) return [];

        let sortedData = [...customersData.customers];

        if (sortConfig.field) {
            sortedData = [...customersData.customers].sort((a, b) => {
                const aValue = a[sortConfig.field];
                const bValue = b[sortConfig.field];
                if (aValue < bValue) return sortConfig.direction === 'acsending' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
                return 0;
            });   
        }

        return sortedData;
    }, [customersData.customers, sortConfig]);

    const customersPaginated = sortedCustomers.slice(perPage * currentPage, perPage * (currentPage + 1));
    
    const numPages = Math.ceil(sortedCustomers.length / perPage);

    const pageList = [];

    for (let i = 0; i < numPages; i++) {
        pageList.push(i)
    }

    return (  
        <> 
            <table>
                <thead>
                    <tr>
                        <th />
                        <th>Customer name</th>
                        {/*<th style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>Last name</span>
                            <Icon path={mdiSort} onClick={() => handleSort('position')} />
                        </th>*/}
                        <th>Postal code</th>
                        <th>Address</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {customersPaginated.map((customer: Customer) => (
                        <tr key={customer.customerId}>
                            <td className="border-b-0 lg:w-6 before:hidden">
                                <UserAvatar username={customer.postalCode} className="w-24 h-24 mx-auto lg:w-6 lg:h-6" />
                            </td>
                            <td data-label="CompanyName">{customer.companyName}</td>
                            <td>{customer.postalCode}</td>
                            <td>{customer.legalAddress}</td>
                            <td>{customer.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
                <div className="flex flex-col md:flex-row items-center justify-between py-3 md:py-0">
                    <Buttons>
                        {pageList.map((page) => (
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
export default CustomersTable;

 