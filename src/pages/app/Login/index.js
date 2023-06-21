import { useLogin } from "@/hooks/useLogin";

const Login = () => {

    const { handleChange, handleSubmit} = useLogin();

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