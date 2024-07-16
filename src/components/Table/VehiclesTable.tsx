import { mdiSort } from '@mdi/js'
import Button from 'components/Button'
import Buttons from 'components/Buttons'
import Icon from 'components/Icon'
import { Vehicle } from 'interfaces/vehicles'
import React, { useEffect, useMemo, useState } from 'react'
import { fetchAllVehicles } from 'src/hooks/vehiclesData'
import { useStyleRegistry } from 'styled-jsx'

const VehiclesTable = () => {
  const [vehiclesData, setVehiclesData] = useState({
    vehicles: [],
    isLoading: true,
    isError: false,
  })

  const [sortConfig, setSortConfig] = useState({ field: null, direction: 'ascending' })
  const perPage = 5;
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const result = await fetchAllVehicles();
            console.log(result);
            setVehiclesData({
                vehicles: result.vehicles,
                isLoading: false,
                isError: result.isError,
            });
        } catch (error) {
            console.error('Error fetching data:', error);
            setVehiclesData({
                vehicles: [],
                isLoading: false,
                isError: true,
            });
        }
    };

    fetchData();
}, []);

const handleSort = (field: string) => {//TODO можно вынести?

    console.log(field);

    const direction = sortConfig.field === field && sortConfig.direction === 'ascending' ? 'descending' : 'ascending';
    setSortConfig({ field, direction });
};

const sortedVehicles = useMemo(() => {
    if (!vehiclesData.vehicles || vehiclesData.vehicles.length === 0) return [];

    let sortedData = [...vehiclesData.vehicles];

    if (sortConfig.field) {
        sortedData = [...vehiclesData.vehicles].sort((a, b) => {
            const aValue = a[sortConfig.field];
            const bValue = b[sortConfig.field];
            if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
            return 0;
        });
    }

    return sortedData;
}, [vehiclesData.vehicles, sortConfig]);

const vehiclesPaginated = sortedVehicles.slice(perPage * currentPage, perPage * (currentPage + 1));
const numPages = Math.ceil(sortedVehicles.length / perPage); 
const pagesList = [];

for (let i = 0; i < numPages; i++) {
    pagesList.push(i)
}


  return (
    <>
    <table>
        <thead>
            <tr>
                <th>Model</th>
                <th style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Carrying</span>
                    <Icon path={mdiSort} onClick={() => handleSort('weightCapacity')} />
                </th>
                <th>Fuel</th>
                <th>km with Cargo</th>
                <th>km without Cargo</th>
                <th>Fuel with Cargo</th>
                <th>Area</th>
                <th>Cost of delivery</th>

            </tr>
        </thead>
        <tbody>
            {vehiclesPaginated.map((vehicle: Vehicle) => (
                <tr key={vehicle.vehicleId}>
                    <td>{vehicle.model}</td>
                    <td>{vehicle.weightCapacity}</td>
                    <td>{vehicle.fuelType}</td>
                    <td>{vehicle.rangeWithCargo}</td>
                    <td>{vehicle.rangeWithOutCargo}</td>
                    <td>{vehicle.fuelConsumptionWithCargo}</td>
                    <td>{vehicle.usefulArea}</td>
                    <td>{vehicle.costOfDelivery}</td>
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
export default VehiclesTable
