import { mdiAccount } from "@mdi/js";
import Button from "components/Button";
import CardBox from "components/CardBox";
import SectionMain from "components/Section/Main";
import SectionTitleLineWithButton from "components/Section/TitleLineWithButton";
import { Formik } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { getPageTitle } from "src/config";
import * as Yup from 'yup';



const EditCustomer = () => {
    const [EditCustomerData, setEditCustomerData] = useState({
        customer: null,
        isLoading: true,
        isError: false,
    });

    const router = useRouter();
    const { id } = router.query;

    console.log('customer id = ' + id); // TODO - удалить

    const EditCustomerValidationSchema = Yup.object().shape(
        {
            companyName: Yup.string()
                .min(2, 'Company name is too short!')
                .max(50, 'Company name is too long!')
                .required('Company name is required!'),
            taxIdentificationNumber: Yup.string()
                .min(2, 'Tax identification number is too short!')
                .max(11, 'Tax identification number!')//TODO check with backend how much
                .required('Tax identification number is required!'),
            legalAddress: Yup.string()
                .min(5, 'Address is too short!')
                .max(50, ' Address is too long!')
                .required('Address is required!'),
            postalCode: Yup.string()
                .min(2, 'Postal Code is too short!')
                .max(5, 'Postal Code!')//TODO check with backend how much
                .required('Postal code is required!'),
            country: Yup.string()
                .min(2, 'Country name is too short!')
                .max(50, 'Country name is too long!')
                .required('Country name is required!'),
            //deliveryAddresses: Yup.string()
            // .min(5, 'Address of delivery is too short!')
            //.max(50, ' Address of delivery is too long!')
            // .required('Address of delivery is required!'),
            email: Yup.string()
                .min(5, 'Email address is too short!')
                .max(50, ' Email address is too long!')
                .required('Email address is required!')
        }
        
    );


    const handleSubmit =() => {console.log("VasyaPupkin")};




    return (
        <>

            <Head>
                <title>{getPageTitle('Edit specific customer')}</title>
            </Head>
            <SectionMain>
                <SectionTitleLineWithButton icon={mdiAccount} title="Edit specific customer" main>
                    <Button
                        href="/customers"
                        // target="_blank"
                        icon={mdiAccount}
                        label="Back to customer's overview"
                        color="contrast"
                        roundedFull
                        small
                    />
                </SectionTitleLineWithButton>

                <CardBox>
                    <Formik
                        initialValues={{
                            customerId: -1,
                            taxIdentificationNumber: '',
                            companyName: '',
                            legalAddress: '',
                            postalCode: '',
                            country: '',
                            deliveryAddresses: [],
                            email: '',
                            password: 'init',
                            active: false,


                        }}
                        validationSchema={EditCustomerValidationSchema}
                        onSubmit={handleSubmit}//TODO was double async 
                    >
                    </Formik>

                </CardBox>


            </SectionMain>

        </>
    );
};

export default EditCustomer;