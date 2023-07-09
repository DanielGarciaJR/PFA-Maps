import { useRequestInProgress } from '@/hooks/useRequestInProgress'
import { usePfaCreateModal } from '@/hooks/usePfaCreateModal';
import { useContext } from 'react';
import AduInprogressContainer from './AduInprogressContainer';
import AppContext from '@/Global/userContext';
import PfaCreatedModal from './pfaCreatedModal';
import Image from 'next/image';
import React from 'react'

const InProgressSection = () => {

  const context = useContext(AppContext);
  const {showModal,setShowModal} = usePfaCreateModal();
  useRequestInProgress();
  
  return (
    <div className="p-10 w-[140%] ">
        {showModal && <PfaCreatedModal closeModal={setShowModal}>
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
                <p className="text-[26px] text-white flex p-5 items-center justify-center ">
                    PFA report request created, Status: "DRAFT"
                </p>
            </div>    
        </PfaCreatedModal>}

        <h2 className="text-[30px] text-gray-500">
            ADUS in progress
        </h2>
        <p className="text-gray-400 mb-6">
            Here you will see a list about all adus currently in progress
        </p>

        <div className="overflow-y-scroll h-[580px]">
           {context.aduInProgress.map((el,index) => (
              <AduInprogressContainer key={index} progressAdu={el} showMdal={setShowModal}></AduInprogressContainer>
           ))}
        </div>
    </div>
  )
}

export default InProgressSection
