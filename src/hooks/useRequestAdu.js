import { useRef, useState } from "react"

export const useRequestAdu = () => {

    const [modal,setModal] = useState(false);
   

    const showModal = () => {
        setModal(true);
    }

    const closeModal = () => {
        setModal(false);
    }


    return {showModal,modal,closeModal}
}