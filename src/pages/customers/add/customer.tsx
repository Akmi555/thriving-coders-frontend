import Head from 'next/head'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup';
import { mdiAccount, mdiAccountMultipleOutline, mdiAccountOutline, mdiAccountPlus, mdiAccountSettings, mdiCurrencyBtc, mdiPhoneClassic } from '@mdi/js'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SectionMain from 'components/Section/Main'
import Button from 'components/Button'
import SectionTitleLineWithButton from 'components/Section/TitleLineWithButton'
import { getPageTitle } from '../../../config'
import CardBox from 'components/CardBox'
import Buttons from 'components/Buttons'
import Divider from 'components/Divider'
import FormField from 'components/Form/Field'
import Icon from 'components/Icon';
import { Customer } from 'interfaces/customer';
import { useState } from 'react';
import addNewCustomer from './addNewCustomer';



const AddNewCustomerPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const AddCustomerValidationSchema = Yup.object().shape(
        {
            taxIdentificationNumber: Yup.string()
                .min(2, 'Tax identification number is too short!')
                .max(11, 'Tax identification number!')//TODO check with backend how much
                .required('Tax identification number is required!'),
            companyName: Yup.string()
                .min(2, 'Company name is too short!')
                .max(50, 'Company name is too long!')
                .required('Company name is required!'),
            legalAddress: Yup.string()
                .min(5, 'Adress is too short!')
                .max(50, ' Adress is too long!')
                .required('Adress is required!'),
            postalCode: Yup.string()
                .min(2, 'Postal Code is too short!')
                .max(5, 'Postal Code!')//TODO check with backend how much
                .required('Postal Code is required!'),
            country: Yup.string()
                .min(2, 'Country name is too short!')
                .max(50, 'Country name is too long!')
                .required('Country name is required!'),
            deliveryAddresses: Yup.string()
                .min(5, 'Adress of delivery is too short!')
                .max(50, ' Adress of delivery is too long!')
                .required('Adress of delivery is required!')
        }
    );

    const showLoadingToast = () => {
        toast.info('Loading...', {
            position: "bottom-right",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    };

    const showSuccessToast = () => {
        toast.success('New employee successfully added!', {
            icon: <Icon path={mdiAccountPlus} size={48} />,
            position: "bottom-right",
            autoClose: 5000,
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
    };

     const handleSubmit = async(customerData: Customer) =>{    
        try {
            setLoading(true);
            const response = await addNewCustomer(customerData);             
            if (response.status === 201) {
                setLoading(false);
                showSuccessToast();
            } else {
                // if another status
            }
        } catch (error) {
            setLoading(false);
            setError(error.message || 'An error occurred while adding customer');
            showErrorToast(error.message || 'An error occurred while adding customer');
        }

    }

    return (
        <>
            <Head>
                <title>{getPageTitle('Add new customer')}</title>
            </Head>
            <SectionMain>
                <SectionTitleLineWithButton icon={mdiAccountPlus} title="Add new customer" main>
                    <Button
                        href="/customers/"
                        // target="_blank"
                        icon={mdiAccountMultipleOutline}
                        label="Back to customers overview"
                        color="contrast"
                        roundedFull
                        small
                    />
                </SectionTitleLineWithButton>


                <CardBox>
                    <Formik
                        initialValues={{
                            taxIdentificationNumber: '',
                            companyName: '',
                            legalAddress: '',
                            postalCode: '',
                            country: '',
                            deliveryAddresses: '',
                            address: '',
                            contactPerson: '',
                    
                        }}
                        validationSchema={AddCustomerValidationSchema}
                        onSubmit={async (customerData) => handleSubmit(customerData)}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <FormField label="Please insert Tax identificaton number and company name" icons={[mdiAccountOutline, mdiAccount]}
                                    errors={[
                                        errors.taxIdentificationNumber && touched.taxIdentificationNumber ? errors.taxIdentificationNumber : null,
                                        errors.companyName && touched.companyName ? errors.companyName : null
                                    ]}
                                >
                                    <Field name="taxIdentificationNumber" placeholder="taxIdentificationNumber" />
                                    <Field name="companyName" placeholder="companyName" />
                                </FormField>
                                
                                <FormField
                                    label="Provide Your legal Address"
                                    labelFor="legalAddress"
                                    // icons={[mdiPhoneClassic]}
                                    errors={errors.legalAddress && touched.legalAddress ? [errors.legalAddress] : null}
                                >
                                    {/* <Field name="contactInfo" placeholder="Contact information about new employee" id="contactInfo" />
                                </FormField> // TODO postalcode, country, deliveryadress, contactperson

                                <FormField label="Select position and hourly rate" labelFor="position" icons={[mdiAccountSettings, mdiCurrencyBtc]}
                                    errors={[
                                        errors.position && touched.position ? errors.position : null,
                                        errors.hourlyRate && touched.hourlyRate ? String(errors.hourlyRate) : null
                                    ]}> */}
                                    {/* <Field name="position" id="position" component="select">
                                        <option value="">Please select position</option>
                                        <option value="designer">Designer</option>
                                        <option value="assistant">Assistant</option>
                                        <option value="engineer">Engineer</option>
                                        <option value="architect">Architect</option>
                                    </Field> */}
                                    <Field name="legalAddress" placeholder="legalAddress" />
                                    <Field name="postalCode" placeholder="postalCode" />
                                    <Field name="country" placeholder="country" />
                                </FormField>

                                <Divider />

                                <Buttons>
                                    <Button type="submit" color="info" label="Submit" />
                                    <Button type="reset" color="info" outline label="Reset" />
                                </Buttons>
                            </Form>
                        )}
                    </Formik>

                    <ToastContainer />

                </CardBox>

            </SectionMain>
        </>

    );
}

export default AddNewCustomerPage;



