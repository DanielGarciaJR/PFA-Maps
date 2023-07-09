import { useUserRequestSection } from "@/hooks/useUserRequestSection";
import { useRequestApprove } from "@/hooks/useRequestApprove";
import { useContext } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import AppContext from "@/Global/userContext";
import ApproveModal from "./ApproveModal";
import Image from "next/image";

 const TableAduRequest = ({search}) => {
    
    const context = useContext(AppContext);
    const { approveUserRequest,approveModal,setApproveModal} = useRequestApprove();
    useUserRequestSection();

    return(
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg overflow-y-scroll h-[480px]">
        {approveModal && <ApproveModal close={setApproveModal}>
            <Image 
                className="ml-[30%] pt-[10%] mt-[20%]"
                src="/images/goodAnswer.png"
                width='250'
                height='250'
                priority
                alt="aduApproved"
            >
            </Image>
            <div>
                <p className="text-[20px] text-white  p-5 text-center ">
                    ADU Approved, you can see the details in the approved adu section
                </p>
            </div>
        </ApproveModal>}

       
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="bg-purple-600 text-white">
                  <th scope="col" className="px-6 py-3">
                      Client Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Client Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Client Phone
                  </th>
                  <th scope="col" className="px-6 py-3">
                      ADU ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Actions
                  </th>
              </tr>
          </thead>
          <tbody>

          {context.pendingAduReqContext.filter((el) => search === '' || el.client_last_name.includes(search)).map((el, index) => (
            <tr key={index} className="bg-white border-b dark:bg-white dark:border-gray-200">
                <th scope="row" className="px-6 py-4 font-medium text-gray-500 whitespace-nowrap dark:text-gray-400">
                    {el.client_name + " " + el.client_last_name}
                </th>
                <td className="px-6 py-4">
                    {el.client_email}
                </td>
                <td className="px-6 py-4">
                    {el.client_phone}
                </td>
                <td className="px-6 py-4">
                    {el.adu_id}
                </td>
                <td className="px-6 py-4 text-yellow-500">
                    <a className="bg-yellow-100 p-1 rounded-md">{el.status.toLowerCase()}</a>
                </td>
                <td className="px-6 py-4 flex">
                    <button onClick={(e) => {approveUserRequest(e,el.id)}} type="button" className="flex items-center justify-center p-2 focus:outline-none text-white bg-green-700 w-[55%] hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-md text-sm  py-2 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                        <FaCheck/>
                    </button>
                    <button type="button" className=" flex items-center justify-center p-2 focus:outline-none w-[55%] text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-md text-sm  py-2 mr-2 mb-2 dark:bg-red-500 dark:hover:bg-red-700 dark:focus:ring-red-900">
                        <FaTrashAlt/>
                    </button>
                </td>
            </tr>
          ))
         }
        </tbody>
      </table>
     </div>
    );
}

export default TableAduRequest;
