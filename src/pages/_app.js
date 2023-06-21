import '@/styles/globals.css'
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import Head from 'next/head';
import { useState } from 'react';
import AppContext from '@/Global/userContext';

export default function App({ Component, pageProps }) {
  
  const [userContext,setUserContext] = useState({username : '',password : '',});


  return(
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <AppContext.Provider value={{userContext,setUserContext}}>
        <Component {...pageProps} /> 
      </AppContext.Provider>
    </>
  )
}
