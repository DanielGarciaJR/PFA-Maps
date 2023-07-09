import { useAddedAduModal } from "@/hooks/useAddedAduModal";
import { useModalLayout } from "@/hooks/useModalLayout";
import { useAduCatalog } from "@/hooks/useAduCatalog";
import { useContext } from "react";
import AppContext from "@/Global/userContext";
import AduForm from "@/components/AduForm";
import AduContainer from "./AduContainer";
import ModalLayout from "./ModalLayout";
import NoDataContainer from "./NoDataContainer";
import AduAddedModal from "./AduAddedModal";
import Image from "next/image";


const AduDetailSection = () => {

    useAduCatalog();
    
    const context = useContext(AppContext);
    const {showModal,setShowModal} = useModalLayout();
    const {aduAddedModal,setAduAddedModal} = useAddedAduModal();

    return(
        <div className="p-10 w-[140%]">

            {showModal && <ModalLayout closeModal={setShowModal}>
              <Image
                className="ml-[30%] pt-[10%] mt-[20%]"
                src="/images/goodAnswer.png"
                width='250'
                height='250'
                priority
                alt="adu"
              >
              </Image>
              <div>
                <p className="text-[26px] text-white flex p-5 items-center justify-center ">
                  ADU deleted succesfully
                </p>
              </div>
            </ModalLayout>}

            {aduAddedModal && <AduAddedModal closeModal={setAduAddedModal}>
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
                  ADU added succesfully
                </p>
              </div>
            </AduAddedModal>}

            <div>
                <h2 className="text-[30px]  text-gray-500">
                  Add & consult all about ADU information
                </h2>
            </div>
            <div className="flex mt-5 ">
                <div className=" p-16 w-[48%] mr-[1%]  bg-white border border-gray-200 rounded-lg shadow md:flex-row">
                    <AduForm showModal={setAduAddedModal}/>
                </div>
                <div className="w-[60%] h-[580px] rounded-lg  overflow-y-scroll">
                  {context.aduContext.length == 0 ? <NoDataContainer/> : (
                     context.aduContext.map((el,index) => <AduContainer key={index} adu={el} modal={setShowModal}/> )
                  )}  
                </div>
            </div>
        </div>
    );
}

export default AduDetailSection;