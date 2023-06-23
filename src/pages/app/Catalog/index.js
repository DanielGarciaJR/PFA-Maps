import AppContext from "@/Global/userContext";
import AduContainer from "@/components/AduContainer";
import AduForm from "@/components/AduForm";
import Layout from "@/components/Layout";
import { useAduCatalog } from "@/hooks/useAduCatalog";
import { useContext, useEffect } from "react";



const Catalog = () => {
    
    const context = useContext(AppContext);
    useAduCatalog();

    return(
        <Layout>
            <div>
                <div className="p-10 m-13">
                    <div>
                        <h2 className="text-[30px]">Add & consult all about ADU information</h2>
                    </div>
                    <div className="flex mt-5 ">
                        <div className=" p-16 w-[48%] mr-[4%] rounded-lg border-gray-300 border">
                            <AduForm/>
                        </div>
                        <div className="p-5 w-[48%] h-[580px] rounded-lg border-gray-300 border overflow-y-scroll bg-purple-700">
                            {context.aduContext.map((el,index) => <AduContainer key={index} adu={el}/> )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Catalog;




   
