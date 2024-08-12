import {
  mdiAccount,
  mdiMapMarker, // Replace mdiLegalAddress with an actual icon or add a custom icon.
  mdiMail,
} from '@mdi/js'
import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import Head from 'next/head'
import Button from 'components/Button'
import Buttons from 'components/Buttons'
import CardBox from 'components/CardBox'
import CardBoxComponentBody from 'components/CardBox/Component/Body'
import CardBoxComponentFooter from 'components/CardBox/Component/Footer'
import FormField from 'components/Form/Field'
import SectionMain from 'components/Section/Main'
import SectionTitleLineWithButton from 'components/Section/TitleLineWithButton'
import CardBoxUser from 'components/CardBox/User'
import { useAppSelector } from 'src/stores/hooks'
import { getPageTitle } from 'src/config'
import { useState } from 'react'
import { Customer } from 'interfaces/customer'
import addNewCustomer from '../add/addNewCustomer'


const AddNewCustomerPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  const handleSubmit = async (customerData: Customer) => {
    try {
      setLoading(true);
      const response = await addNewCustomer(customerData);
      if (response.status === 201) {
        setLoading(false);
        console.log('a customer is saved')
        // showSuccessToast();
      } else {
        // if another status
      }

    } catch (error) {
      setLoading(false);
      console.log('a customer is NOT saved')
    }
  }


  return (
    <>
      <Head>
        <title>{getPageTitle('Customer')}</title>
      </Head>

      <SectionMain>
        <SectionTitleLineWithButton icon={mdiAccount} title="Information about specific customer" main>
          <Button
            href="/customers/"
            //target="_blank"
            icon={mdiAccount}
            label="Back to customer's overview"
            color="contrast"
            roundedFull
            small
          />
        </SectionTitleLineWithButton>

        {/*<CardBoxUser className="mb-6" />*/}

        <CardBox>
          <Formik
            initialValues={{
              customerId: -1,
              taxIdentificationNumber: '',
              companyName: '',
              legalAddress: '',
              postalCode: '',
              country: '',
              email: '',
              password: '',
              deliveryAddresses:'',
              active: false,
            }}
            // onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
            onSubmit={async (customerData) => handleSubmit(customerData)}
          >
            {({ errors, touched }) => (
              <Form className="flex flex-col flex-1">
                <CardBoxComponentBody>
                  <div className="grid grid-cols-2 gap-6">

                    <FormField
                      label="taxIdentificationNumber"
                      labelFor="taxIdentificationNumber"
                    // icons={[mdiAccount]}//TODO 
                    //errors={[errors.model && touched.model ? errors.model : null]}
                    >
                      <Field name="taxIdentificationNumber" id="taxIdentificationNumber" placeholder="taxIdentificationNumber" />
                    </FormField>

                    <FormField
                      label="companyName"
                      labelFor="companyName"
                      icons={[mdiAccount]}//TODO
                      errors={[errors.companyName && touched.companyName ? errors.companyName : null]}
                    >
                      <Field name="companyName" id="companyName" placeholder="companyName" />
                    </FormField>

                    <FormField
                      label="legalAddress"
                      labelFor="legalAddress"
                      icons={[mdiMapMarker]}//TODO ICON
                      errors={[errors.legalAddress && touched.legalAddress ? errors.legalAddress : null]}
                    >
                      <Field name="legalAddress" id="legalAddress" placeholder="legalAddress" />
                    </FormField>

                    <FormField
                      label="postalCode"
                      labelFor="postalCode"
                      icons={[mdiAccount]}
                      errors={[errors.postalCode && touched.postalCode ? errors.postalCode : null]}
                    >
                      <Field name="postalCode" id="postalCode" placeholder="postalCode" />
                    </FormField>

                    <FormField
                      label="country"
                      labelFor="country"
                      icons={[mdiAccount]}//TODO ICON
                      errors={[errors.country && touched.country ? errors.country : null]}
                    >
                      <Field name="country" id="country" placeholder="country" />
                    </FormField>

                    <FormField
                      label="email"
                      labelFor="email"
                      icons={[mdiMail]}//TODO ICON
                      errors={[errors.email && touched.email ? errors.email : null]}
                    >
                      <Field name="email" id="email" placeholder="email" />
                    </FormField>

                    <FormField
                      label="deliveryAddresses"
                      labelFor="deliveryAddresses"
                      icons={[mdiMapMarker]}
                      errors={[errors.deliveryAddresses && touched.deliveryAddresses ? errors.deliveryAddresses as string: null]} //TODO Adress 1  or Adresse  ;;;; Field Array with inputs
                    >
                      <Field name="deliveryAddresses" id="deliveryAddresses" placeholder="deliveryAddresses" component="select">
                        <option value="">Please select delivery addresses</option>
                        <option value="until store">Store</option>
                        <option value="until door">Door</option>
                      </Field>
                    </FormField>

                    <FormField
                      label="Active"
                      labelFor="active"
                      //icons={[mdiAccount]}
                      errors={[errors.active && touched.active ? errors.active : null]}
                    >
                      <Field name="status" id="status" placeholder="Status" />
                    </FormField>
                  </div>
                </CardBoxComponentBody>
                <CardBoxComponentFooter>
                  <Buttons>
                    <Button color="info" type="submit" label="Submit" />
                    <Button color="info" type="reset" label="Reset" outline />
                  </Buttons>
                </CardBoxComponentFooter>
              </Form>
            )}
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

export default AddNewCustomerPage

