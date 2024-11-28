import { mdiAccount, mdiAccountOutline, mdiPencilOutline } from "@mdi/js";
import Button from "components/Button";
import Buttons from "components/Buttons";
import CardBox from "components/CardBox";
import Divider from "components/Divider";
import FormField from "components/Form/Field";
import SectionMain from "components/Section/Main";
import SectionTitleLineWithButton from "components/Section/TitleLineWithButton";
import CustomerDeliveryAddressesTable from "components/Table/CustomerDeliveryAddressesTable";
import { Field, Form, Formik, FieldArray } from "formik";
import { Customer } from "interfaces/customer";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { getPageTitle } from "src/config";
import { fetchOneCustomer } from "src/hooks/customerData";
import { fetchDeliveryAddressesByCustomerId } from "src/hooks/deliveryAddressesData";
import * as Yup from 'yup';

const EditCustomerValidationSchema = Yup.object().shape({
  taxIdentificationNumber: Yup.string().required('Tax Identification Number is required'),
  companyName: Yup.string().required('Company Name is required'),
  // Add more validation as needed
});

const DeliveryAddresses = () => {
  const [customerData, setCustomerData] = useState({
    customer: null,
    isLoading: true,
    isError: false,
    deliveryAddresses: [],
  });

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Result = await fetchOneCustomer(id);
        const deliveryAddressesResult = await fetchDeliveryAddressesByCustomerId(id);
    
        setCustomerData({
          customer: Result.customer,
          deliveryAddresses: Array.isArray(deliveryAddressesResult.deliveryAddresses)
            ? deliveryAddressesResult.deliveryAddresses
            : [], // Ensure it's an array
          isLoading: false,
          isError: Result.isError || deliveryAddressesResult.isError,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        setCustomerData({
          customer: null,
          deliveryAddresses: [],
          isLoading: false,
          isError: true,
        });
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (customerData.isLoading) {
    return <div>Loading...</div>;
  }

  if (customerData.isError) {
    return <div>Error loading customer data</div>;
  }

  const { customer, deliveryAddresses } = customerData;

  const handleSubmit = async (values) => {
    // Handle form submission
    console.log('Form values:', values);
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Show delivery addresses of customer')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiAccount} title="Show delivery addresses of customer" main>
          <Button
            href={`/customers/${id}`}
            icon={mdiAccount}
            label="Back to specific customer"
            color="contrast"
            roundedFull
            small
          />
        </SectionTitleLineWithButton>
        <CustomerDeliveryAddressesTable/>
        <Buttons>
                                    <Button type="submit" color="info" label="Edit" />
                                    {/* <Button type="reset" color="info" outline label="Reset" /> */}
                                </Buttons>
      </SectionMain>
    </>
    
  );
};

export default DeliveryAddresses;
