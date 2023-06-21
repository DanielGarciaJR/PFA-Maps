import Head from "next/head";
import Link from "next/link";
import { useContext } from 'react';
import AppContext from '@/Global/userContext';
import { FaUserAlt } from "react-icons/fa";
import { useLogout } from "@/hooks/useLogout";

/*Global layout*/
const LayoutClient = ({children}) => {
    
    const context = useContext(AppContext);
    const {logOut} = useLogout();

    return(
        <>
            <Head>
                <title>
                    PFA
                </title>
                
            </Head>

            <div className="p-3 list-none drop-shadow-md  text-white  bg-purple-700">
                <li>
                    <span>
                        <Link className="m-4 hover:text-purple-200 hover:underline" href='/app/MapClient'>Map</Link>
                        <Link className="m-4 hover:text-purple-200 hover:underline" href='/app/CatalogClient'>ADU Catalog</Link>
                    </span>
                </li>
                <div className=" float-right w-[12%]">
                    <FaUserAlt className="w-4 h-5 mt-[-20px]"/>
                    <p className="mt-[-21px] ml-7">{context.userContext.username}</p>
                    <button className="float-right mt-[-24px]" onClick={logOut}>Sing out</button>
                </div> 
            </div>

            {children}
        </>
    );
}

export default LayoutClient;