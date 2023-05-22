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
    
    if(!location){
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
            <div  className="flex flex-col justify-center items-center mt-[14%] pt-[3%] ml-[25%] mr-[25%] pb-[4%] bg-white rounded-lg"> 
               
                <Image 
                  className="w-auto h-auto"
                  priority 
                  src="/images/mk_logo.png" 
                  alt="multitaskrLogo"  
                  width="480" 
                  height="480"
                />

                <form onSubmit={handleSubmit}>
                 
                 <AddressAutofill accessToken={process.env.MAPBOX_TOKEN} options={{types: ['country', 'region', 'place', 'postcode', 'locality', 'neighborhood']}}>
                    <input
                      name='adress'
                      className='mt-12 w-96 h-11 rounded-full border-2 border-slate-300 mr-5 pl-4' 
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
                    className="bg-purple-700 w-[45px] h-[45px] rounded-full text-white hover:bg-purple-600">
                    <FaSearch className='w-11 h-5'/>
                  </button>

                </form>
                {showError && 
                   <ErrorMessage>
                      <div className=" mt-1 p-1 text-[#dc3545] font-medium ml-[-18%]">
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
