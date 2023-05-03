import { Inter } from 'next/font/google'
import { useState } from "react";
import Layout from '@/components/Layout';
import Image from 'next/image';
import mapbox from './api/mapbox';
import Map from './app/Map';


const inter = Inter({ subsets: ['latin'] })

 
export default function Home() {

  const [location, setLocation] = useState('');
  const [coordinates, setCoordinates] = useState({ lng : null, lat : null});
  const [showMap ,setShowMap] = useState(false);

  const handleChangue = (e) => {
    e.preventDefault();
    setLocation(e.target.value);
  }

  const handleSubmit =  async(e) => {
    e.preventDefault();
  
    try{
      const res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${mapbox.token}`);
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
              <div className="flex flex-col justify-center items-center mt-40 pt-20">  
                <Image priority src="/images/mk_logo.png" alt="Multitakr logo"  width={480} height={480}/>
        
                <form onSubmit={handleSubmit}>
              
                  <input
                    className='mt-10 w-96 h-10 rounded border-2 border-slate-300 mr-5' 
                    type="text" 
                    placeholder="Search an address here" 
                    value={location} 
                    onChange={handleChangue}
                  >
                  </input>

                  <button type='submit' className="bg-purple-700 w-20 h-10 rounded text-white">Search</button>
                </form>
              </div>
            ): <Map location={coordinates}></Map>}
        </Layout>
    </>    
  )
}
