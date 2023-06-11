import { FaSearch } from "react-icons/fa";
import dynamic from 'next/dynamic';


const AddressAutofill = dynamic(
    () => import('@mapbox/search-js-react').then((module) => module.AddressAutofill),
    { ssr: false }
);

/*Map's Search Bar*/
const LocationForm = ({formValue,formSubmitData, newLocationInput}) => {

    return(
        <div>
            <form onSubmit={(e) => formSubmitData(e,newLocationInput)}>
                <AddressAutofill accessToken={process.env.MAPBOX_TOKEN} options={{types: ['country', 'region', 'place', 'postcode', 'locality', 'neighborhood']}}>
                <input
                    type="text" 
                    placeholder="Search location"
                    className='mt-5 ml-3 mr-3 p-2 w-[80%]  rounded-full border-2 border-slate-300 text-gray-500'
                    autoComplete="address-line1"
                    onChange={formValue}>
                </input>
                </AddressAutofill>
                <button 
                    type='submit' 
                    className="bg-purple-700 w-[45px] h-[45px] mt-5 absolute rounded-full text-white hover:bg-purple-600">
                    <FaSearch className='w-11 h-5'/>
                  </button>
            </form>
        </div>
    );
}

export default LocationForm;