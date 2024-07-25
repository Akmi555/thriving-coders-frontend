import { mdiAbTesting, mdiPlus } from '@mdi/js'
import Button from 'components/Button'
import Buttons from 'components/Buttons'
import FormField from 'components/Form/Field'
import SectionMain from 'components/Section/Main'
import { Field, Form, Formik } from 'formik'
import Head from 'next/head'
import { getPageTitle } from 'src/config'
import * as Yup from 'yup'

const TestForm = () => {
  const AddTestValidationSchema = Yup.object().shape({
    test: Yup.number()
      .min(10, 'Число должно быть не меньше 10')
      .max(50, 'Число должно быть не больше 50')
      .integer('Число должно быть целым')
      .required('Введите число, оно обязательно к заполнению'),
    test2: Yup.string()
      .min(2, 'Строка должна быть не  меньше 2 символов')
      .max(12, 'Строка должна быть не  больше 12 символов')
      .required('Введите строку, ввод обязателен'),
  })

  return (
    <>
      <Head>
        <title>{getPageTitle('Hello Test')}</title>
      </Head>

      <SectionMain>
        <Formik
          initialValues={{ test: '',
            test2: ''

          }}
          validationSchema={AddTestValidationSchema}
          onSubmit={() => console.log('send data to server')}
        >
          {({ errors, touched }) => (
            <Form>
              <FormField
                label="Please insert Test"
                icons={[mdiAbTesting]}
                errors={[errors.test && touched.test ? errors.test : null]}
              >
                <Field name="test" placeholder="Input please Test" />
              </FormField>

              <FormField
                label="Please insert Test2"
                icons={[mdiPlus]}
                errors={[errors.test2 && touched.test2 ? errors.test2 : null]}
              >
                <Field name="test2" placeholder="Input please Test2" />
              </FormField>
              <Buttons>
                <Button type="submit" color="info" label="Submit" />
                <Button type="reset" color="info" outline label="Reset" />
              </Buttons>
            </Form>
          )}
        </Formik>
      </SectionMain>
    </>
  )
}

export default TestForm
