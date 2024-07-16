import Head from 'next/head'
import { Route } from 'next'
import { mdiCarEstate } from '@mdi/js'

import { Formik, Form, Field } from 'formik'
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
import { getPageTitle } from '../../../config'
import CardBox from 'components/CardBox'
import Buttons from 'components/Buttons'
import Divider from 'components/Divider'
import FormField from 'components/Form/Field'
import { ReadableStreamDefaultController } from 'stream/web'

const AddNewVehiclePage = () => {
  const AddVehicleValidationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'First name is too short!')//TODO change to veh
      .max(50, 'First name is too long!')
      .required('First name is required!'),
    lastName: Yup.string()
      .min(2, 'Last name is too short!')
      .max(50, 'Last name is too long!')
      .required('Last name is required!'),
    contactInfo: Yup.string()
      .min(5, 'Contact information too short!')
      .required('Contact information required!'),
  })

     const getFuelType=async ()=>{
    const response =  await fetch("http://localhost:4567/vehicles/type/fuels")
    const result = response.json()

        console.log("Result="+result);
     }

     const fetcher = (url: string) => fetch(url).then((res) => res.json());
      const fetchAllEmployees = async () => {
        try {
            const response = await fetcher('http://localhost:4567/vehicles/type/fuels');
            console.log(response);
            // return {
            //     employees: response ?? [],
            //     isLoading: false,
            //     isError: false,
            // // };
        } catch (error) {
            // return {
            //     employees: [],
            //     isLoading: false,
            //     isError: true,
            // };
        }
    }


//   const response = await fetch("http://localhost:4567/vehicles/type/fuels")
//   const result = await response.json()

//   if (!response.ok) {
//     rejectWithValue(result)
//   } else {
//     return result
//   }
// },
// {
//   pending: (state: RandomUserState) => {
//     state.error = undefined
//     state.isLoading = true
//   },
//   fulfilled: (state: RandomUserState, action: PayloadAction<any>) => {
//     state.isLoading = false
//     state.data = action.payload.results[0]
//   },
//   rejected: (state: RandomUserState, action: PayloadAction<any>) => {
//     state.isLoading = false
//     state.error = action.payload
//   },
// },
// ),
// }),

  return (
    <> <input type="button" onClick={fetchAllEmployees} value="Click me"/>

      <Head>
        <title>{getPageTitle('Add new vehicle')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiAccountPlus} title="Add new vehicle" main>
          <Button
            href="/vehicles/"
            // target="_blank"
            icon={mdiAccountMultipleOutline}
            label="Back to vehicle overview"
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
              model: '',
              vehicleCapacity: '',
              fuelType: '',
              rangeWithCargo: 0,
              rangeWithoutCargo: 0,
              fuelConsumptionWithCargo: 0,
              usefulArea: 0.0,
              costOfDelivery: 0.0,
              contactInfo: '',
            }}
            
            validationSchema={AddVehicleValidationSchema}
            onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
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
                  <Field name="name" placeholder=" name" />
                </FormField>
                <FormField
                  label="Please insert vehicle's model"
                  icons={[mdiAccountOutline, mdiAccount]}
                  errors={[errors.model && touched.model ? errors.model : null]}
                >
                  <Field name="model" placeholder="modele" />
                </FormField>

                <FormField
                  label="Provide Your contact information"
                  labelFor="contactInfo"
                  // help="Phone numbers or email addresses"
                  icons={[mdiPhoneClassic]}
                  errors={errors.contactInfo && touched.contactInfo ? [errors.contactInfo] : null}
                >
                  <Field
                    name="contactInfo"
                    placeholder="Contact information about new employee"
                    id="contactInfo"
                  />
                </FormField>

                <FormField
                  label="Select position and hourly rate"
                  labelFor="position"
                  icons={[mdiAccountSettings, mdiCurrencyBtc]}
                >
                  <Field name="position" id="position" component="select">
                    <option value="electro">Electro</option>
                    <option value="diesel">Diesel</option>
                    <option value="benzin">Benzin</option>
                    <option value="architect">Hybrid</option>
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
  )
}

export default AddNewVehiclePage
function rejectWithValue(result: any) {
    throw new Error('Function not implemented.')
}

