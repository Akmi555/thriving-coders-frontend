import { mdiCar } from '@mdi/js'
import Button from 'components/Button'
import SectionMain from 'components/Section/Main'
import SectionTitleLineWithButton from 'components/Section/TitleLineWithButton'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { getPageTitle } from 'src/config'

const EditVehicle = () => {
  const [vehicleData, setVehicleData] = useState({
    vehicle: null,
    isLoading: true,
    isError: false,
  })
  const router = useRouter();
  const { id } = router.query;

  console.log('vehicle id = ' + id); // TODO - удалить
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
