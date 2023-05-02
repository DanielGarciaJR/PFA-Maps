import Image from 'next/image'
import { Inter } from 'next/font/google'
import Search from './app/Search'
import Map from './app/Map'


const inter = Inter({ subsets: ['latin'] })

 
export default function Home() {


  return ( 
    <>
       <Search></Search>
    </>    
  )
}
