import  { useRouter } from "next/router";
import { useEffect } from "react";
import deleteVehicleAsync from "../add/deleteVehicleAsync";


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

export default DeleteVehicle