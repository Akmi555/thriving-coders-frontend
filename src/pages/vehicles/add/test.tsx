import { mdiAbTesting } from "@mdi/js";
import Button from "components/Button";
import Buttons from "components/Buttons";
import FormField from "components/Form/Field";
import SectionMain from "components/Section/Main";
import { Field, Form, Formik } from "formik";
import Head from "next/head";
import { getPageTitle } from "src/config";
import * as Yup from 'yup';


const TestForm = () => {

    const AddTestValidationSchema = Yup.object().shape(
        {
            test: Yup.number()
                .min(10, 'Число должно быть не меньше 10')
                .max(50, 'Число должноп быть не больше 50')
                .integer('Число должно быть целым')
                .required('Введите число, оно обязательно к заполнению')
        }
    )


    return (
        <>
            <Head>
                <title>{getPageTitle('Hello Test')}</title>
            </Head>

            <SectionMain>

                <Formik initialValues={{ test: '123' }} onSubmit={() => console.log('send data to server')}>
                    <Form>

                        <FormField label="Please insert Test" icons={[mdiAbTesting]}>
                            <Field name="test" placeholder="Input please Test" />
                        </FormField>

                        <Buttons>
                            <Button type="submit" color="info" label="Submit" />
                            <Button type="reset" color="info" outline label="Reset" />
                        </Buttons>
                    </Form>
                </Formik>

            </SectionMain >
        </>

    )
}

export default TestForm;