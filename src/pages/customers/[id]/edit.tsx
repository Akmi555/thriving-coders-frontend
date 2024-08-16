import { mdiAccount, mdiAccountOutline } from "@mdi/js";
import Button from "components/Button";
import Buttons from "components/Buttons";
import CardBox from "components/CardBox";
import Divider from "components/Divider";
import FormField from "components/Form/Field";
import SectionMain from "components/Section/Main";
import SectionTitleLineWithButton from "components/Section/TitleLineWithButton";
import { Field, Form, Formik } from "formik";
import { Customer } from "interfaces/customer";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { getPageTitle } from "src/config";
import { fetchOneCustomer } from "src/hooks/customerData";
import { editOneCustomer } from "src/hooks/editCustomerData";
import * as Yup from 'yup';
import editCustomerAsync from "./editCustomerAsync";




const EditCustomer = (editCustomerData: Customer) => {
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchOneCustomer(id);
                console.log(result);
                setEditCustomerData({
                    customer: result.customer,
                    isLoading: false,
                    isError: result.isError,
                });
            } catch (error) {
                console.error('Error fetching data:', error);
                setEditCustomerData({
                    customer: null,
                    isLoading: false,
                    isError: true,
                });
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    if (EditCustomerData.isLoading) {
        return <div>Loading...</div>;
    }

    if (EditCustomerData.isError) {
        return <div>Error loading customer data</div>;
    }

    const customer = EditCustomerData.customer;
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState('');
    
    // const handleSubmit =() => {console.log("VasyaPupkin")};
    const handleSubmit = async (customerData: Customer) => {
        try {
            // setLoading(true);
            console.log (JSON.stringify(customerData, null, 2))
            const response = await editCustomerAsync(customerData);
            if (response.status === 200) {
                // setLoading(false);
                console.log('a customer is updated')
                // showSuccessToast();
            } else {
                console.log('Failed to update customer');

            }

        } catch (error) {
            // setLoading(false);
            console.log('Error updating customer')
        }
    };

    return (
        <>

            <Head>
                <title>{getPageTitle('Edit specific customer')}</title>
            </Head>
            <SectionMain>
                <SectionTitleLineWithButton icon={mdiAccount} title="Edit specific customer" main>
                    <Button
                        href={`/customers/${id}`}
                        icon={mdiAccount}
                        label="Back to specific customer"
                        color="contrast"
                        roundedFull
                        small
                    />
                </SectionTitleLineWithButton>

                <CardBox>
                    <Formik
                        initialValues={{
                            customerId: customer.customerId,
                            taxIdentificationNumber: customer.taxIdentificationNumber,
                            companyName: customer.companyName,
                            legalAddress: customer.legalAddress,
                            postalCode: customer.postalCode,
                            country: customer.country,
                            deliveryAddresses: customer.deliveryAddresses,
                            email: customer.email,
                            password: 'init',
                            active: false,
                        }}
                        validationSchema={EditCustomerValidationSchema}
                        onSubmit={handleSubmit}//TODO was double async 
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <FormField
                                    // {/*<pre>{JSON.stringify(errors)}</pre> */}

                                    label="Please insert Tax identificaton number and company name" icons={[mdiAccountOutline, mdiAccount]}
                                    errors={[
                                        errors.taxIdentificationNumber && touched.taxIdentificationNumber ? errors.taxIdentificationNumber as string : null,
                                        errors.companyName && touched.companyName ? errors.companyName as string : null
                                    ]}
                                >
                                    <Field name="taxIdentificationNumber" placeholder="insert tax identification number" />
                                    <Field name="companyName" placeholder="insert company name" />
                                </FormField>

                                <FormField

                                    label="Provide Your legal Address" icons={[mdiAccountOutline, mdiAccount]}
                                    errors={[
                                        errors.legalAddress && touched.legalAddress ? errors.legalAddress as string : null,
                                        errors.postalCode && touched.postalCode ? errors.postalCode as string : null,
                                        errors.country && touched.country ? errors.country as string : null

                                    ]}


                                >

                                    <Field name="legalAddress" placeholder="insert address" />
                                    <Field name="postalCode" placeholder="insert postal code" />
                                    <Field name="country" placeholder="insert country" />
                                </FormField>


                                <FormField
                                    label="Please insert email address"
                                    icons={[mdiAccountOutline, mdiAccount]}
                                    errors={[
                                        errors.email && touched.email ? errors.email as string : null
                                    ]}
                                >
                                    <Field name="email" placeholder="insert email address" />
                                </FormField>
                                <Divider />

                                <Buttons>
                                    <Button type="submit" color="info" label="Submit" />
                                    <Button type="reset" color="info" outline label="Reset" />
                                </Buttons>
                            </Form>
                        )}

                    </Formik>
                </CardBox >


                <ToastContainer />




            </SectionMain >

        </>
    );
};

export default EditCustomer;


