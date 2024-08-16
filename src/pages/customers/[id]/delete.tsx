import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import LayoutAuthenticated from "src/layouts/Authenticated";
import Button from "components/Button";
import { mdiAccount, mdiAccountPlus } from "@mdi/js";
import CardBoxModal from "components/CardBox/Modal";
import SectionMain from "components/Section/Main";
import SectionTitleLineWithButton from "components/Section/TitleLineWithButton";
import Head from 'next/head'
import { getPageTitle } from "src/config";
import deleteCustomerAsync from "../add/deleteCustomerAsync";
import Icon from "components/Icon";
import { toast, Bounce, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';




const DeleteCustomer = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isModalInfoActive, setIsModalInfoActive] = useState(true)
  const showSuccessToast = (message) => {
    toast.success(message, {
      icon: <Icon path={mdiAccountPlus} size={48} />,
      position: "bottom-right",
      autoClose: 3000,
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

  const deleteCustomer = async () => {
    try {
      const response = await deleteCustomerAsync(id)
      if (response.status === 200) {
        showSuccessToast('Customer successfully deleted')  
        setTimeout(() => router.push("/customers"), 3000)
      }
    } catch (error) {
      showErrorToast("error when delete customer")
    }
  }

  const handleDeleteAction = () => {
    deleteCustomer()
    setIsModalInfoActive(false)
  }


  const handleCancelAction = () => {
    setIsModalInfoActive(false)
  }

  const modalSampleContents = (
    <>
      <p>
        Would you like to delete this customer <b>really delete?</b>
      </p>
      <p>In this case you will not be able to return it back</p>
    </>
  )

  return (
    <>
      <Head>
        <title>{getPageTitle('Delete customer')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiAccount} title="Delete specific customer" main>
          <Button
            //href={`/customers/${id}`}
            href={`/customers/`}
            // target="_blank"
            icon={mdiAccount}
            label="Back to existing customers"
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
export default DeleteCustomer;

