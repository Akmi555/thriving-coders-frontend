import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import deleteVehicleAsync from '../add/deleteVehicleAsync'
import LayoutAuthenticated from 'src/layouts/Authenticated'
import VehiclesPage from '..'
import Button from 'components/Button'
import CardBoxModal from 'components/CardBox/Modal'
import { getPageTitle } from 'src/config'
import Head from 'next/head'
import SectionMain from 'components/Section/Main'
import SectionTitleLineWithButton from 'components/Section/TitleLineWithButton'
import { mdiCar } from '@mdi/js'

const DeleteVehicle = () => {
  const router = useRouter()
  const { id } = router.query
  //
  const deleteVehicle = async () => {
    deleteVehicleAsync(id)
  }
  const handleDeleteAction = () => {
    deleteVehicle()
    setIsModalInfoActive(false)
  }
  const handleCancelAction = () => {
    setIsModalInfoActive(false)
  }
  const [isModalInfoActive, setIsModalInfoActive] = useState(true)
  const modalSampleContents = (
    <>
      <p>
        Would you like to delete this vehicle <b>really delete?</b>
      </p>
      <p>In this case you will not be able to return it back</p>
    </>
  )

  return (
    <>
      <Head>
        <title>{getPageTitle('Delete vehicle')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiCar} title="Delete specific vehicle" main>
          <Button
            //href={`/vehicles/${id}`}
            href={`/vehicles/`}
            // target="_blank"
            icon={mdiCar}
            label="Back to existing vehicles"
            color="contrast"
            roundedFull
            small
          />
        </SectionTitleLineWithButton>
        <CardBoxModal
          title="Please confirm action"
          buttonColor="danger"
          buttonLabel="Delete"
          isActive={isModalInfoActive}
          onConfirm={handleDeleteAction}
          onCancel={handleCancelAction}
        >
          {modalSampleContents}
        </CardBoxModal>
      </SectionMain>
    </>
  )
}

export default DeleteVehicle
