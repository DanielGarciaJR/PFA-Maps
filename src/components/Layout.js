import { useLogout } from "@/hooks/useLogout";
import { useContext } from 'react';
import { FaUserAlt } from "react-icons/fa";
import AppContext from '@/Global/userContext';
import Head from "next/head";
import Link from "next/link";

/*Global layout*/
const Layout = ({children}) => {
    
    const context = useContext(AppContext);
    const {logOut} = useLogout();

    return(
        <>
            <Head>
                <title>
                    PFA
                </title>
                
            </Head>

            <div className=" p-3 list-none drop-shadow-md  text-white  bg-purple-700 ">
                <li>
                    <span>
                        <Link className="m-4 hover:text-purple-200 hover:underline" href='/app/Map'>Map</Link>
                        <Link className="m-4 hover:text-purple-200 hover:underline" href='/app/Catalog'>Catalog</Link>
                    </span>
                </li>
                <div className=" float-right w-[15%]">
                    <FaUserAlt className="w-4 h-5 mt-[-20px]"/>
                    <p className="mt-[-21px] ml-5">{context.userContext.username}</p>
                    <button className="float-right mt-[-24px]" onClick={logOut}>Sing out</button>
                </div> 
            </div>

            {children}
        </>
    );
}

export default Layout;