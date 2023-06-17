import { useState, useRef } from "react";

//geojson form and validations
export const useGeoJsonForm = () => {
    const [geoJson, setGeoJson] = useState(null);
    const [error, setError] = useState(false);
    const fileRef = useRef(null);


    const handleChange = (e) => {
        e.preventDefault();
        
        const file = e.target.files[0];
        setGeoJson(file)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const extension = geoJson.name.split('.').pop();

        if (extension === 'geojson') {
          setError(false);

          //peticion a la base de datos
          console.log('geojson saved...')

          setGeoJson(null);
          fileRef.current.value = null;
        } else {
          setError(true);
        }
    }
    
    return { handleChange, handleSubmit,setError, error, fileRef };
}