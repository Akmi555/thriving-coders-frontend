import { mdiAccountClock, mdiAccount, mdiTruckDelivery, mdiFileEditOutline, mdiPencilOutline, mdiDeleteForeverOutline } from '@mdi/js';
import Button from 'components/Button';
import Buttons from 'components/Buttons';
import CardBoxModal from 'components/CardBox/Modal';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchOneCustomer } from 'src/hooks/customerData';
import Head from 'next/head';
import SectionMain from 'components/Section/Main';
import SectionTitleLineWithButton from 'components/Section/TitleLineWithButton';
import { getPageTitle } from 'src/config';
// import db from 'path/to/your/database';


const Customer = () => {
  const [customerData, setCustomerData] = useState({
    customer: null,
    isLoading: true,
    isError: false,
  });

  const router = useRouter();
  const { id } = router.query;

  console.log('customer id = ' + id); // TODO - удалить

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchOneCustomer(id);
        console.log(result);
        setCustomerData({
          customer: result.customer,
          isLoading: false,
          isError: result.isError,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        setCustomerData({
          customer: null,
          isLoading: false,
          isError: true,
        });
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (customerData.isLoading) {
    return <div>Loading...</div>;
  }

  if (customerData.isError) {
    return <div>Error loading customer data</div>;
  }

  const customer = customerData.customer;

  // export const getDeliveryAddressesByCustomerId = async (customerId) => {
  //   return db.deliveryAddresses.findAll({
  //     where: {
  //       customerId,
  //     },
  //   });
  // };

  return (
    <>
      <Head>
        <title>{getPageTitle('Specific customer')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiAccount} title="Information about specific customer" main>
          <Button
            href="/customers"
            // target="_blank"
            icon={mdiAccount}
            label="Back to customer's overview"
            color="contrast"
            roundedFull
            small
          />
        </SectionTitleLineWithButton>

        <div className="text-left mx-auto max-w-4xl">
          <p className="text-2xl font-bold">Customer Information</p>
          <table className="min-w-full divide-y divide-gray-200">
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Tax Identification Number</td>
                <td className="px-6 py-4 whitespace-nowrap">{customer.taxIdentificationNumber}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Company Name</td>
                <td className="px-6 py-4 whitespace-nowrap">{customer.companyName}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Legal Address</td>
                <td className="px-6 py-4 whitespace-nowrap">{customer.legalAddress}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Postal Code</td>
                <td className="px-6 py-4 whitespace-nowrap">{customer.postalCode}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Country</td>
                <td className="px-6 py-4 whitespace-nowrap">{customer.country}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Email</td>
                <td className="px-6 py-4 whitespace-nowrap">{customer.email}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Formik
          initialValues={{
            outline: false,
            small: false,
            icon: true,
            rounded: false,
            disabled: false,
          }}
          onSubmit={() => null}
        >
          {({ values }) => (
            <div className="buttons-container">
              <Button
                color="info"
                icon={mdiAccountClock}
                outline={values.outline}
                small={values.small}
                roundedFull={values.rounded}
                disabled={values.disabled}
              />
              <Button
                color="info"
                label="Show delivery adresses"
                href={`/customers/${id}/deliveryaddresses`}//TODO
                icon={mdiAccountClock}
                outline={values.outline}
                small={values.small}
                roundedFull={values.rounded}
                disabled={values.disabled}
              />
              <Button
                color="info"
                label="Edit"
                href={`/customers/${id}/edit`}//TODO
                icon={mdiPencilOutline}
                outline={values.outline}
                small={values.small}
                roundedFull={values.rounded}
                disabled={values.disabled}
              />
              <Button
                color="danger"
                label="Delete"
                href={`/customers/${id}/delete`}
                icon = {mdiDeleteForeverOutline}
                outline={values.outline}
                small={values.small}
                roundedFull={values.rounded}
                disabled={values.disabled}
              />
            </div>
          )}
        </Formik>
      </SectionMain>

      <style jsx>{`
        .buttons-container {
          display: flex;
          justify-content: center; /* Центровка кнопок по горизонтали */
          gap: 1rem; /* Отступы между кнопками */
          margin-top: 2rem; /* Отступ сверху */
        }
      `}</style>
    </>
  );
};

export default Customer;
