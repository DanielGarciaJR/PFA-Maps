import { useState } from "react"

export const useModalLayout = () => {

 const [showModal,setShowModal] = useState(false);


 return {showModal,setShowModal}
}

