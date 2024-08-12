import * as Yup from 'yup'
import { mdiCar } from '@mdi/js'
import Button from 'components/Button'
import CardBox from 'components/CardBox'
import SectionMain from 'components/Section/Main'
import SectionTitleLineWithButton from 'components/Section/TitleLineWithButton'
import { Formik } from 'formik'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getPageTitle } from 'src/config'
import { fetchOneVehicle } from 'src/hooks/vehicleData'
import { Vehicle } from 'interfaces/vehicles'

const EditVehicle = () => {
  const [editVehicleData, setEditVehicleData] = useState({
    vehicle: null,
    isLoading: true,
    isError: false,
  })
  const router = useRouter();
  const { id } = router.query;

  console.log('vehicle id = ' + id); // TODO - удалить
  const AddVehicleValidationSchema = Yup.object().shape({
    model: Yup.string()
      .min(2, 'Model is too short!')
      .max(50, 'Model is too long!')
      .required('Model is required!'),
    weightCapacity: Yup.number()
      .min(2, 'Weight capacity is too small')
      .max(5000, 'Weight capacity is too big')
      .required('Weight capacity is required!'),
    fuelType: Yup.string().required('Fuel type is required!'),
    rangeWithCargo: Yup.number()
      .min(10, 'Range with Cargo is too small')
      .required('Range with Cargo is required'),
    rangeWithOutCargo: Yup.number()
      .min(10, 'Range is too small')
      .required('Range without Cargo is required'),
    fuelConsumptionWithCargo: Yup.number()
      .min(10, 'Fuel consumption with Cargo is too small')
      .required('Fuel consumption with Cargo is required'),
    usefulArea: Yup.number().min(10, 'Useful area is too small').required('Useful area is required'),
    costOfDelivery: Yup.number()
      .min(2, 'Cost of delivery is too small')
      .required('Cost of delivery is required'),
    status: Yup.string().min(2, 'Status is too small').required('Status is required'),
  })


  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchOneVehicle(id);
        console.log(result);
        setEditVehicleData({
          vehicle: result.vehicle,
          isLoading: false,
          isError: result.isError,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        setEditVehicleData({
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

  if (editVehicleData.isLoading) {
    return <div>Loading...</div>;
  }

  if (editVehicleData.isError) {
    return <div>Error loading vehicle data</div>;
  }

  const vehicle = editVehicleData.vehicle;
  const handleSubmit = async (vehicleData: Vehicle) => {
    try {
      setLoading(true);
      const response = await EditVehicle(editVehicleData);
      if (response.status === 201) {
        setLoading(false);
        console.log('a vehicle is updated')
        // showSuccessToast();
      } else {
        // handle other statuses
      }

    } catch (error) {
      setLoading(false);
      console.log('a vehicle is NOT saved')
    }
  }

  return (
    
    <>
      <Head>
        <title>{getPageTitle('Edited vehicle')}</title>
      </Head>
      <SectionMain>
      <SectionTitleLineWithButton icon={mdiCar} title="Edit specific vehicle" main>
        <CardBox>
          <Formik
          initialValues={{
              vehicleId: -1,
              model: '',
              weightCapacity: 0,
              fuelType: '',
              rangeWithCargo: 0,
              rangeWithOutCargo: 0,
              fuelConsumptionWithCargo: 0,
              usefulArea: 0,
              costOfDelivery: 0,
              status: '',
            }}
             validationSchema={AddVehicleValidationSchema}
             onSubmit={handleSubmit}>
              </Formik>
              </CardBox>
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
  );
};
export default EditVehicle;
function setLoading(arg0: boolean) {
  throw new Error('Function not implemented.')
}

