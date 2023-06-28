import { useContext } from "react";
import AppContext from "@/Global/userContext";
import axios from "axios"

export const useDeleteAdu = (id) => {

    const context = useContext(AppContext);

    const deleteAdu =  async (e) => {
       e.preventDefault();

        try{
            const response = await axios.delete(`${process.env.BASE_URL_API}/adu/${id}`, {
                headers: { 'Content-Type': 'multipart/form-data',  'Authorization': `Bearer ${context.tokenContext}`,},
                mode: 'cors',  
            });
            console.log(response);
        }catch(error){
            console.log(error);
        }
    }

    return { deleteAdu }
}

