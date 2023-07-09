import AppContext from "@/Global/userContext"
import axios from "axios";
import { useEffect, useContext } from "react"

export const useUserRequestSection = () => {
 
    const context = useContext(AppContext);

    useEffect(() => {
        
        const fetchPendingAdu = async() => {
            try{
                const response = await axios.get(`${process.env.BASE_URL_API}/building`, {
                    headers: { 
                        'Content-Type': 'multipart/form-data',  
                        'Authorization': `Bearer ${context.tokenContext}`
                    },
                    mode: 'cors',  
                });
                
               context.setPendingAduReqContext(response.data.data);
            }catch(error){
                console.log(error);
            }
        }
        

        fetchPendingAdu();
    })

}