import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import LayoutAuthenticated from "src/layouts/Authenticated";
import Button from "components/Button";
import { mdiAccount } from "@mdi/js";
import CardBoxModal from "components/CardBox/Modal";
import SectionMain from "components/Section/Main";
import SectionTitleLineWithButton from "components/Section/TitleLineWithButton";
import { Head } from "next/document";
import { getPageTitle } from "src/config";
import deleteCustomerAsync from "../add/deleteCustomerAsync";


const DeleteCustomer = () => {
    const router = useRouter();
    const { id } = router.query;

    const deleteCustomer = async () => {
        deleteCustomerAsync(id)
      }
      const handleDeleteAction = () => {
        deleteCustomer()
        setIsModalInfoActive(false)
      }
      const handleCancelAction = () => {
        setIsModalInfoActive(false)
      }
      const [isModalInfoActive, setIsModalInfoActive] = useState(true)
      const modalSampleContents = (
        <>
          <p>
            Would you like to delete this customer <b>really delete?</b>
          </p>
          <p>In this case you will not be able to return it back</p>
        </>
      )
    
      return (
        <>
          <Head>
            <title>{getPageTitle('Delete customer')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiAccount} title="Delete specific customer" main>
              <Button
                //href={`/customers/${id}`}
                href={`/customers/`}
                // target="_blank"
                icon={mdiAccount}
                label="Back to existing customers"
                color="contrast"
                roundedFull
                small
              />
            </SectionTitleLineWithButton>
            <CardBoxModal
              title="Please confirm action"
              buttonColor="danger"
              buttonLabel="Delete"
              isActive={isModalInfoActive}
              onConfirm={handleDeleteAction}
              onCancel={handleCancelAction}
            >
              {modalSampleContents}
            </CardBoxModal>
          </SectionMain>
        </>
      )
    }
    export default DeleteCustomer;
    

//     // Define the deleteCustomerAsync function
//     const deleteCustomerAsync = async (customerId: string) => {
//         try {
//             const response = await fetch(`/api/customers/${customerId}`, {
//                 method: 'DELETE',
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to delete customer');
//             }

//             console.log('Customer deleted successfully');
//         } catch (error) {
//             console.error('Error deleting customer:', error);
//         }
//     };

//     useEffect(() => {
//         if (id) {
//             deleteCustomerAsync(id as string); // Ensure id is treated as a string
//         }
//     }, [id, router]);

//     return (
//         <>
//             <div>
//                 <h1>Deleting Customer {id}</h1>
//                 <p>Click to return to the dashboard...</p>
//                 <Button href="/dashboard" label="Go to Dashboard" />
//             </div>
//         </>
//     );
// };

// DeleteCustomer.getLayout = function getLayout(page: ReactElement) {
//     return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
// };


