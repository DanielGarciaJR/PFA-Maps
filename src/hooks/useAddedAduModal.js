import { useState } from "react";

export const useAddedAduModal = () => {
    const [aduAddedModal,setAduAddedModal] = useState(false);

    return {aduAddedModal,setAduAddedModal}
}