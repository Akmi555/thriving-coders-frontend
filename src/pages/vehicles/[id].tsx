import Button from 'components/Button';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchOneVehicle } from 'src/hooks/vehicleData';

const Vehicle = () => {
    const [vehicleData, setVehicleData] = useState({
        vehicle: null,
        isLoading: true,
        isError: false,
    });

    const router = useRouter();
    const { id } = router.query;

    console.log('vehicle id = ' + id); // TODO - удалить

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchOneVehicle(id);
                console.log(result);
                setVehicleData({
                    vehicle: result.vehicle,
                    isLoading: false,
                    isError: result.isError,
                });
            } catch (error) {
                console.error('Error fetching data:', error);
                setVehicleData({
                    vehicle: null,
                    isLoading: false,
                    isError: true,
                });
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    if (vehicleData.isLoading) {
        return <div>Loading...</div>;
    }

    if (vehicleData.isError) {
        return <div>Error loading vehicle data</div>;
    }

    return (
        <>
            <div style={{ textAlign: 'left', margin: '0 auto', maxWidth: '600px' }}>
            <p style={{ fontSize: '24px',  fontWeight: 'bold' }}>
                    Vehicle
                </p>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
                    Vehicle with id: {id}</p>
                <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
                    Model: {vehicleData.vehicle ? vehicleData.vehicle.model : 'Unknown'}
                </p>
                <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
                    Cost of Delivery: {vehicleData.vehicle ? vehicleData.vehicle.costOfDelivery+" €" : 'Unknown'}
                </p>
                <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
                    Status: {vehicleData.vehicle ? vehicleData.vehicle.status : 'Unknown'}
                </p>
               
            </div>
            <Button>Delete</Button>
        </>
    
    );
};

export default Vehicle;
