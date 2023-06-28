import axios from "axios";
import AppContext from "@/Global/userContext";
import { useState, useContext } from "react";

export const useUserForm = () => {

    const [newUser, setNewUser] = useState({
        name: '',
        last_name: '',
        user_name: '',
        email: '',
        roles: []
    });

    const context = useContext(AppContext);

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
      
        if (name === 'roles') {
          const selectedRoles = Array.from(e.target.selectedOptions, (option) => option.value);
          setNewUser({
            ...newUser,
            roles: selectedRoles,
          });
        } else {
          setNewUser({
            ...newUser,
            [name]: value,
          });
        }
      };
      
    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post(`${process.env.BASE_URL_API}/user`,newUser,{
                headers: { 'Content-Type': 'multipart/form-data',  'Authorization': `Bearer ${context.tokenContext}`,},
                mode: 'cors',  
            });  
            
            if(response.status == 202){
                alert('User added');
            }
        }catch(error){
            console.log(error);
        }
    }


    return {handleChange,handleSubmit}

}