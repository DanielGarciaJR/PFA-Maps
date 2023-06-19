import { useRef, useState } from 'react';

//Change content in sidebar menu
export const useSidebarMenu = () => {

    const [section,setSection] = useState({
        tile: true, 
        upload: false, 
    });

    const tileSectionRef = useRef(null);
    const uploadSectionRef = useRef(null);

    const loadTileSection = () => {
        setSection({tile: true,upload: false});
        uploadSectionRef.current.classList.remove('text-red-600');
        tileSectionRef.current.classList.add('text-red-600');
    }

    const loadUploadSection = () => {
        setSection({tile: false,upload: true});
        tileSectionRef.current.classList.remove('text-red-600');
        uploadSectionRef.current.classList.add('text-red-600');
    }

    return { loadTileSection, loadUploadSection,section, tileSectionRef, uploadSectionRef }     
}