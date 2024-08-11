import { mdiCar } from '@mdi/js'
import Button from 'components/Button'
import SectionMain from 'components/Section/Main'
import SectionTitleLineWithButton from 'components/Section/TitleLineWithButton'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getPageTitle } from 'src/config'
import { fetchOneVehicle } from 'src/hooks/vehicleData'

const EditVehicle = () => {
  const [vehicleData, setVehicleData] = useState({
    vehicle: null,
    isLoading: true,
    isError: false,
  })
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

  const vehicle = vehicleData.vehicle;

  return (
    
    <>
      <Head>
        <title>{getPageTitle('Edited vehicle')}</title>
      </Head>
      <SectionMain>
      <SectionTitleLineWithButton icon={mdiCar} title="Edit specific vehicle" main>
          <Button
            href={`/vehicles/${id}`}
            // target="_blank"
            icon={mdiCar}
            label="Back to specific vehicle"
            color="contrast"
            roundedFull
            small
          />
        </SectionTitleLineWithButton>
      </SectionMain>
    </>
  )
}
export default EditVehicle
