import { useState } from "react";

export const useFetch = () => {
    const [locationMap,setLocationMap] = useState('1100 3rd Ave, San Diego, CA 92101, EE. UU.');
    const [coordinates, setCoordinates] = useState({ lng : -117.16247728059679, lat : 32.71741581990228});
   
   //get location request.
   const handleSubmit =  async(e,locationInput) => {
    e.preventDefault();

        try{
            const bbox = '-124.409619,32.534156,-114.131211,42.009518';
            const res = await fetch(`${process.env.GEOCODING_URL}mapbox.places/${locationInput}.json?access_token=${process.env.MAPBOX_TOKEN}&country=us&bbox=${bbox}`);
            const data = await res.json();
    
            setCoordinates({
                lng: data.features[0].center[0],
                lat: data.features[0].center[1]
            });
    
            setLocationMap(data.features[0].place_name);
        }catch(error){
            console.log(error);
        }
    
}

//return data
return {
    locationMap,
    coordinates,
    setCoordinates,
    setLocationMap,
    handleSubmit,
}
}
