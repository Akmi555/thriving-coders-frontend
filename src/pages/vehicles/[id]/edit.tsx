import * as Yup from 'yup'
import { mdiAccount, mdiAccountPlus, mdiCar, mdiGasStation, mdiMail } from '@mdi/js'
import Button from 'components/Button'
import CardBox from 'components/CardBox'
import SectionMain from 'components/Section/Main'
import SectionTitleLineWithButton from 'components/Section/TitleLineWithButton'
import { Field, Form, Formik } from 'formik'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getPageTitle } from 'src/config'
import { fetchOneVehicle } from 'src/hooks/vehicleData'
import { Vehicle } from 'interfaces/vehicles'
import FormField from 'components/Form/Field'
import CardBoxComponentBody from 'components/CardBox/Component/Body'
import CardBoxComponentFooter from 'components/CardBox/Component/Footer'
import Buttons from 'components/Buttons'
import editVehicleAsync from '../add/editVehicleAsync'
import { Bounce, toast, ToastContainer } from 'react-toastify'
import Icon from 'components/Icon'
import Divider from 'components/Divider'

const EditVehicle = () => {
  const [editVehicleData, setEditVehicleData] = useState({
    vehicle: null,
    isLoading: true,
    isError: false,
  })
  const router = useRouter();
  const { id } = router.query;

  console.log('vehicle id = ' + id); // TODO - удалить
  const EditVehicleValidationSchema = Yup.object().shape({
    model: Yup.string()
      .min(2, 'Model is too short!')
      .max(50, 'Model is too long!')
      .required('Model is required!'),
    weightCapacity: Yup.number()
      .min(2, 'Weight capacity is too small')
      .max(20000, 'Weight capacity is too big')
      .required('Weight capacity is required!'),
    fuelType: Yup.string().required('Fuel type is required!'),
    rangeWithCargo: Yup.number()
      .min(10, 'Range with Cargo is too small')
      .required('Range with Cargo is required'),
    rangeWithOutCargo: Yup.number()
      .min(10, 'Range is too small')
      .required('Range without Cargo is required'),
    fuelConsumptionWithCargo: Yup.number()
      .min(10, 'Fuel consumption with Cargo is too small')
      .required('Fuel consumption with Cargo is required'),
    usefulArea: Yup.number().min(10, 'Useful area is too small').required('Useful area is required'),
    costOfDelivery: Yup.number()
      .min(2, 'Cost of delivery is too small')
      .required('Cost of delivery is required'),
    status: Yup.string().min(2, 'Status is too small').required('Status is required'),
  })


  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchOneVehicle(id);
        console.log(result);
        setEditVehicleData({
          vehicle: result.vehicle,
          isLoading: false,
          isError: result.isError,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        setEditVehicleData({
          vehicle: null,
          isLoading: false,
          isError: true,
        });
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (editVehicleData.isLoading) {
    return <div>Loading...</div>;
  }

  if (editVehicleData.isError) {
    return <div>Error loading vehicle data</div>;
  }


  const showSuccessToast = () => {
    toast.success('New vehicle successfully added!', {
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

  const vehicle = editVehicleData.vehicle;
  const handleSubmit = async (vehicleData: Vehicle) => {
    try {
      setLoading(true);
      const response = await editVehicleAsync(vehicleData);
      if (response.status === 200) {
        setLoading(false);
        console.log('a vehicle is updated')
        showSuccessToast();
        // showSuccessToast();
      } else {
        // handle other statuses
      }

    } catch (error) {
      //setLoading(false);
      console.log('a vehicle is NOT updated')
    }
  }

  return (
    
    <>
      <Head>
        <title>{getPageTitle('Edited vehicle')}</title>
      </Head>
      <SectionMain>
      <SectionTitleLineWithButton icon={mdiCar} title="Edit specific vehicle" main>
      <Button
            href={`/vehicles/${id}`}
            // target="_blank"
            icon={mdiCar}
            label="Back to specific vehicle"
            color="contrast"
            roundedFull
            small
          />
        </SectionTitleLineWithButton>
          <CardBox>
          <Formik
          initialValues={{
              vehicleId: vehicle.vehicleId,
              model: vehicle.model,
              weightCapacity: vehicle.weightCapacity,
              fuelType: vehicle.fuelType,
              rangeWithCargo: vehicle.rangeWithCargo,
              rangeWithOutCargo: vehicle.rangeWithOutCargo,
              fuelConsumptionWithCargo: vehicle.fuelConsumptionWithCargo,
              usefulArea: vehicle.usefulArea,
              costOfDelivery: vehicle.costOfDelivery,
              status: vehicle.status,
            }}
             validationSchema={EditVehicleValidationSchema}
             onSubmit={handleSubmit}>

{({ errors, touched }) => (
              <Form className="flex flex-col flex-1">
                <CardBoxComponentBody>
                  <div className="grid grid-cols-2 gap-6">
                    <FormField
                      label="Model"
                      labelFor="model"
                      icons={[mdiAccount]}
                    //errors={[errors.model && touched.model ? errors.model : null]}
                    errors={[errors.model]}
                    >
                      <Field name="model" id="model" placeholder="Model" />
                    </FormField>

                    <FormField
                      label="Weight Capacity"
                      labelFor="weightCapacity"
                      icons={[mdiMail]}
                      errors={[errors.weightCapacity && touched.weightCapacity ? errors.weightCapacity : null]}
                    >
                      <Field name="weightCapacity" id="weightCapacity" placeholder="Weight Capacity" />
                    </FormField>

                    <FormField
                      label="Fuel Type"
                      labelFor="fuelType"
                      icons={[mdiGasStation]}
                      errors={[errors.fuelType && touched.fuelType ? errors.fuelType : null]}
                    >
                      <Field name="fuelType" id="fuelType" placeholder="Fuel Type" component="select">
                        <option value="">Please select fuel type</option>
                        <option value="ELECTRIC">Electric</option>
                        <option value="DIESEL">Diesel</option>
                        <option value="GASOLINE">Gasoline</option>
                        <option value="HYBRID">Hybrid</option>
                        <option value="NATURAL_GAS">Natural Gas</option>
                      </Field>
                    </FormField>

                    <FormField
                      label="Range with Cargo"
                      labelFor="rangeWithCargo"
                      icons={[mdiMail]}
                      errors={[errors.rangeWithCargo && touched.rangeWithCargo ? errors.rangeWithCargo : null]}
                    >
                      <Field name="rangeWithCargo" id="rangeWithCargo" placeholder="Range with Cargo" />
                    </FormField>

                    <FormField
                      label="Range without Cargo"
                      labelFor="rangeWithOutCargo"
                      icons={[mdiAccount]}
                      errors={[errors.rangeWithOutCargo && touched.rangeWithOutCargo ? errors.rangeWithOutCargo : null]}
                    >
                      <Field name="rangeWithOutCargo" id="rangeWithOutCargo" placeholder="Range without Cargo" />
                    </FormField>

                    <FormField
                      label="Fuel Consumption with Cargo"
                      labelFor="fuelConsumptionWithCargo"
                      icons={[mdiMail]}
                      errors={[errors.fuelConsumptionWithCargo && touched.fuelConsumptionWithCargo ? errors.fuelConsumptionWithCargo : null]}
                    >
                      <Field name="fuelConsumptionWithCargo" id="fuelConsumptionWithCargo" placeholder="Fuel Consumption with Cargo" />
                    </FormField>

                    <FormField
                      label="Useful Area"
                      labelFor="usefulArea"
                      icons={[mdiGasStation]}
                      errors={[errors.usefulArea && touched.usefulArea ? errors.usefulArea : null]}
                    >
                      <Field name="usefulArea" id="usefulArea" placeholder="Useful Area" />
                    </FormField>

                    <FormField
                      label="Cost of Delivery"
                      labelFor="costOfDelivery"
                      icons={[mdiMail]}
                      errors={[errors.costOfDelivery && touched.costOfDelivery ? errors.costOfDelivery : null]}
                    >
                      <Field name="costOfDelivery" id="costOfDelivery" placeholder="Cost of Delivery" />
                    </FormField>

                    <FormField
                      label="Status"
                      labelFor="status"
                      icons={[mdiAccount]}
                      errors={[errors.status && touched.status ? errors.status : null]}
                    >
                       <Field name="status" id="status" placeholder="status" component="select">
                        <option value="">Please select status</option>
                        <option value="OK">OK</option>
                        <option value="IN_REPAIR">In repair</option>
                        <option value="INACTIVE">Inactive</option>
                      </Field>
                    </FormField>
                  </div>
                </CardBoxComponentBody>
                <CardBoxComponentFooter>
                  <Divider/>
                  <Buttons>
                    <Button color="info" type="submit" label="Submit" />
      
                    <Button color="info" type="reset" label="Reset" outline />
                  </Buttons>
                </CardBoxComponentFooter>
              </Form>
            )}
              </Formik>
              <ToastContainer />
              </CardBox>  
        
      </SectionMain>
    </>
  );
};
export default EditVehicle;


function setLoading(arg0: boolean) {
  throw new Error('Function not implemented.')
}

