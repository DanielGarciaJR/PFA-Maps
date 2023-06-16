import { useState } from 'react';

//Change content in sidebar menu
export const useSidebarMenu = () => {

    const [section,setSection] = useState({
        tile: true,
        upload: false
    });

    const loadTileSection = () => {
        setSection({tile: true,upload: false});
    }

    const loadUploadSection = () => {
        setSection({tile: false,upload: true});
    }

    return { loadTileSection, loadUploadSection,section }     
}