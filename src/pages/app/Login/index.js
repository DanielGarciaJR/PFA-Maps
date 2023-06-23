import { useLogin } from "@/hooks/useLogin";

const Login = () => {

    const { handleChange, handleSubmit, /*loginError,  setLoginError*/} = useLogin();

    return(
        <div className="h-screen flex items-center justify-center">
            <div className="bg-white  p-6 w-[40%] rounded-lg border border-gray-300">
                <div className="flex items-center justify-center mb-3 text-gray-500">
                    <p className="text-[40px] font-bold">Login</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                        <input onChange={handleChange} /*onFocus={() => setLoginError(null)}*/ name="email" type="email" placeholder="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg   block w-full p-2.5"  required></input>
                    </div>
                    <div className="mb-6">
                        <label  className="block mb-2 text-sm font-medium text-gray-900">Your password</label>
                        <input onChange={handleChange} /*onFocus={() => {setLoginError(null)}}*/ name="password" type="password" placeholder="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" required></input>
                    </div>
                    {/*loginError && (
                        <div className="bg-red-100 flex items-center justify-center p-2 m-4 rounded-lg text-red-700">
                            {loginError.error}
                        </div>
                    )*/}
                        
                  
                    <div className="flex items-center justify-center">
                        <button type="submit" className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-32 py-2.5 text-center dark:bg-blue-600">
                            Sign In
                        </button>
                    </div>                
                </form>
            </div>
        </div>
    );
}

export default Login;