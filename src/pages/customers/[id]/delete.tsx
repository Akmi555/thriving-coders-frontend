import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";
import LayoutAuthenticated from "src/layouts/Authenticated";
import Button from "components/Button";

const DeleteCustomer = () => {
    const router = useRouter();
    const { id } = router.query;

    // Define the deleteCustomerAsync function
    const deleteCustomerAsync = async (customerId: string) => {
        try {
            const response = await fetch(`/api/customers/${customerId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete customer');
            }

            console.log('Customer deleted successfully');
        } catch (error) {
            console.error('Error deleting customer:', error);
        }
    };

    useEffect(() => {
        if (id) {
            deleteCustomerAsync(id as string); // Ensure id is treated as a string
        }
    }, [id, router]);

    return (
        <>
            <div>
                <h1>Deleting Customer {id}</h1>
                <p>Click to return to the dashboard...</p>
                <Button href="/dashboard" label="Go to Dashboard" />
            </div>
        </>
    );
};

DeleteCustomer.getLayout = function getLayout(page: ReactElement) {
    return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default DeleteCustomer;

{/*import  { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";
import LayoutAuthenticated from "src/layouts/Authenticated";
import Button from "components/Button";



    const DeleteCustomer = () => {
    const router = useRouter();
    const {id} = router.query;

    useEffect(()=>{

        const deleteCustomerAsync = async () => {deleteCustomerAsync(id)}

        if(id) {
            DeleteCustomer();
        }

    }, [id, router]);
    

    return (
        <>
            <div>
                <h1>Deleting Customer {id}...</h1>

                <p><Button href="/dashboard" label="Return to Dashboard" /></p>
            </div>
            
        
        </>
    )
    
}
DeleteCustomer.getLayout = function getLayout(page: ReactElement) {
    return <LayoutAuthenticated>{page}</LayoutAuthenticated>
  }

export default DeleteCustomer*/}