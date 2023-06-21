import { useContext, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import AppContext from "../Global/userContext"


export const useLogin = () => {
   
    const [credentials,setCredentials] = useState({ username: "",password: ""});

    const context = useContext(AppContext);
    const router = useRouter();

    const handleChange = (e) =>  {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            //peticion para el token
            const response = await axios.post("/api/auth/login", credentials);
            const responseUser = await axios.post("/api/auth/user");

            console.log(response);

            console.log(responseUser);
            
            if(response.status == 200){
                context.setUserContext({
                    username: responseUser.data.user,
                    password: responseUser.data.password
                })

                if(responseUser.data.user == "admin21"){
                    router.push('/app/Map');
                }else if(responseUser.data.user == "client21"){
                    router.push('/app/MapClient');
                }
            }
            

          } catch (error) {
            console.error(error.response.data);
          }
    }



    return { handleChange, handleSubmit }
}

