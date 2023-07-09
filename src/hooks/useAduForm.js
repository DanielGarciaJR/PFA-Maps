import {  useContext, useState } from "react"
import { useRef } from "react";
import AppContext from "@/Global/userContext";
import axios from "axios";


export const useAduForm = (modal) => {

    const [adu,setAdu] = useState({
        name: '',
        fts: 0,
        image: '',
        height: 0
    });

    const [error,setError] = useState(false);

    const context = useContext(AppContext);
    const aduFormRef = useRef();
    
    const handleChange = (e) => {
        e.preventDefault();

        setAdu({
            ...adu,
            [e.target.name]: e.target.value
        });
    }

    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const extention = adu.image.split('.').pop();

        if(extention === "png" || extention === "jpg" || extention === "jpeg") {
            try{
                const response = await axios.post('https://pfa-production.up.railway.app/pfa/adu',adu, {
                    headers: { 'Content-Type': 'multipart/form-data',  'Authorization': `Bearer ${context.tokenContext}`,},
                    mode: 'cors',  
                });
                setAdu({
                    name: '',
                    fts: 0,
                    image: '',
                    height: 0
                })
    
                if(response.status == 202){
                    modal(true);
                    aduFormRef.current.reset();
                }
            }catch(error){
                console.log(error);
            }
        }else{
           setError(true);
        }
    }


    return {handleChange, handleSubmit,aduFormRef,error,setError}
}