import { useState, useRef } from "react";
import axios from "axios";



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

    const handleSubmit = async (e) => {
      e.preventDefault();

      const extension = geoJson.name.split('.').pop();

      if (extension === 'geojson') {
        setError(false);

        try{
          const formData = new FormData();
          formData.append('geojson',geoJson);
          formData.append('category','prueba');

          const response = await axios.post(`${process.env.GEOJSON_URL}/tilesets`,formData, {
            headers: { 
              'Content-Type': 'multipart/form-data',
            },
           mode: 'cors', 
          });

          console.log(response);

        }catch(error){
          console.log(error);
        }
       
        setGeoJson(null);
        fileRef.current.value = null;
      } else {
        setError(true);
      }
  }
    
    return { handleChange, handleSubmit,setError, error, fileRef };
}