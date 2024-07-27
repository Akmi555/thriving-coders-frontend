import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchOneVehicle } from 'src/hooks/vehicleData';

const Vehicle = ({vehicle}) =>{
    const [vehicleData, setVehicleData] = useState({
        vehicle: null,
        isLoading: true,
        isError: false,
      })

    const router = useRouter();
    const {id} = router.query;

    console.log('vehicle id = ' + id) // TODO - удалить

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
    
        fetchData();
    }, []);

    return (
        <>
            <div>
                <p>
                    Vehilce with id: {id}
                </p>
                <p>
                    Vehilce
                </p>
            </div>
        
        </>
    )

}

export default Vehicle