
import { useContext, useState } from "react";
import AppContext from "@/Global/userContext";
import axios from "axios";


export const useRequestApprove = () => {
  
    const context = useContext(AppContext);
    const [approveModal,setApproveModal] = useState(false);
    
    const approveUserRequest = async (e,idRequest) => {
        e.preventDefault();

        try{
            const response = await axios.put(`${process.env.BASE_URL_API}/building/${idRequest}`, {}, {headers: {
                'Content-Type': 'multipart/form-data', 
                'Authorization': `Bearer ${context.tokenContext}`,
            } })

            if(response.status == 201){
                setApproveModal(true);
            }

        }catch(error){
            console.log(error);
    }
    };
    
   

    return {approveUserRequest,approveModal,setApproveModal}
}

