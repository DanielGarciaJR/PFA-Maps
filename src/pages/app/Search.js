import Layout from "@/components/Layout";
import Image from "next/image";

const Search = () => {
    return(

        <Layout>
            <div className="bg-green-500 flex justify-center items-center mt-40">
                
                <Image priority src="/images/mk_logo.png" alt="Multitakr logo"  width={480} height={480}/>
                
                <form>
                    <input type="text" placeholder="Search an address here" ></input>
                </form>
            </div>
        </Layout>
    );
}

export default Search;