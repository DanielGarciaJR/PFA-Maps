import UserForm from "./UserForm";

const AddUserSection = () => {



    return(
        <div className="p-10 w-[140%]">
            <div>
                <h2 className="text-[30px]">Add a new user</h2>
            </div>
            <div className="mt-5 border-gray-300 border p-5 rounded-lg">
               <UserForm/>
            </div>
        </div>
    );
}

export default AddUserSection;