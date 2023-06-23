import {  useState , useContext} from "react";
import { useRouter } from "next/router";
import jwt from 'jsonwebtoken'; 
import { serialize } from 'cookie';
import axios from "axios";
import AppContext from "../Global/userContext"



export const useLogin = () => {
   
    const [credentials,setCredentials] = useState({ email: "",password: ""});
    //const [loginError, setLoginError] = useState(null);

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
            const response = await axios.post('/api/auth/login',credentials);

            //peticion para obtener los datos del token
            const responseUser = await axios.post("/api/auth/user");

            console.log(response);

            context.setTokenContext(responseUser.data.token);

            if(response.status == 200 && responseUser.data.role == 'admin'){
                context.setUserContext({
                    username: responseUser.data.user,
                    role: responseUser.data.role
                })

                router.push('/app/Map');
            }
            
          } catch (error) {
           // setLoginError(/*error.response.data*/error);
            console.log(error);
          }
    }



    return { handleChange, handleSubmit, /*loginError, setLoginError*/ }
}

