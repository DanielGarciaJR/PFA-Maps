import AppContext from "@/Global/userContext";
import axios from "axios"
import { useContext, useEffect, useState } from "react"

export const useFetchRoles = () => {

    const [roles,setRoles] = useState([]);
    const context = useContext(AppContext);

    useEffect(() => {
        const fetchRoles = async () => {
            try{
                const response = await axios.get(`${process.env.BASE_URL_API}/roles`, {
                    headers: { 'Content-Type': 'multipart/form-data',  'Authorization': `Bearer ${context.tokenContext}`,},
                    mode: 'cors',  
                })
    
                setRoles(response.data.data);
            }catch(error){
                console.log('error jeje');
            }
        }
        fetchRoles();
    },[roles]);


    return {roles}
}