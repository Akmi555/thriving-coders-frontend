import Head from 'next/head'
import { Route } from 'next'
import { mdiCarEstate } from '@mdi/js'
import { mdiGasStation } from '@mdi/js'
import { mdiPlus } from '@mdi/js'

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

const AddNewVehiclePage = () => {
  const AddVehicleValidationSchema = Yup.object().shape({
    model: Yup.string()
      .min(2, 'model is too short!')
      .max(50, 'model is too long!')
      .required('model is required!'),
    weightCapacity: Yup.number()
      .required('Weight capacity is required!')
      .min(2, 'Weight capacity must be at least 2!')
      .max(200, 'Weight capacity must be 50 or less!')
      .integer()
      .typeError('Поле должно быть числом'),


    fuelType: Yup.string().min(5, 'fuelType too short!').required('Contact information required!'),
    rangeWithCargo: Yup.number().min(2, 'Range is too  small').required('Range is required'),
    //rangeWithOutCargo: Yup.number().min(2, 'Range is too  small').required('Range is required'),
    //fuelConsumptionWithCargo: Yup.number()
    //  .min(2, 'Range is too  small')
    //  .required('Range is required'),
    //usefulArea: Yup.number().min(2, 'usefulArea is too  small').required('usefulArea is required'),
    //costOfDelivery: Yup.number().min(2, 'Range is too  small').required('Range is required'),
    //status: Yup.string().min(2, 'statue is too  small').required('status is required'),
  })

  const getFuelType = async () => {
    const response = await fetch('http://localhost:4567/vehicles/type/fuels')
    const result = response.json()

    console.log('Result=' + result)
  }

  const fetcher = (url: string) => fetch(url).then((res) => res.json())
  const fetchAllEmployees = async () => {
    try {
      const response = await fetcher('http://localhost:4567/vehicles/type/fuels')
      console.log(response)
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

  const handleSubmit = () => {
    console.log('hello world')
  }
  {
    /*function handleSubmit(vehicleData: { model: string; weightCapacity: string; fuelType: string; rangeWithCargo: string; rangeWithOutCargo: string; fuelConsumptionWithCargo: string; usefulArea: string; costOfDelivery: string; state: string; }) {
    console.log("hello world");
    throw new Error('Function not implemented.');
  }*/
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
    <>
      <Head>
        <title>{getPageTitle('Add new vehicle')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiPlus} title="Add new vehicle" main>
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
              model: '',
              weightCapacity: '',
              fuelType: '',
              rangeWithCargo: '',
              rangeWithOutCargo: '',
              fuelConsumptionWithCargo: '',
              usefulArea: '',
              costOfDelivery: '',
              state: '',
            }}
            validationSchema = {AddVehicleValidationSchema}
            //onSubmit={async(vehicleData) => handleSubmit(vehicleData)}
            onSubmit={() => console.log('hello world++++++++++++++')}
          >
            {({ errors, touched }) => (
              <Form>
                <FormField
                  label="Select vehicle's model and weight Capacity"
                  labelFor="position"
                  icons={[mdiAccountSettings, mdiCurrencyBtc]}
                >
                  <Field name="model" placeholder="model"></Field>
                  <Field name="weightCapacity" placeholder="weight capacity" />
                </FormField>

                <FormField
                  label="Select vehicle's fuel Type"
                  labelFor="position"
                  icons={[mdiGasStation]}
                >
                  <Field name="fuelType" id="fuelType" component="select">
                    <option value="">Please select fuel Type</option>
                    <option value="electric">Electric</option>
                    <option value="diesel">diesel</option>
                    <option value="gasoline">gasoline</option>
                    <option value="hybrid">hybryde</option>
                    <option value="natural_gas">natural_gas</option>
                  </Field>
                </FormField>
                <FormField
                  label="range with Cargo and range without Cargo"
                  labelFor="rangeWithCargo"
                  // help="Phone numbers or email addresses"
                  icons={[mdiAccountSettings, mdiCurrencyBtc]}
                  errors={
                    errors.rangeWithCargo && touched.rangeWithCargo
                      ? [errors.rangeWithCargo]
                      : null
                  }
                >
                  <Field name="rangeWithCargo" placeholder="rangeWithCargo+++" />
                  <Field name="rangeWithOutCargo" placeholder="rangeWithOutCargo" />
                </FormField>
                <FormField
                  label="fuel consumption with Cargo"
                  labelFor="position"
                  icons={[mdiAccountSettings, mdiCurrencyBtc]}
                >
                  <Field name="fuelConsumptionWithCargo" placeholder="fuelConsumptionWithCargo" />
                </FormField>

                <FormField
                  label="Select useful Area and cost of Delivery"
                  labelFor="usefulArea"
                  icons={[mdiAccountSettings, mdiCurrencyBtc]}
                >
                  <Field id="usefulArea" name="usefulArea" placeholder="useful Area">
                    {/* <option value="electro">Electro</option>
                    <option value="diesel">Diesel</option>
                    <option value="benzin">Benzin</option>
                    <option value="architect">Hybrid</option>*/}
                  </Field>

                  <Field name="costOfDelivery" placeholder="Cost of Delivery" />
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
