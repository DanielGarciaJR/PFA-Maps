import { FaUserAlt } from "react-icons/fa";
import Head from "next/head";
import Link from "next/link";

/*Global layout*/
const LayoutClient = ({children}) => {
    
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
                <div className=" float-right w-[6%] flex mt-[-20px]">
                        <FaUserAlt className="mt-1"></FaUserAlt>
                        <Link className="ml-2" href='/app/Login'>Sing In</Link>
                </div> 
            </div>

            {children}
        </>
    );
}

export default LayoutClient;