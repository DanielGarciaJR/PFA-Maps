import { useBuildingForm } from "@/hooks/useBuildingForm";

const BuildingForm = ({idRequest,closeReq}) => {
    
    const {handleChange,handleSubmit, buildingFormRef } = useBuildingForm(idRequest,closeReq);
    
    return(
        <form onSubmit={handleSubmit} ref={buildingFormRef}>
        <div className="m-5 pt-4">
            <div className="mb-6 mr-[34%]">
                <label className="block mb-2 text-sm font-medium text-white">Client Name</label>
                <input onChange={handleChange}  name="client_name" type="text" placeholder="Natanael" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg   block w-[150%] p-2.5"  required></input>
            </div>
            <div className="mb-6">
                <label  className="block mb-2 text-sm font-medium text-white">Client Lastname</label>
                <input onChange={handleChange}  name="client_last_name" placeholder="Cano Monje" type="text" className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg block w-[99%] p-2.5" required></input>
            </div>
        </div>
        <div className="m-5">
            <div className="mb-6 mr-[34%]">
                <label  className="block mb-2 text-sm font-medium text-white">Client Email</label>
                <input onChange={handleChange}  name="client_email" placeholder="natanaelct@gmail.com" type="email" className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg block w-[150%] p-2.5" required></input>
            </div>
            <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-white">Client Contact</label>
                <input onChange={handleChange} name="client_phone" type="text" placeholder="66435590281" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg   block w-[99%] p-2.5"  required></input>
            </div>
        </div>
        <div className="flex justify-center mb-9 mt-10">
                <button type="submit" className=" text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-32 py-2.5 text-center dark:bg-purple-600 mb-8">
                   Send ADU Request
                </button>
        </div> 
    </form>
    );
}

export default BuildingForm;