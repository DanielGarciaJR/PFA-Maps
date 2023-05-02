import Head from "next/head";

const Layout = ({children}) => {
    return(
        <>
            <Head>
                <title>PFA</title>
            </Head>

            
            {children}
        </>
    );
}

export default Layout;