import AppContext from "@/Global/userContext";
import axios from "axios";
import { useRef } from "react";
import {  useContext, useEffect, useState } from "react"


export const useAduForm = () => {

    const [adu,setAdu] = useState({
        name: '',
        fts: 0,
        image: '',
        height: 0
    });

    const context = useContext(AppContext);
    
    
    const handleChange = (e) => {
        e.preventDefault();

        setAdu({
            ...adu,
            [e.target.name]: e.target.value
        });
    }

    

    const handleSubmit = async (e) => {
        e.preventDefault();

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

            alert('ADU saved...')
            console.log(response);
        }catch(error){
            console.log(error);
        }
    }


    return {handleChange, handleSubmit}
}