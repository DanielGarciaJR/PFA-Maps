import { BiCurrentLocation } from "react-icons/bi";

/*Current location component*/
const LocationLabel = ({currentAddress}) => {
    return(
        <div className="absolute top-[90%] ml-[20%] w-[40%] bg-white p-2 rounded-full drop-shadow-lg">
            <div className=" text-center">
                <BiCurrentLocation className="w-5 h-5 ml-2 absolute text-gray-500"/>
                <p 
                    className="text-gray-500 text-[80%]">
                    {currentAddress}
                </p>
            </div>
        </div>
    );  
}

export default LocationLabel;

