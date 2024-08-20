import { mdiClose, mdiSort, mdiSortAlphabeticalVariant } from '@mdi/js';
import Button from "components/Button";
import Buttons from "components/Buttons";
import Icon from "components/Icon";
import UserAvatar from "components/UserAvatar";
import { Customer } from "interfaces/customer";
import { useEffect, useMemo, useState } from "react";
import customer from "src/pages/customers/add";
import { fetchAllCustomers } from "../../hooks/customersData";
import Link from 'next/link';
import { CustomerDeliveryAddress } from 'interfaces/customer_deliveryaddress';


const CustomerDeliveryAddressesTable = () => {
    const [customerDeliveryAddressesData, setcustomerDeliveryAddressesData] = useState({
        deliveryAddresses: [],
        isLoading: true,
        isError: false,
    })
    const [sortConfig, setSortConfig] = useState({ field: null, direction: 'ascending' });

    const perPage = 5;

    const [currentPage, setCurrentPage] = useState(0);
    
    const customerDeliveryAddressesPaginated : CustomerDeliveryAddress[] = [{
        
            "deliveryAddressId": 9,
            "address": "Bonner Str. 154, Efflerscheid",
            "postalCode": "03575",
            "country": "DE",
            "contactPerson": "Anna Baseda",

        },
        {
            "deliveryAddressId": 10,
            "address": "Auf'm Berg 766, Gradzkiheim",
            "postalCode": "21993",
            "country": "DE",
            "contactPerson": "Hr. Laurenz Tremmel",
        },
        {
            "deliveryAddressId": 6,
            "address": "In Holzhausen 67, Groß Anny",
            "postalCode": "21996",
            "country": "DE",
            "contactPerson": "Jolina Storp",
            
        },
        {
            "deliveryAddressId": 7,
            "address": "Speestr. 69b, Klein Janek",
            "postalCode": "82698",
            "country": "DE",
            "contactPerson": "Jamal Pfersich",
          
        },
        {
            "deliveryAddressId": 13,
            "address": "Luisenstr. 0, Alt Niafeld",
            "postalCode": "47585",
            "country": "DE",
            "contactPerson": "Victoria Schimmer",
        },
        {
            "deliveryAddressId": 14,
            "address": "Fürstenbergstr. 6, Groß Joostheim",
            "postalCode": "38377",
            "country": "DE",
            "contactPerson": "Carla vom Ripken",
        }] ;

    useEffect(() => {
        const fetchData = async () => {
            // try {
            //     const result = await fetchAllCustomers();
            //     console.log(result);
            //     setCustomersData({
            //         customers: result.customers,
            //         isLoading: false,
            //         isError: result.isError,
            //     });
            // } catch (error) {
            //     console.error('Error fetching data:', error);
            //     setCustomersData({
            //         customers: [],
            //         isLoading: false,
            //         isError: true,
            //     });
            // }
        };

        fetchData();
    }, []);

    const handleSort = (field: string) => {

        console.log(field);

        const direction = sortConfig.field === field && sortConfig.direction === 'ascending' ? 'descending' : 'ascending';
        setSortConfig({ field, direction });
    };

    const sortedDeliveryAddresses = useMemo(() => {
        if (!customerDeliveryAddressesData.deliveryAddresses || customerDeliveryAddressesData.deliveryAddresses.length === 0) return [];

        let sortedData = [...customerDeliveryAddressesData.deliveryAddresses];

        if (sortConfig.field) {
        sortedData = [...customerDeliveryAddressesData.deliveryAddresses].sort((a, b) => {
                 const aValue = a[sortConfig.field];
                const bValue = b[sortConfig.field];
                 if (aValue < bValue) return sortConfig.direction === 'acsending' ? -1 : 1;
                 if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
                 return 0;
         });
        }

       return sortedData;
    }, [customerDeliveryAddressesData.deliveryAddresses, sortConfig]);

    // const customersPaginated = sortedCustomers.slice(perPage * currentPage, perPage * (currentPage + 1));

    const numPages = Math.ceil(customerDeliveryAddressesData.deliveryAddresses.length / perPage);

     const pageList = [];

    for (let i = 0; i < numPages; i++) {
        pageList.push(i)
     }
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Address</th>

                        <th>Contact person</th>
                        {/*<th style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>Last name</span>
                            <Icon path={mdiSort} onClick={() => handleSort('position')} />
                        </th>*/}
                        <th>Country</th>
                        <th>Postal code</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {customerDeliveryAddressesPaginated.map((deliveryaddress: CustomerDeliveryAddress) => (
                        <tr key={deliveryaddress.deliveryAddressId}>
                            <td>{deliveryaddress.address}
                                {/* <Link href={`/customers/${customer.customerId}`}>
                                    {customer.taxIdentificationNumber}
                                </Link> */}
                            </td>
                            <td>{deliveryaddress.contactPerson}</td>
                            <td>{deliveryaddress.country}</td>
                            <td>{deliveryaddress.postalCode}</td>
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
export default CustomerDeliveryAddressesTable;

