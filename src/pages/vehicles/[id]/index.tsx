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

        <div className="text-left mx-auto max-w-4xl">
          <p className="text-2xl font-bold">Vehicle Information</p>
          <table className="min-w-full divide-y divide-gray-200">
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Model</td>
                <td className="px-6 py-4 whitespace-nowrap">{vehicle.model}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Weight Capacity</td>
                <td className="px-6 py-4 whitespace-nowrap">{vehicle.weightCapacity}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Fuel Type</td>
                <td className="px-6 py-4 whitespace-nowrap">{vehicle.fuelType}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Range with Cargo</td>
                <td className="px-6 py-4 whitespace-nowrap">{vehicle.rangeWithCargo}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Range without Cargo</td>
                <td className="px-6 py-4 whitespace-nowrap">{vehicle.rangeWithOutCargo}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Fuel Consumption with Cargo</td>
                <td className="px-6 py-4 whitespace-nowrap">{vehicle.fuelConsumptionWithCargo}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Useful Area</td>
                <td className="px-6 py-4 whitespace-nowrap">{vehicle.usefulArea}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Cost of Delivery</td>
                <td className="px-6 py-4 whitespace-nowrap">{vehicle.costOfDelivery} €</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Status</td>
                <td className="px-6 py-4 whitespace-nowrap">{vehicle.status}</td>
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
            <div className="buttons-container">
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
                label="Edit"
                href={`/vehicles/${id}/edit`}
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
            </div>
          )}
        </Formik>
      </SectionMain>

      <style jsx>{`
        .buttons-container {
          display: flex;
          justify-content: center; /* Центровка кнопок по горизонтали */
          gap: 1rem; /* Отступы между кнопками */
          margin-top: 2rem; /* Отступ сверху */
        }
      `}</style>
    </>
  );
};

export default Vehicle;

