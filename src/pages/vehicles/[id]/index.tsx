import { mdiAccountClock } from '@mdi/js';
import Button from 'components/Button';
import Buttons from 'components/Buttons';
import CardBoxModal from 'components/CardBox/Modal';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchOneVehicle } from 'src/hooks/vehicleData';




const Vehicle = () => {
  const [isModalInfoActive, setIsModalInfoActive] = useState(false)
  const [isModalDangerActive, setIsModalDangerActive] = useState(false)
  const [isModalSuccessActive, setIsModalSuccessActive] = useState(false)

  const handleModalAction = () => {
    setIsModalInfoActive(false)
    setIsModalDangerActive(false)
    setIsModalSuccessActive(false)
  }

  const modalSampleContents = (
    <>
      <p>
        Lorem ipsum dolor sit amet <b>adipiscing elit</b>
      </p>
      <p>This is sample modal</p>
    </>
  )

  const [vehicleData, setVehicleData] = useState({
    vehicle: null,
    isLoading: true,
    isError: false,
  })

  const router = useRouter()
  const { id } = router.query

  console.log('vehicle id = ' + id) // TODO - удалить

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchOneVehicle(id)
        console.log(result)
        setVehicleData({
          vehicle: result.vehicle,
          isLoading: false,
          isError: result.isError,
        })
      } catch (error) {
        console.error('Error fetching data:', error)
        setVehicleData({
          vehicle: null,
          isLoading: false,
          isError: true,
        })
      }
    }

    if (id) {
      fetchData()
    }
  }, [id])

  if (vehicleData.isLoading) {
    return <div>Loading...</div>
  }

  if (vehicleData.isError) {
    return <div>Error loading vehicle data</div>
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Specific vehicle')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiCar} title="Information about specific vehicle" main>
          <Button
            href="/vehicles/"
            //target="_blank"
            icon={mdiCar}
            label="Back to vehicle's overview"
            color="contrast"
            roundedFull
            small
          />
        </SectionTitleLineWithButton>
        <div style={{ textAlign: 'left', margin: '0 auto', maxWidth: '600px' }}>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>Vehicle+++</p>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>Vehicle with id: {id}</p>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
            Model: {vehicleData.vehicle ? vehicleData.vehicle.model : 'Unknown'}
          </p>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
            Cost of Delivery:{' '}
            {vehicleData.vehicle ? vehicleData.vehicle.costOfDelivery + ' €' : 'Unknown'}
          </p>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
            Status: {vehicleData.vehicle ? vehicleData.vehicle.status : 'Unknown'}
          </p>
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


                    </Buttons>)}
            </Formik>

        </>

    );
};

export default Vehicle;
