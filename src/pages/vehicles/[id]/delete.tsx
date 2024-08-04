import  { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";
import deleteVehicleAsync from "../add/deleteVehicleAsync";
import LayoutAuthenticated from "src/layouts/Authenticated";
import VehiclesPage from "..";
import Button from "components/Button";


const DeleteVehicle = () => {
    const router = useRouter();
    const {id} = router.query;

    useEffect(()=>{

        const deleteVehicle = async () => {deleteVehicleAsync(id)}

        if(id) {
            deleteVehicle();
        }

    }, [id, router]

    )
    

    return (
        <>
            <div>
                <h1>Deleting Vehicle {id} </h1>
                <p>Click to return dashboard ...link</p>
            </div>
            
        
        </>
    )
    
}
DeleteVehicle.getLayout = function getLayout(page: ReactElement) {
    return <LayoutAuthenticated>{page}</LayoutAuthenticated>
  }

export default DeleteVehicle