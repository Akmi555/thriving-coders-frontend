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
import { Employee } from 'interfaces/employee';
import { useState } from 'react';
import addNewEmployee from './addNewEmployee';



const AddNewEmployeePage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const AddEmployeeValidationSchema = Yup.object().shape(
        {
            firstName: Yup.string()
                .min(2, 'First name is too short!')
                .max(50, 'First name is too long!')
                .required('First name is required!'),
            lastName: Yup.string()
                .min(2, 'Last name is too short!')
                .max(50, 'Last name is too long!')
                .required('Last name is required!'),
            contactInfo: Yup.string()
                .min(5, 'Contact information too short!')
                .required('Contact information required!')
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

     const handleSubmit = async(employeeData: Employee) =>{    
        try {
            setLoading(true);
            const response = await addNewEmployee(employeeData);             
            if (response.status === 201) {
                setLoading(false);
                showSuccessToast();
            } else {
                // if another status
            }
        } catch (error) {
            setLoading(false);
            setError(error.message || 'An error occurred while adding employee');
            showErrorToast(error.message || 'An error occurred while adding employee');
        }

    }

    return (
        <>
            <Head>
                <title>{getPageTitle('Add new employee')}</title>
            </Head>
            <SectionMain>
                <SectionTitleLineWithButton icon={mdiAccountPlus} title="Add new employee" main>
                    <Button
                        href="/employees/"
                        // target="_blank"
                        icon={mdiAccountMultipleOutline}
                        label="Back to employees overview"
                        color="contrast"
                        roundedFull
                        small
                    />
                </SectionTitleLineWithButton>


                <CardBox>
                    <Formik
                        initialValues={{
                            firstName: '',
                            lastName: '',
                            contactInfo: '',
                            position: '',
                            hourlyRate: undefined,
                        }}
                        validationSchema={AddEmployeeValidationSchema}
                        onSubmit={async (employeeData) => handleSubmit(employeeData)}  
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <FormField label="Please insert First and Last name" icons={[mdiAccountOutline, mdiAccount]}
                                    errors={[
                                        errors.firstName && touched.firstName ? errors.firstName : null,
                                        errors.lastName && touched.lastName ? errors.lastName : null
                                    ]}
                                >
                                    <Field name="firstName" placeholder="First name" />
                                    <Field name="lastName" placeholder="Last name" />
                                </FormField>

                                <FormField
                                    label="Provide Your contact information"
                                    labelFor="contactInfo"
                                    // help="Phone numbers or email addresses"
                                    icons={[mdiPhoneClassic]}
                                    errors={errors.contactInfo && touched.contactInfo ? [errors.contactInfo] : null}
                                >
                                    <Field name="contactInfo" placeholder="Contact information about new employee" id="contactInfo" />
                                </FormField>

                                <FormField label="Select position and hourly rate" labelFor="position" icons={[mdiAccountSettings, mdiCurrencyBtc]}
                                    errors={[
                                        errors.position && touched.position ? errors.position : null,
                                        errors.hourlyRate && touched.hourlyRate ? String(errors.hourlyRate) : null
                                    ]}>
                                    <Field name="position" id="position" component="select">
                                        <option value="">Please select position</option>
                                        <option value="designer">Designer</option>
                                        <option value="assistant">Assistant</option>
                                        <option value="engineer">Engineer</option>
                                        <option value="architect">Architect</option>
                                    </Field>
                                    <Field name="hourlyRate" placeholder="Hourly rate" />
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

export default AddNewEmployeePage;