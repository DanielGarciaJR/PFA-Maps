import { useState } from 'react';

export const useFetch = () => {

    //state
    const [showMap ,setShowMap] = useState(false);
    const [locationMap,setLocationMap] = useState('');
    const [coordinates, setCoordinates] = useState({ lng : null, lat : null});
    const [showError, setShowError] = useState(false); 

    //get location request.
    const handleSubmit =  async(e,locationInput) => {
        e.preventDefault();

        if(!locationInput){
            setShowError(true);
        }else{
            try{
                const bbox = '-124.409619,32.534156,-114.131211,42.009518';
                const res = await fetch(`${process.env.GEOCODING_URL}mapbox.places/${locationInput}.json?access_token=${process.env.MAPBOX_TOKEN}&country=us&bbox=${bbox}`);
                const data = await res.json();
        
                setCoordinates({
                    lng: data.features[0].center[0],
                    lat: data.features[0].center[1]
                });
        
                setLocationMap(data.features[0].place_name);
                setShowMap(true);
          
            }catch(error){
                console.log(error);
            }
        }
    }

    //return data
    return {
        showMap,
        locationMap,
        coordinates,
        showError,
        setShowError,
        setCoordinates,
        setLocationMap,
        handleSubmit,
    }
}