import { useAduForm } from "@/hooks/useAduForm";
import ErrorMessage from "./ErrorMessage";

const AduForm = ({showModal}) => {

    const { handleChange, handleSubmit,aduFormRef,error,setError} = useAduForm(showModal);

    return(
            <form onSubmit={handleSubmit} ref={aduFormRef}>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900">ADU Name</label>
                    <input onChange={handleChange}  name="name" type="text" placeholder="adu 1..." className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg   block w-full p-2.5"  required></input>
                </div>
                <div className="mb-6">
                    <label  className="block mb-2 text-sm font-medium text-gray-900">ADU Feet</label>
                    <input  onChange={handleChange}  name="fts" placeholder="4.7..." type="number" step="0.01" min="0" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" required></input>
                </div>
                <div className="mb-6">
                    <label  className="block mb-2 text-sm font-medium text-gray-900">ADU Height</label>
                    <input  onChange={handleChange}  name="height" type="number" placeholder="3.6..." step="0.01" min="0" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" required></input>
                </div>
                <div className="mb-6">
                    <label  className="block mb-2 text-sm font-medium text-gray-900">ADU Image</label>
                     <input  onBlur={() => setError(false)}  onChange={handleChange} name="image" type="file"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" required></input>
                </div>

                {error && <ErrorMessage><p className="text-[12px] bg-red-200 p-3 items-center justify-center flex mb-5 text-red-500">Error, only png,jpg,jpeg extention supported</p></ErrorMessage>}

                
                <div className="flex items-center justify-center">
                    <button type="submit"  className=" text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-32 py-2.5 text-center dark:bg-purple-600">
                        Save
                    </button>
                </div>                
            </form>
    );    
}

export default AduForm;