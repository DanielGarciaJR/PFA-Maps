import React, {  useState } from 'react'
import TableAduRequest from './TableAduRequest';

const UserRequestSection = () => {
    const [searchClient, setSearchClient] = useState('');
  
    return (
        <div className="p-10 w-[140%]">
            <h2 className="text-[30px] text-gray-500">
                User ADU Requests
            </h2>
            <p className="text-gray-400 mb-6">
                Here you will see the requests made by users related to a specific ADU with pending status
            </p>

           <div className="flex items-end justify-end">
            <input
                    type="text"
                    id="default-search"
                    className='mb-3 border border-3 p-2 w-[25%] rounded-lg shadow-sm pl-4 text-gray-500'
                    placeholder="Search a client here..."
                    value={searchClient}
                    onChange={(e) => setSearchClient(e.target.value)}
                />
           </div>

           <TableAduRequest search={searchClient}></TableAduRequest>
        </div>
  )
}

export default UserRequestSection
