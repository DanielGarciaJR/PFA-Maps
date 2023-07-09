import { useContext, useEffect } from "react";
import AppContext from "@/Global/userContext";

export const useAduCatalog = () => {
    const context = useContext(AppContext);  

    useEffect(() => {
        const fetchData = async () => {
             // Fetch data from external API
            const res = await fetch(`https://pfa-production.up.railway.app/pfa/adu`, {
             headers: { 'Content-Type': 'multipart/form-data',  'Authorization': `Bearer ${context.tokenContext}`,},
             mode: 'cors',  
        });

        const data = await res.json();
        context.setAduContext(data);
    }
        
    fetchData();

    },[context.aduContext])
};