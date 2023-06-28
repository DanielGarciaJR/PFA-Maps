import AppContext from "@/Global/userContext";
import AduForm from "@/components/AduForm";
import AduContainer from "./AduContainer";
import { useAduCatalog } from "@/hooks/useAduCatalog";
import { useContext } from "react";

const AduDetailSection = () => {

    useAduCatalog();
    
    const context = useContext(AppContext);

    return(
        <div className="p-10 w-[140%]">
            <div>
                <h2 className="text-[30px]">Add & consult all about ADU information</h2>
            </div>
            <div className="flex mt-5 ">
                <div className=" p-16 w-[48%] mr-[1%] rounded-lg border-gray-300 border">
                    <AduForm/>
                </div>
                <div className="p-5 w-[58%] h-[580px] rounded-lg border-gray-300 border overflow-y-scroll bg-purple-700">
                    {context.aduContext.map((el,index) => <AduContainer key={index} adu={el}/> )}
                </div>
            </div>
        </div>
    );
}

export default AduDetailSection;