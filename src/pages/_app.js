import '@/styles/globals.css'
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import Head from 'next/head';
import { useState } from 'react';
import AppContext from '@/Global/userContext';

export default function App({ Component, pageProps }) {
  
  const [userContext,setUserContext] = useState({username : '',role : '',});
  const [tokenContext, setTokenContext] = useState('');
  const [aduContext,setAduContext] = useState([]);
  const [pendingAduReqContext,setPendingAduReqContext] = useState([]);

  return(
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <AppContext.Provider value={{userContext,setUserContext,tokenContext,setTokenContext,aduContext,setAduContext,pendingAduReqContext,setPendingAduReqContext}}>
        <Component {...pageProps} /> 
      </AppContext.Provider>
    </>
  )
}
