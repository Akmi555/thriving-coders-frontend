import Head from 'next/head'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup';
import { mdiAccount, mdiAccountMultipleOutline, mdiAccountOutline, mdiAccountPlus, mdiAccountSettings, mdiCurrencyBtc, mdiEmail, mdiPhoneClassic } from '@mdi/js'
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
import { useRouter } from 'next/router';


const AddNewCustomerPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const AddCustomerValidationSchema = Yup.object().shape(
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
    };

     const handleSubmit = async(customerData: Customer) =>{  
        console.log("Hello Customer")  
        try {
            setLoading(true);
            const response = await addNewCustomer(customerData);             
            if (response.status === 201) {
                setLoading(false);
                showSuccessToast('New customer successfully added!');
                setTimeout(() => router.push("/customers"), 3000)
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
                        validationSchema={AddCustomerValidationSchema}
                        onSubmit={handleSubmit}//TODO was double async 
                    >
                        {({ errors, touched }) => (
                            <Form>
                                {/*<pre>{JSON.stringify(errors)}</pre> */}
                                <FormField label="Please insert Tax identificaton number and company name" icons={[mdiAccountOutline, mdiAccount]}
                                    errors={[
                                        errors.taxIdentificationNumber && touched.taxIdentificationNumber ? errors.taxIdentificationNumber : null,
                                        errors.companyName && touched.companyName ? errors.companyName : null
                                    ]}
                                >
                                    <Field name="taxIdentificationNumber" placeholder="insert tax identification number" />
                                    <Field name="companyName" placeholder="insert company name" />
                                </FormField>
                                
                                <FormField
                                
                                    label="Provide Your legal Address" icons={[mdiAccountOutline, mdiAccount]}
                                    errors={[
                                        errors.legalAddress && touched.legalAddress ? errors.legalAddress : null,
                                        errors.postalCode && touched.postalCode ? errors.postalCode : null,
                                        errors.country && touched.country ? errors.country : null
                                        
                                    ]}
                                    labelFor="legalAddress"
                                    // icons={[mdiPhoneClassic]}
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
                                    <Field name="legalAddress" placeholder="insert address" />
                                    <Field name="postalCode" placeholder="insert postal code" />
                                    <Field name="country" placeholder="insert country" />
                                </FormField>
                                

                                <FormField 
                                    label="Please insert email address"
                                    icons={[mdiAccountOutline, mdiAccount]}
                                    errors={[
                                        errors.email && touched.email ? errors.email : null
                                    ]}
                                >
                                    <Field name="email" placeholder="insert email address" />
                                </FormField>

                               {/* <FormField label="Please insert delivery addresses"
                                        labelFor="deliveryAddresses"// Formik field arrray if massiv of adresses
                                 icons={[mdiAccountOutline, mdiAccount]}
                                    errors={[
                                        errors.deliveryAddresses && touched.email ? errors.deliveryAddresses  : null
                                    ]}
                                >
                                    <Field name="deliveryAddresses" placeholder="insert delivery addresses" />
                                </FormField>*/}

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



