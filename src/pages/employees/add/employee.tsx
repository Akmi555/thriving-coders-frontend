import Head from 'next/head'
import { Formik, Form, Field } from 'formik'
import { mdiAccount, mdiAccountMultipleOutline, mdiAccountOutline, mdiAccountPlus, mdiAccountSettings, mdiCurrencyBtc, mdiEmailOutline, mdiMail, mdiPhoneClassic } from '@mdi/js'

import SectionMain from 'components/Section/Main'
import Button from 'components/Button'
import SectionTitleLineWithButton from 'components/Section/TitleLineWithButton'
import { getPageTitle } from '../../../config'
import CardBox from 'components/CardBox'
import Buttons from 'components/Buttons'
import Divider from 'components/Divider'
import FormField from 'components/Form/Field'

const AddNewEmployeePage = () => {
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
                            firstname: '',
                            lastName: '',
                            email: '',
                            phone: '',
                            position: 'engineer',
                            hourlyRate: '',
                            textarea: 'Hello',
                        }}
                        onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
                    >
                        <Form>
                            <FormField label="Please insert first and last name" icons={[mdiAccountOutline, mdiAccount]}>
                                <Field name="firstname" placeholder="Full name" />
                                <Field name="lastName" placeholder="Last name" />
                            </FormField>

                            <FormField
                                label="Provide Your contact information"
                                labelFor="contact"
                                help="Phone numbers or email addresses"
                                icons={[mdiPhoneClassic]}
                            >
                                <Field name="contact" placeholder="Contact" id="contact" />
                            </FormField>

                            <FormField label="Select position and hourly rate" labelFor="position" icons={[mdiAccountSettings, mdiCurrencyBtc ]}>
                                <Field name="position" id="position" component="select">
                                    <option value="designer">Designer</option>
                                    <option value="assistant">Assistant</option>
                                    <option value="engineer">Engineer</option>
                                    <option value="architect">Architect</option>
                                </Field>
                                <Field name="hourlyRate" placeholder="Hourly rate" />
                            </FormField>

                            <Divider />

                            <FormField label="Textarea" hasTextareaHeight>
                                <Field name="textarea" as="textarea" placeholder="Your text here" />
                            </FormField>

                            <Divider />

                            <Buttons>
                                <Button type="submit" color="info" label="Submit" />
                                <Button type="reset" color="info" outline label="Reset" />
                            </Buttons>
                        </Form>
                    </Formik>
                </CardBox>

            </SectionMain>
        </>

    );
}

export default AddNewEmployeePage;