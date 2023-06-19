import { useState } from "react";
import axios from "axios";

const Login = () => {

    const [credentials,setCredentials] = useState({
        username: "",
        password: "",
    })


    const handleChange = (e) =>  {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post("/api/auth/login", credentials);
            console.log(response);

          } catch (error) {
            console.error(error.response.data);
          }
       
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} name="username" type="text" placeholder="usename"></input>
                <input onChange={handleChange} name="password" type="password" placeholder="password"></input>
                <button>Login</button>
            </form>
        </div>
    );
}

export default Login;