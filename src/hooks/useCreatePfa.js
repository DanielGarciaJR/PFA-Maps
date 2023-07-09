import AppContext from "@/Global/userContext";
import axios from "axios";
import { useContext } from "react";

export const  useCreatePfa = (modal) => {
    
    const context = useContext(AppContext);

    const createPfaReport = async (e,id) => {

        e.preventDefault();


        try{
            const response = await axios.post(`${process.env.BASE_URL_API}/building/${id}/pfa`, {}, {headers: {
                'Content-Type': 'multipart/form-data', 
                'Authorization': `Bearer ${context.tokenContext}`,
            } });

            if(response.status = 202){
               console.log(response);
            }
          
        }catch(error){
            console.log(error);
        }
    }

    return {createPfaReport}
}