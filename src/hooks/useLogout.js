import { useRouter } from "next/router";
import { useContext } from "react";
import AppContext from '@/Global/userContext';
import axios from "axios";

export const useLogout = () => {
    
    const context = useContext(AppContext);
    const router = useRouter();

    const logOut = async () => {
        try{
            await axios.post('/api/auth/logOut');
            context.setUserContext({
                username: '',
                password: '',
            });
            context.setTokenContext('');

            router.push('/app/MapClient');
        }catch(error){
            console.log(error);
            router.push('/app/MapClient');
        }
    }

    return {logOut}
}