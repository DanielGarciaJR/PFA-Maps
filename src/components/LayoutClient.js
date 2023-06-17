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
                <p className="text-right mt-[-25px] underline">Welcome again @client!</p>
            </div>

            {children}
        </>
    );
}

export default LayoutClient;