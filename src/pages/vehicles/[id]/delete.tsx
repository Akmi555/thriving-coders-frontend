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
import { mdiAccountPlus, mdiCar } from '@mdi/js'
import { Bounce, toast, ToastContainer } from 'react-toastify'
import Icon from 'components/Icon'

const DeleteVehicle = () => {
  
  const router = useRouter()
  const { id } = router.query
  const [isModalInfoActive, setIsModalInfoActive] = useState(true)
  const showSuccessToast = (message) => {   
    toast.success(message, {
      icon: <Icon path={mdiAccountPlus} size={48} />,
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light", // TODO correct theme, if dark mode on
      transition: Bounce,
    });
  };
  const showErrorToast = (errorMessage) => {
    toast.error(errorMessage, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }

  const deleteVehicle = async () => {
    try {
      const response = await deleteVehicleAsync(id)
      if (response.status === 200) {
        showSuccessToast('Vehicle successfully deleted')  
        setTimeout(() => router.push("/vehicles"), 3000)
      }
    } catch (error) {
      showErrorToast("error when delete vehicle")
    }
  }

  //
  const handleDeleteAction = () => {
    deleteVehicle()
    setIsModalInfoActive(false)
  }
   const backToVehicle=()=>
   {
    setTimeout(() => router.push(`/vehicles/${id}`))
   }

  const handleCancelAction = () => {
    backToVehicle()
    setIsModalInfoActive(false)
  }
  
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
        <ToastContainer />
      </SectionMain>
    </>
  )
}

export default DeleteVehicle



