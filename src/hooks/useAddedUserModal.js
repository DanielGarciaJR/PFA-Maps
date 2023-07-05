import { useState } from "react"

export const useAddedUserModal = () => {
    const [showUserModal,setUserModal] = useState(false);

    return {showUserModal,setUserModal}
}