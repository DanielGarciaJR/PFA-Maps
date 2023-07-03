import { useState, useContext, useRef } from "react"
import axios from "axios";
import AppContext from "@/Global/userContext";

export const useBuildingForm = (id) => {

    const [request,setRequest] = useState({
        client_name: "",
        client_last_name: "",
        client_email: "",
        client_phone: "",
    });

    const buildingFormRef = useRef(null);
    const context = useContext(AppContext);


    const handleChange = (e) => {
        e.preventDefault();

       setRequest({
            ...request,
            [e.target.name]: e.target.value
       })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('client_name',request.client_name);
        formData.append('client_last_name',request.client_last_name);
        formData.append('client_email',request.client_email);
        formData.append('client_phone',request.client_phone);

        try{
            const response = await axios.post(`${process.env.BASE_URL_API}/adu/${id}/building`,formData, {
                headers: { 'Content-Type': 'multipart/form-data',  'Authorization': `Bearer ${context.tokenContext}`,},
                mode: 'cors',  
            });
            console.log(response);

            setRequest({
                client_name: "",
                client_last_name: "",
                client_email: "",
                client_phone: "",
            })

            if(response.status == 202){
                alert('Done!,We will review your request');
                buildingFormRef.current.reset();    
            }
            
            //location.reload();
        }catch(error){
            console.log(error);
        }  
    }

    
    return {handleChange, handleSubmit ,buildingFormRef }
}