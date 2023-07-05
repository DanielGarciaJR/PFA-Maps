import { useAddedUserModal } from "@/hooks/useAddedUserModal";
import UserForm from "./UserForm";
import UserAddedModal from "./UserAddedModal";
import Image from "next/image";


const AddUserSection = () => {

    const {showUserModal,setUserModal} = useAddedUserModal();


    return(
        <div className="p-10 w-[140%] ">
            {showUserModal && <UserAddedModal closeModal={setUserModal}>
                <Image
                    className="ml-[30%] pt-[10%] mt-[20%]"
                    src="/images/goodAnswer.png"
                    width='250'
                    height='250'
                    priority
                    alt="aduAdded"
                >
                </Image>
                <div>
                    <p className="text-[26px] text-white flex p-5 items-center justify-center ">User added succesfully</p>
                </div>
            </UserAddedModal>}

            <div>
                <h2 className="text-[30px] text-gray-500">Add a new user</h2>
            </div>
            <div className="mt-5  border p-5 border-gray-200 rounded-lg shadow md:flex-row">
               <UserForm showModal={setUserModal}/>
            </div>
        </div>
    );
}

export default AddUserSection;