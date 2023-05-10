import { Inter } from 'next/font/google'
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Layout from '@/components/Layout';
import Image from 'next/image';
import mapbox from '../constants/mapbox';
import Map from './app/Map';
import mapboxUrl from '../constants/mapboxUrl';
import dynamic from 'next/dynamic';

const AddressAutofill = dynamic(
  () => import('@mapbox/search-js-react').then((module) => module.AddressAutofill),
  { ssr: false }
);

const inter = Inter({ subsets: ['latin'] })


export default function Home() {

  //state
  const [location, setLocation] = useState('');
  const [coordinates, setCoordinates] = useState({ lng : null, lat : null});
  const [showMap ,setShowMap] = useState(false);

  //functions
  const handleChangue = (e) => {
    e.preventDefault();
    setLocation(e.target.value);
  }

  const handleSubmit =  async(e) => {
    e.preventDefault();
  
    try{
      const res = await fetch(`${mapboxUrl.baseUrl}mapbox.places/${location}.json?access_token=${mapbox.token}`);
      const data = await res.json();

      setCoordinates({
          lng: data.features[0].center[0],
          lat: data.features[0].center[1]
      });

      setShowMap(true);

    }catch(error){
      console.log(error);
    }
  }

  return ( 
    <>
       <Layout>
        
       {!showMap ? (
              <div className="flex flex-col justify-center items-center mt-[14%] pt-[3%] ml-[25%] mr-[25%] bg-white rounded-lg "> 
               
                <Image 
                  priority 
                  src="/images/mk_logo.png" 
                  alt="multitaskrLogo"  
                  width={480} 
                  height={480}
                />

                <form onSubmit={handleSubmit}>
               
                  <AddressAutofill accessToken={mapbox.token}> 
                    <input
                      name='adress'
                      className='mt-12 w-96 h-11 rounded-full border-2 border-slate-300 mr-5 pl-4 mb-[16%]' 
                      type="text" 
                      autoComplete="street-address"
                      placeholder="Search an address here" 
                      value={location} 
                      onChange={handleChangue}
                    >
                    </input>
                  </AddressAutofill>
                 
                  <button 
                    type='submit' 
                    className="bg-purple-700 w-[45px] h-[45px] rounded-full text-white hover:bg-purple-600">
                    <FaSearch className='w-11 h-5'/>
                  </button>

                </form>
                </div>
            ): <Map location={coordinates}></Map>}
            
      </Layout>
    </>    
  )
}
