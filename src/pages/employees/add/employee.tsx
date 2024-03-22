import Head from 'next/head'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup';
import { mdiAccount, mdiAccountMultipleOutline, mdiAccountOutline, mdiAccountPlus, mdiAccountSettings, mdiCurrencyBtc, mdiEmailOutline, mdiMail, mdiPhoneClassic } from '@mdi/js'

import SectionMain from 'components/Section/Main'
import Button from 'components/Button'
import SectionTitleLineWithButton from 'components/Section/TitleLineWithButton'
import { getPageTitle } from '../../../config'
import CardBox from 'components/CardBox'
import Buttons from 'components/Buttons'
import Divider from 'components/Divider'
import FormField from 'components/Form/Field'
import { Employee } from 'interfaces/employee'

const AddNewEmployeePage = () => {

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

    return (
        <>
            <Head>
                <title>{getPageTitle('Add new employee')}</title>
            </Head>
            <SectionMain>
                <SectionTitleLineWithButton icon={mdiAccountPlus} title="Add new employee" main>
                    <Button
                        href="/employees/overview"
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
                            position: 'engineer',
                            hourlyRate: undefined,
                        }}
                        validationSchema={AddEmployeeValidationSchema}
                        onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
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

                                <FormField label="Select position and hourly rate" labelFor="position" icons={[mdiAccountSettings, mdiCurrencyBtc]}>
                                    <Field name="position" id="position" component="select">
                                        <option value="designer">Designer</option>
                                        <option value="assistant">Assistant</option>
                                        <option value="engineer">Engineer</option>
                                        <option value="architect">Architect</option>
                                    </Field>
                                    <Field name="hourlyRate" placeholder="Hourly rate" />
                                </FormField>

                                <Divider />

                                {/* <FormField label="Textarea" hasTextareaHeight>
                                <Field name="textarea" as="textarea" placeholder="Your text here" />
                            </FormField>

                            <Divider /> */}

                                <Buttons>
                                    <Button type="submit" color="info" label="Submit" />
                                    <Button type="reset" color="info" outline label="Reset" />
                                </Buttons>
                            </Form>
                        )}
                    </Formik>
                </CardBox>

            </SectionMain>
        </>

    );
}

export default AddNewEmployeePage;