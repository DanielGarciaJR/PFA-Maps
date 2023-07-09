import { FaUser } from "react-icons/fa";
import { AiTwotoneMail } from "react-icons/ai";
import { FaPhoneAlt } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { useCreatePfa } from '@/hooks/useCreatePfa';
import React from 'react'
import Image from 'next/image'


const AduInprogressContainer = ({progressAdu,showMdal}) => {

  const {createPfaReport} = useCreatePfa(showMdal);

  return (
    <div  className="flex flex-col items-center  mb-5 bg-white border border-gray-200 rounded-lg shadow md:flex-row w-[90%]  dark:hover:bg-purple-50">
        <Image
            className="rounded-tl-lg rounded-bl-lg  h-[200px]"
            src='/images/adu.jpeg'
            width='250'
            height='250'
            priority
            alt="adu">
        </Image>
        <div className="flex flex-col justify-between p-4 leading-normal ">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-purple-400 ">
                Condo 4 walls
            </h5>
        
            <div className="flex">
                <p className="mb-6 font-normal text-gray-700 dark:text-gray-400">
                    <a className="text-[12px] bg-green-400 p-1 rounded-md text-white"> 
                        In {progressAdu.status.toLowerCase()}
                    </a>
                </p>
                <button onClick={(e) => createPfaReport(e,progressAdu.id)}  type="button" className="bg-purple-400 text-[10px] h-7 ml-3 w-[130px] rounded-md text-white hover:bg-purple-300">
                    Fill PFA Report
                </button>
            </div>

            <div className='flex mb-6'>
                <p className='flex text-gray-500'><FaUser className='mr-2 mt-[3px] text-gray-400'/>
                    {progressAdu.client_name + " " + progressAdu.client_last_name}
                </p>
                <p className='flex ml-[100px] text-gray-500'><AiTwotoneMail className='mr-2 mt-[3px]'/>
                    {progressAdu.client_email}
                </p>
                <p className='flex ml-[100px] text-gray-500'><FaPhoneAlt className='mr-2 mt-[3px] text-gray-400'/>
                    {progressAdu.client_phone}
                </p>
            </div>
            <div className='flex'>
                <p className='text-gray-500 text-[13px] flex'><FaInfoCircle className='mr-2 mt-[3px]'/>
                    This ADU is 34.53 feet and 34.24 height. Created at 12/10/20:00:00
                </p>
            </div>
        </div>
    </div>
  )
}

export default AduInprogressContainer
