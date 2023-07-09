import { useState } from "react"

export const useSidebarCatalog = () => {

    const [section,setSeccion] = useState({
        aduDetails : true,
        addUsers : false,
        aduRequest: false,
        inProgress: false
    });

    const loadDetailSection = () => {

        setSeccion({aduDetails : true,addUsers : false,aduRequest: false,inProgress:false});
    }

    const loadAddSection = () => {

        setSeccion({aduDetails : false,addUsers :true,aduRequest:false,inProgress:false});
    }

    const loadRequestSection = () => {
        setSeccion({aduDetails: false,addUsers:false,aduRequest:true,inProgress:false});
    }

    const loadInProgressSection = () => {
        setSeccion({aduDetails: false,addUsers:false,aduRequest:false,inProgress:true})
    }

    return { loadDetailSection, loadAddSection,loadRequestSection,loadInProgressSection, section }
}