import { useFetchRoles } from "@/hooks/useFetchRoles";
import { useUserForm } from "@/hooks/useUserForm";
import ErrorMessage from "./ErrorMessage";

const UserForm = ({showModal}) => {
    
    const {roles} = useFetchRoles();
    const {handleChange, handleSubmit,error,setError,userFormRef} = useUserForm(showModal);
    
    return(
        <form onSubmit={handleSubmit} ref={userFormRef}>
            <div className="flex">
                <div className="mb-6 mr-[34%]">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                    <input onChange={handleChange}  name="name" type="text" placeholder="Daniel" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg   block w-[300%] p-2.5"  required></input>
                </div>
                <div className="mb-6">
                    <label  className="block mb-2 text-sm font-medium text-gray-900">Last name</label>
                    <input onChange={handleChange}  name="last_name" placeholder="Garcia" type="text" className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg block w-[300%] p-2.5" required></input>
                </div>
            </div>
        
            <div className="flex">
                <div className="mb-6 mr-[34%]">
                    <label  className="block mb-2 text-sm font-medium text-gray-900">Username</label>
                    <input onChange={handleChange}  name="user_name" placeholder="danielxo" type="text" className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg block w-[300%] p-2.5" required></input>
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                    <input onFocus={() => setError(false)}  onChange={handleChange} name="email" type="email" placeholder="danielitoelguarneritos@gmai.com" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg   block w-[300%] p-2.5"  required></input>
                </div>
            </div>
            
            <div className="flex">
            <div>
            <label  className="block mb-2 text-sm font-medium text-gray-900">Role</label>
                <select onChange={handleChange} name="roles" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm mb-7 rounded-lg   block w-[450%] p-2.5"  required>
                    {roles.map((rol,index) => <option key={index} value={rol.id}>{rol.name}</option>)}
                </select> 
            </div>
            <div>
                {error && <ErrorMessage>
                    <p className="bg-red-100 p-3 w-[340%] ml-[286%] mt-6 flex items-center justify-center text-red-700">{error}</p>
                </ErrorMessage>}
            </div>
            </div>
            

            <div className="flex justify-start mb-8 mt-10">
                    <button type="submit" className=" text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-32 py-2.5 text-center dark:bg-purple-600">
                        Add User
                    </button>
            </div> 

        </form>
    );
}

export default UserForm;







