import Head from "next/head";

/*Global layout*/
const Layout = ({children}) => {
    
    return(
        <>
            <Head>
                <title>
                    PFA
                </title>
                
            </Head>

            {children}
        </>
    );
}

export default Layout;