import { useState } from "react";

export const useHandleForm = () => {

    //state
    const [locationInput, setLocationInput] = useState('');

    //handle input value
    const handleChange = (e) => {
        e.preventDefault();
        setLocationInput(e.target.value);
    }

    //return
    return { locationInput, handleChange }
}

