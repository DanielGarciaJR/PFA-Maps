import { useState } from "react"

export const useSidebarCatalogClient = () => {

    const [section,setSeccion] = useState({
        buildingRequest : true,
        equiss : false
    });

    const loadBuildingSection = () => {
        setSeccion({buildingRequest : true,equiss: false});
    }


    return {loadBuildingSection,section}
}