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

interface FormValues {
  fullName: string;
  cardNumber: string;
  expirationMMYY: string;
  cvc: string;
  paymentMethod: 'Visa' | 'Paypal';
}
const CardValidationSchema = Yup.object().shape({// CAMEL CASE separate component, cardpage separate component
  fullName: Yup.string()
    .min(2, 'Full name is too short!')
    .max(50, 'Full name is too long!')
    .required('Full name is required!'),
  cardNumber: Yup.string()
    .matches(/^\[0-9]{16}$/, 'Invalid card number')
    .required('Card number is required!'),
  expirationMMYY: Yup.string()
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Invalid expiration date')
    .required('Expiration date is required!'),
  cvc: Yup.string()
    .matches(/^\d{3}$/, 'Invalid CVC')
    .required('CVC is required!'),
  paymentMethod: Yup.string().required('Please select a payment method'),
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
              fullName: '',
              cardNumber: '',
              expirationMMYY: '',
              cvc: '',
              paymentMethod: '',
            }}
            validationSchema={CardValidationSchema}
            onSubmit={(values: FormValues) => {
              alert(JSON.stringify(values, null, 2));
              // Handle form submission
            }}>
            {({ errors, touched }) => (
              <Form>
                <FormField
                  label="Full Name"
                  icons={[mdiAccountOutline]}
                  errors={errors.fullName && touched.fullName ? [errors.fullName] : null}>
                  <Field name="fullName" placeholder="Full Name" />
                </FormField>
                <FormField
                  label="Card Number"
                  icons={[mdiCreditCardOutline]}
                  errors={errors.cardNumber && touched.cardNumber ? [errors.cardNumber] : null}>
                  <Field type="number" name="cardNumber" placeholder="Card Number" />
                </FormField>
                <FormField
                  label="Expiration (MM/YY)"
                  icons={[mdiCalendar]}
                  errors={errors.expirationMMYY && touched.expirationMMYY ? [errors.expirationMMYY] : null}>
                  <Field name="expirationMMYY" placeholder="MM/YY" />
                </FormField>
                <FormField
                  label="CVC"
                  icons={[mdiLock]}
                  errors={errors.cvc && touched.cvc ? [errors.cvc] : null}>
                    {/* TODO */}
                  <Field type="password" name="cvc" placeholder="CVC" />
                </FormField>
                <FormField
                  label="Payment Method" //TODO separate component use context independent 
                  errors={errors.paymentMethod && touched.paymentMethod ? [errors.paymentMethod] : null}>
                  <label>
                    <Field type="radio" name="paymentMethod" value="Visa" />
                    Visa
                  </label>
                  <label>
                    <Field type="radio" name="paymentMethod" value="Paypal" />
                    Paypal
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





