import { useContext, useEffect } from "react";
import AppContext from "@/Global/userContext";


export const useRequestInProgress = () => {

    const context = useContext(AppContext);


    useEffect(() => {
        const fetchData = async () => {
            // Fetch data from external API
           const res = await fetch(`https://pfa-production.up.railway.app/pfa/user/building`, {
            headers: { 'Content-Type': 'multipart/form-data',  'Authorization': `Bearer ${context.tokenContext}`,},
            mode: 'cors',  
       });

       const data = await res.json();
       context.setAduInProgress(data.data); 
    }


    fetchData();

    },[context.aduInProgress])
}