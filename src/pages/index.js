import { useState} from "react";
import { FaSearch } from "react-icons/fa";
import Layout from '@/components/Layout';
import Image from 'next/image';
import Map from './app/Map';
import dynamic from 'next/dynamic';
import ErrorMessage from "@/components/ErrorMessage";


const AddressAutofill = dynamic(
  () => import('@mapbox/search-js-react').then((module) => module.AddressAutofill),
  { ssr: false }
);

export default function Home() {
  
  //state
  const [locationInput, setLocationInput] = useState('');
  const [locationMap,setLocationMap] = useState('');
  const [coordinates, setCoordinates] = useState({ lng : null, lat : null});
  const [showMap ,setShowMap] = useState(false);
  const [showError, setShowError] = useState(false); 

  //get input value
  const handleChangue = (e) => {
    e.preventDefault();
    setLocationInput(e.target.value);
  }

  //do get for request a location
  const handleSubmit =  async(e) => {
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
  
  return ( 
    <>
       <Layout>
      
       {!showMap ? (
            <div  className="flex flex-col justify-center items-center mt-[30vh] m-4  bg-white rounded-lg 
            sm:ml-[20%] sm:mr-[20%] sm:h-[200px] md:ml-[15%] md:mr-[15%] md:h-[200px] lg:ml-[25%] lg:mr-[25%] lg:h-[300px]"> 
               
                <Image 
                  className="w-auto h-auto m-4 
                  sm:w-[270px] sm:h-[40px] 
                  md:w-[295px] md:h-[60px]   
                  lg:w-[450px] lg:h-[75px]"
                  priority
                  src="/images/mk_logo.png" 
                  alt="multitaskrLogo"  
                  width="450" 
                  height="75"
                />

                <form onSubmit={handleSubmit} className="flex flex-row">
                 
                 <AddressAutofill accessToken={process.env.MAPBOX_TOKEN} options={{types: ['country', 'region', 'place', 'postcode', 'locality', 'neighborhood']}}>
                    <input
                      name='adress'
                      className='text-gray-500 m-2 mb-7 border-2 p-2 border-slate-300 rounded-full text-xs sm:text-sm sm:w-72 md:text-base md:w-96
                      lg:text-lg lg:w-[450px] lg:pl-5 lg:mt-9' 
                      type="text" 
                      autoComplete="address-line1"
                      placeholder="214 Landis Ave, Chula Vista example" 
                      value={locationInput} 
                      onChange={handleChangue}
                      onFocus={() => setShowError(false)}
                    >
                    </input>
                  </AddressAutofill>
                 
                  <button 
                    type='submit' 
                    className="bg-purple-700 rounded-full text-white hover:bg-purple-600 p-2 w-8 h-8 mt-2
                    sm:p-5 md:p-5 lg:p-6 lg:mt-9">
                    <FaSearch className='mt-[-1px] ml-[0.5px] sm:mt-[-7px] sm:ml-[-7px] lg:mt-[-8px] lg:ml-[-8px]'/>
                  </button>

                </form>
                {showError && 
                   <ErrorMessage>
                      <div className="p-1 mt-[-20px] mb-[10px] text-[#dc3545] text-[9px] font-medium sm:ml-[-65px] sm:text-[12px]
                        md:ml-[-90px] md:text-[15px] lg:ml-[-120px] lg:text-[17px]">
                        <h2>Please, write something in the search bar.</h2>  
                      </div>  
                    </ErrorMessage>
                }
            </div>
       ): <Map 
              location={coordinates} address={locationMap} handleChangue={handleChangue} handleSubmit={handleSubmit}>
          </Map>}

      </Layout>
    </>    
  )
}
