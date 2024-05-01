import React from 'react'
import Head from 'next/head'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import {
  mdiAccount,
  mdiAccountMultipleOutline,
  mdiAccountOutline,
  mdiAccountPlus,
  mdiAccountSettings,
  mdiCurrencyBtc,
  mdiEmailOutline,
  mdiMail,
  mdiPhoneClassic,
} from '@mdi/js'

import SectionMain from 'components/Section/Main'
import Button from 'components/Button'
import SectionTitleLineWithButton from 'components/Section/TitleLineWithButton'
import CardBox from 'components/CardBox'
import Buttons from 'components/Buttons'
import Divider from 'components/Divider'
import FormField from 'components/Form/Field'
import { getPageTitle } from 'src/config'

const PayCardPage: React.FC = () => {
  //This defines a functional component named PayCardPage.
  //It is defined as a React functional component (React.FC),
  //indicating that it doesn't take any props.

  const CardValidationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'First name is too short!')
      .max(50, 'First name is too long!')
      .required('First name is required!'),
    lastName: Yup.string()
      .min(2, 'Last name is too short!')
      .max(50, 'Last name is too long!')
      .required('Last name is required!'),
    cardNumber: Yup.string()
      .min(12, 'Contact information too short!') // TODO =12
      .required('Contact information required!'),
  })

  return (
    <>
      <Head>
        <title>{getPageTitle('Paycard checking')}</title>
      </Head>
      <SectionMain>
        <CardBox>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              cardNumber: '',
              // TODO Add other fields if needed
            }}
            validationSchema={CardValidationSchema}
            onSubmit={(cardData) => {
              alert(cardData) //TODO JSON
              // TODO Handle form submission
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <FormField
                  label="Please insert First and Last name"
                  icons={[mdiAccountOutline, mdiAccount]}
                  errors={[
                    errors.firstName && touched.firstName ? errors.firstName : null,
                    errors.lastName && touched.lastName ? errors.lastName : null,
                  ]}
                >
                  <Field name="firstName" placeholder="First name" />
                  <Field name="lastName" placeholder="Last name" />
                </FormField>
                <FormField
                                    label="Provide Your contact information"
                                    labelFor="cardNumber"
                                    // help="Phone numbers or email addresses"
                                    icons={[mdiPhoneClassic]}
                                    errors={errors.cardNumber && touched.cardNumber ? [errors.cardNumber] : null}
                                >
                                    <Field name="cardNumber" placeholder="Contact information about new employee" id="cardNumber" />
                                </FormField>
                {/* TODO Add other form fields */}
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
  )
}

export default PayCardPage

// import React from 'react';
// import Head from 'next/head'
// import { Formik, Form, Field } from 'formik'
// import * as Yup from 'yup';
// import { mdiAccount, mdiAccountMultipleOutline, mdiAccountOutline, mdiAccountPlus, mdiAccountSettings, mdiCurrencyBtc, mdiEmailOutline, mdiMail, mdiPhoneClassic } from '@mdi/js'

// import SectionMain from 'components/Section/Main'
// import Button from 'components/Button'
// import SectionTitleLineWithButton from 'components/Section/TitleLineWithButton'
// import CardBox from 'components/CardBox'
// import Buttons from 'components/Buttons'
// import Divider from 'components/Divider'
// import FormField from 'components/Form/Field'

// const PayCardPage: React.FC = () => {

//   const AddPayCardValidationSchema = Yup.object().shape(
//     {
//         firstName: Yup.string()
//             .min(2, 'First name is too short!')
//             .max(50, 'First name is too long!')
//             .required('First name is required!'),
//         lastName: Yup.string()
//             .min(2, 'Last name is too short!')
//             .max(50, 'Last name is too long!')
//             .required('Last name is required!'),
//         cardNumber: Yup.string()
//             .min(5, 'Contact information too short!')
//             .required('Contact information required!')
//     }
// );

//     return (
//       <div>
//         <h1>Paycard Page !</h1>
//         {/* Здесь можете добавить ваш контент */}
//       </div>
//     );
//   };

//   export default PayCardPage;
