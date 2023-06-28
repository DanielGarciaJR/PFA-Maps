import { useState } from "react"

export const useSidebarCatalog = () => {

    const [section,setSeccion] = useState({
        aduDetails : true,
        addUsers : false
    });

    const loadDetailSection = () => {
       

        setSeccion({aduDetails : true,addUsers : false});
    }

    const loadAddSection = () => {
        

        setSeccion({aduDetails : false,addUsers :true})
    }

    return { loadDetailSection, loadAddSection, section }
}