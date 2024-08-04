import { mdiAccountClock, mdiCar } from '@mdi/js';
import Button from 'components/Button';
import Buttons from 'components/Buttons';
import CardBoxModal from 'components/CardBox/Modal';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchOneVehicle } from 'src/hooks/vehicleData';
import Head from 'next/head';
import SectionMain from 'components/Section/Main';
import SectionTitleLineWithButton from 'components/Section/TitleLineWithButton';
import { getPageTitle } from 'src/config';

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

  const vehicle = vehicleData.vehicle;

  return (
    <>
      <Head>
        <title>{getPageTitle('Specific vehicle')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiCar} title="Information about specific vehicle" main>
          <Button
            href="/vehicles/"
            // target="_blank"
            icon={mdiCar}
            label="Back to vehicle's overview"
            color="contrast"
            roundedFull
            small
          />
        </SectionTitleLineWithButton>

        <div style={{ textAlign: 'left', margin: '0 auto', maxWidth: '600px' }}>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>Vehicle Information</p>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td style={{ border: '1px solid black', padding: '8px' }}>Model</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{vehicle.model}</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid black', padding: '8px' }}>Weight Capacity</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{vehicle.weightCapacity}</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid black', padding: '8px' }}>Fuel Type</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{vehicle.fuelType}</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid black', padding: '8px' }}>Range with Cargo</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{vehicle.rangeWithCargo}</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid black', padding: '8px' }}>Range without Cargo</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{vehicle.rangeWithOutCargo}</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid black', padding: '8px' }}>Fuel Consumption with Cargo</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{vehicle.fuelConsumptionWithCargo}</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid black', padding: '8px' }}>Useful Area</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{vehicle.usefulArea}</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid black', padding: '8px' }}>Cost of Delivery</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{vehicle.costOfDelivery} €</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid black', padding: '8px' }}>Status</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{vehicle.status}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Formik
          initialValues={{
            outline: false,
            small: false,
            icon: true,
            rounded: false,
            disabled: false,
          }}
          onSubmit={() => null}
        >
          {({ values }) => (
            <Buttons>
              <Button
                color="info"
                icon={mdiAccountClock}
                outline={values.outline}
                small={values.small}
                roundedFull={values.rounded}
                disabled={values.disabled}
              />
              <Button
                color="info"
                icon={mdiAccountClock}
                outline={values.outline}
                small={values.small}
                roundedFull={values.rounded}
                disabled={values.disabled}
              />
              <Button
                color="info"
                icon={mdiAccountClock}
                outline={values.outline}
                small={values.small}
                roundedFull={values.rounded}
                disabled={values.disabled}
              />
              <Button
                color="danger"
                label="Delete"
                href={`/vehicles/${id}/delete`}
                outline={values.outline}
                small={values.small}
                roundedFull={values.rounded}
                disabled={values.disabled}
              />
            </Buttons>
          )}
        </Formik>
      </SectionMain>
    </>
  );
};

export default Vehicle;
