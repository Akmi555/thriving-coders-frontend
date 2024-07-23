import {
  mdiAccount,
  mdiAsterisk,
  mdiFormTextboxPassword,
  mdiGasStation,
  mdiGithub,
  mdiMail,
  mdiUpload,
} from '@mdi/js'
import { Formik, Form, Field } from 'formik'
import Head from 'next/head'
import type { ReactElement } from 'react'
import Button from 'components/Button'
import Buttons from 'components/Buttons'
import Divider from 'components/Divider'
import CardBox from 'components/CardBox'
import CardBoxComponentBody from 'components/CardBox/Component/Body'
import CardBoxComponentFooter from 'components/CardBox/Component/Footer'
import FormField from 'components/Form/Field'
import FormFilePicker from 'components/Form/FilePicker'
//import LayoutAuthenticated from 'layouts/Authenticated'
import SectionMain from 'components/Section/Main'
import SectionTitleLineWithButton from 'components/Section/TitleLineWithButton'
import CardBoxUser from 'components/CardBox/User'
import { useAppSelector } from 'src/stores/hooks'
import { UserForm } from 'interfaces/index'
import { getPageTitle } from 'src/config'
import { title } from 'process'
import LayoutAuthenticated from 'src/layouts/Authenticated'
import ProfilePage from 'src/pages/profile'
//import type { UserForm } from 'interfaces'
//import { getPageTitle } from 'config'
//import { useAppSelector } from 'stores/hooks'

const ProflePage = () =>  {
  const userName = useAppSelector((state) => state.main.userName)
  const userEmail = useAppSelector((state) => state.main.userEmail)
 { /*const AddVehicleValidationSchema = Yup.object().shape({
    model: Yup.string()
      .min(2, 'model is too short!')
      .max(50, 'model is too long!')
      .required('model is required!'),
    weightCapacity: Yup.number()
      .min(2, 'Weight capacity is too small')
      .max(5000, 'Weight capacity is too big')
      .required('Weight capacity is required!'),
    fuelType: Yup.string().required('fuel type is required!'),
    rangeWithCargo: Yup.number()
      .min(10, 'Range with Cargo is too  small')
      .required('Range is required'),
    rangeWithoutCargo: Yup.number()
      .min(10, 'Range is too  small')
      .required('Range with Cargo is required'),
    fuelConsumptionWithCargo: Yup.number()
      .min(10, 'Fuel consumption with Cargo is too  small')
      .required('Fuel consumption with Cargo is required'),
    usefulArea: Yup.number().min(10, 'usefulArea is too  small').required('usefulArea is required'),
    costOfDelivery: Yup.number()
      .min(2, 'cost Of Delivery is too  small')
      .required('Range is required'),
    status: Yup.string().min(2, 'statue is too  small').required('status is required'),
  })*/}

  const userForm: UserForm = {
    name: userName,
    email: userEmail,
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Vehicle')}</title>
      </Head>

      <SectionMain>
       <SectionTitleLineWithButton icon={mdiAccount} title="Vehicle" main>
          <Button
            href="https://github.com/justboil/admin-one-react-tailwind"
            target="_blank"
            icon={mdiGithub}
            label="Star on GitHub"
            color="contrast"
            roundedFull
            small
          />
        </SectionTitleLineWithButton>

        <CardBoxUser className="mb-6" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col">
            {/*<CardBox className="mb-6">
                <FormField label="Avatar" help="Max 500kb">
                  <FormFilePicker label="Upload" color="info" icon={mdiUpload} />
                </FormField>
              </CardBox>*/}

            <CardBox className="flex-1" hasComponentLayout>
              <Formik
                initialValues={userForm}
                onSubmit={(values: UserForm) => alert(JSON.stringify(values, null, 2))}
              >
                <Form className="flex flex-col flex-1">
                  <CardBoxComponentBody>
                    <FormField
                      label="Model"
                      help="Required. Insert vehicle's model"
                      labelFor="model"
                      icons={[mdiAccount]}
                    >
                      <Field name="model" id="model" placeholder="Model" />
                    </FormField>
                    <FormField
                      label="Weight Capacity"
                      help="Required. Insert Weight Capacity"
                      labelFor="weightCapacity"
                      icons={[mdiMail]}
                    >
                      <Field
                        name="weightCapacity"
                        id="weightCapacity"
                        placeholder="weightCapacity"
                      />
                    </FormField>
                    <FormField
                      label="Fuel Type"
                      help="Required. Fuel Type"
                      labelFor="fuelType"
                      icons={[mdiGasStation]}
                    >
                      <Field
                        name="fuelType"
                        id="fuelType"
                        placeholder="FuelType"
                        component="select"
                      />
                      {/*<option value="">Please select fuel Type</option>
                      <option value="electric">Electric</option>
                      <option value="diesel">Diesel</option>
                      <option value="gasoline">Gasoline</option>
                      <option value="hybrid">Hybrid</option>
                      <option value="natural_gas">Natural_gas</option>*/}
                    </FormField>
                    <FormField
                      label="Range with Cargo"
                      help="Required. Range with Cargo"
                      labelFor="rangeWithCargo"
                      icons={[mdiMail]}
                    >
                      <Field name="rangeWithCargo" id="rangeWithCargo" placeholder="rageWithCargo" />
                    </FormField>
                  </CardBoxComponentBody>                 
                  <CardBoxComponentFooter>
                   {/* <Buttons>
                      <Button color="info" type="submit" label="Submit" />
                      <Button color="info" label="Options" outline />
                    </Buttons>*/}
                  </CardBoxComponentFooter>
                </Form>
              </Formik>
            </CardBox>
          </div>

          <CardBox hasComponentLayout>
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
              }}
              onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
            >
              <Form className="flex flex-col flex-1">
                <CardBoxComponentBody>
                <FormField
                      label="Range without Cargo"
                      help="Required. Range without Cargo"
                      labelFor="rangeWithOutCargo"
                      icons={[mdiAccount]}
                    >
                      <Field name="rangeWithOutCargo" id="rangeWithOutCargo" placeholder="Range without Cargo" />
                    </FormField>
                    <FormField
                      label="Fuel Consumption with Cargo"
                      help="Required. Fuel Consumption with Cargo"
                      labelFor="fuelConsumpltionWithCargo"
                      icons={[mdiMail]}
                    >
                      <Field
                        name="fuelConsumpltionWithCargo"
                        id="fuelConsumpltionWithCargo"
                        placeholder="fuelConsumpltionWithCargo"
                      />
                    </FormField>
                    <FormField
                      label="Useful area"
                      help="Required. Useful area"
                      labelFor="usefulArea"
                      icons={[mdiGasStation]}
                    >
                      <Field
                        name="usefulArea"
                        id="fusefulArea"
                        placeholder="usefulArea"
                      />
                    </FormField>
                    <FormField
                      label="Cost of delivery"
                      help="Required. Cost of delivery"
                      labelFor="costOfDelivery"
                      icons={[mdiMail]}
                    >
                      <Field name="costOfDelivery" id="costOfDelivery" placeholder="costOfDelivery" />
                    </FormField>
                </CardBoxComponentBody>

                <CardBoxComponentFooter>
                  <Buttons>
                    <Button color="info" type="submit" label="Submit" />
                    <Button color="info" label="Options" outline />
                  </Buttons>
                </CardBoxComponentFooter>
              </Form>
            </Formik>
          </CardBox>
        </div>
      </SectionMain>
    </>
  )
}

ProfilePage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default ProfilePage
//export default AddNewVehiclePage