import { useState } from "react"

export const usePfaCreateModal = () => {
    const [showModal,setShowModal] = useState(false);

    return {showModal,setShowModal}
}