import AppContext from "@/Global/userContext";
import { useContext } from "react";

 const TableAduRequest = () => {
    
    const context = useContext(AppContext);
    
    return(
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg overflow-y-scroll h-[540px]">
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
                  {context.pendingAduReqContext.map((el) => (
                    <tr className="bg-white border-b dark:bg-white dark:border-gray-200">
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
                            {el.status}
                        </td>
                        <td className="px-6 py-4">
                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Approve</a>
                        </td>
                    </tr>
                ))}                  
          </tbody>
        </table>
        </div>
    );
}

export default TableAduRequest;
