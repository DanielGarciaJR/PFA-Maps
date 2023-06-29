import { FaSearch } from "react-icons/fa";
import { useHandleForm } from '../hooks/useHandleForm';
import { useFetch } from '../hooks/useFetch';
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
  
  const { locationInput, handleChange } = useHandleForm();
  const { showMap,locationMap,coordinates,showError,setShowError,setCoordinates,setLocationMap,handleSubmit } = useFetch();

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

                <form onSubmit={(e) => handleSubmit(e,locationInput)} className="flex flex-row">
                 
                 <AddressAutofill accessToken={process.env.MAPBOX_TOKEN} options={{types: ['country', 'region', 'place', 'postcode', 'locality', 'neighborhood']}}>
                    <input
                      name='adress'
                      className='text-gray-500 m-2 mb-7 border-2 p-2 border-slate-300 rounded-full text-xs sm:text-sm sm:w-72 md:text-base md:w-96
                      lg:text-lg lg:w-[450px] lg:pl-5 lg:mt-9' 
                      type="text" 
                      autoComplete="address-line1"
                      placeholder="214 Landis Ave, Chula Vista example" 
                      value={locationInput} 
                      onChange={handleChange}
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
              coordinates={coordinates} 
              address={locationMap} 
              handleChangue={handleChange} 
              handleSubmit={handleSubmit} 
              locationInput={locationInput} 
              setHoverCoordinates={setCoordinates} 
              setHoverCurrentLocation={setLocationMap}>
          </Map>}

      </Layout>
    </>    
  )
}
