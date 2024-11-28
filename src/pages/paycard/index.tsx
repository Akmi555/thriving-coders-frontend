import React from 'react';
import Head from 'next/head';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { mdiAccountOutline, mdiCreditCardOutline, mdiCalendar, mdiLock } from '@mdi/js';

import SectionMain from 'components/Section/Main';
import Button from 'components/Button';
import CardBox from 'components/CardBox';
import Buttons from 'components/Buttons';
import FormField from 'components/Form/Field';
import { getPageTitle } from 'src/config';

import axios from 'axios';

interface FormValues {
  firstName: string;
  lastName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  paymentMethod: 'visa' | 'mastercard';
}
const CardValidationSchema = Yup.object().shape({// CAMEL CASE separate component, cardpage separate component
  firstName: Yup.string()
    .min(2, 'First name is too short!')
    .max(50, 'First name is too long!')
    .required('First name is required!'),
  lastName: Yup.string()
    .min(2, 'Last name is too short!')
    .max(50, 'Last name is too long!')
    .required('Last name is required!'),
  cardNumber: Yup.string()
    .matches(/^\d{16}$/, 'Invalid card number')
    .required('Card number is required!'),
  expiryDate: Yup.string()
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Invalid expiration date')
    .required('Expiration date is required!'),
  cvv: Yup.string()
    .matches(/^\d{3,4}$/, 'CVC or CVV must be 3 or 4 digits')
    .test('sum-of-digits', 'CVC or CVV digits must sum to 24', (value) => {
      if (!value) return false;
      const sum = value.split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
      return sum === 24;
    })
    .required('CVC or CVV is required!'),  
});
const PayCardPage: React.FC = () => { 
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
              expiryDate: '',
              cvv: '',
              paymentMethod: 'visa',
            }}
            validationSchema={CardValidationSchema}
            onSubmit={async (values: FormValues) => {
              //alert(JSON.stringify(values, null, 2));
              // Handle form submission
              try {
                const response = await axios.post('https://api.thriving-coders.com/payments', values);  
                alert(JSON.stringify(response.data, null, 2));
              } catch (error) {
                throw error.response.data;
              }
              


            }}>
            {({ errors, touched }) => (
              <Form>
                <FormField
                  label="First Name"
                  icons={[mdiAccountOutline]}
                  errors={errors.firstName && touched.firstName ? [errors.firstName] : null}>
                  <Field name="firstName" placeholder="First Name" />
                </FormField>
                <FormField
                  label="Last Name"
                  icons={[mdiAccountOutline]}
                  errors={errors.lastName && touched.lastName ? [errors.lastName] : null}>
                  <Field name="lastName" placeholder="Last Name" />
                </FormField>
                <FormField
                  label="Card Number"
                  icons={[mdiCreditCardOutline]}
                  errors={errors.cardNumber && touched.cardNumber ? [errors.cardNumber] : null}>
                  <Field type="string" name="cardNumber" placeholder="Card Number" />
                </FormField>
                <FormField
                  label="Expiration (MM/YY)"
                  icons={[mdiCalendar]}
                  errors={errors.expiryDate && touched.expiryDate ? [errors.expiryDate] : null}>
                  <Field name="expiryDate" placeholder="MM/YY" />
                </FormField>
                <FormField
                  label="CVC or CVV"
                  icons={[mdiLock]}
                  errors={errors.cvv && touched.cvv ? [errors.cvv] : null}>
                    {/* TODO */}
                  <Field type="password" name="cvv" placeholder="CVC or CVV" />
                </FormField>
                <FormField
                  label="Payment Method" //TODO separate component use context independent 
                  errors={errors.paymentMethod && touched.paymentMethod ? [errors.paymentMethod] : null}>
                  <label>
                    <Field type="radio" name="paymentMethod" value="visa" />
                    Visa
                  </label>
                  <label>
                    <Field type="radio" name="paymentMethod" value="mastercard" />
                    MasterCard
                  </label>
                </FormField>
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
};

export default PayCardPage;


// import React from 'react'
// import Head from 'next/head'
// import { Formik, Form, Field, ErrorMessage } from 'formik'
// import * as Yup from 'yup'
// import { mdiAccountOutline, mdiCreditCardOutline, mdiCalendar, mdiLock } from '@mdi/js'

// import SectionMain from 'components/Section/Main'
// import Button from 'components/Button'
// import CardBox from 'components/CardBox'
// import Buttons from 'components/Buttons'
// import FormField from 'components/Form/Field'
// import { getPageTitle } from 'src/config'

// interface FormValues {
//   fullName: string
//   cardNumber: string
//   expirationMMYY: string
//   cvc: string
// }

// const PayCardPage: React.FC = () => {
//   const CardValidationSchema = Yup.object().shape({
//     fullName: Yup.string()
//       .min(2, 'Full name is too short!')
//       .max(50, 'Full name is too long!')
//       .required('Full name is required!'),
//     cardNumber: Yup.string()
//       .matches(/^\d{12,19}$/, 'Invalid card number')
//       .required('Card number is required!'),
//     expirationMMYY: Yup.string()
//       .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Invalid expiration date')
//       .required('Expiration date is required!'),
//     cvc: Yup.string()
//       .matches(/^\d{3,4}$/, 'Invalid CVC')
//       .required('CVC is required!'),
//   })

//   return (
//     <>
//       <Head>
//         <title>{getPageTitle('Paycard checking')}</title>
//       </Head>
//       <SectionMain>
//         <CardBox>
//           <Formik
//             initialValues={{
//               fullName: '',
//               cardNumber: '',
//               expirationMMYY: '',
//               cvc: '',
//             }}
//             validationSchema={CardValidationSchema}
//             onSubmit={(values: FormValues) => {
//               alert(JSON.stringify(values, null, 2))
//               // Handle form submission
//             }}
//           >
//             {({ errors, touched }) => (
//               <Form>
//                 <FormField
//                   label="Full Name"
//                   icons={[mdiAccountOutline]}
//                   errors={errors.fullName && touched.fullName ? [errors.fullName] : null}
//                 >
//                   <Field name="fullName" placeholder="Full Name" />
//                 </FormField>
//                 <FormField
//                   label="Card Number"
//                   icons={[mdiCreditCardOutline]}
//                   errors={errors.cardNumber && touched.cardNumber ? [errors.cardNumber] : null}
//                 >
//                   <Field name="cardNumber" placeholder="Card Number" />
//                 </FormField>
//                 <FormField
//                   label="Expiration (MM/YY)"
//                   icons={[mdiCalendar]}
//                   errors={errors.expirationMMYY && touched.expirationMMYY ? [errors.expirationMMYY] : null}
//                 >
//                   <Field name="expirationMMYY" placeholder="MM/YY" />
//                 </FormField>
//                 <FormField
//                   label="CVC"
//                   icons={[mdiLock]}
//                   errors={errors.cvc && touched.cvc ? [errors.cvc] : null}
//                 >
//                   <Field name="cvc" placeholder="CVC" />
//                 </FormField>
//                 <Buttons>
//                   <Button type="submit" color="info" label="Submit" />
//                   <Button type="reset" color="info" outline label="Reset" />
//                 </Buttons>
//               </Form>
//             )}
//           </Formik>
//         </CardBox>
//       </SectionMain>
//     </>
//   )
// }

// export default PayCardPage





