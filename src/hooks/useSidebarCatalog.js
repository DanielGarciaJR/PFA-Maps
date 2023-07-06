import { useState } from "react"

export const useSidebarCatalog = () => {

    const [section,setSeccion] = useState({
        aduDetails : true,
        addUsers : false,
        aduRequest: false
    });

    const loadDetailSection = () => {

        setSeccion({aduDetails : true,addUsers : false,aduRequest: false});
    }

    const loadAddSection = () => {

        setSeccion({aduDetails : false,addUsers :true,aduRequest:false});
    }

    const loadRequestSection = () => {
        setSeccion({aduDetails: false,addUsers:false,aduRequest:true})
    }

    return { loadDetailSection, loadAddSection,loadRequestSection, section }
}