import AppContext from '@/Global/userContext';
import { useUserRequestSection } from '@/hooks/useUserRequestSection'
import React, { useContext } from 'react'
import TableAduRequest from './TableAduRequest';

const UserRequestSection = () => {
  
    useUserRequestSection();
  
    return (
        <div className="p-10 w-[140%]">
            <h2 className="text-[30px] text-gray-500">
                User ADU Requests
            </h2>
            <p className="text-gray-400 mb-6">
                Here you will see the requests made by users related to a specific ADU with pending status
            </p>

           <TableAduRequest></TableAduRequest>
        </div>
  )
}

export default UserRequestSection
