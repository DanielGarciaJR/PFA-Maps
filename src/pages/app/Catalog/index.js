import AppContext from "@/Global/userContext";
import AduContainer from "@/components/AduContainer";
import AduDetailSection from "@/components/AduDetailSection";
import AddUserSection from "@/components/AddUserSection";
import AduForm from "@/components/AduForm";
import Layout from "@/components/Layout";
import { useAduCatalog } from "@/hooks/useAduCatalog";
import { useSidebarCatalog } from "@/hooks/useSidebarCatalog";
import { useContext, useEffect } from "react";
import axios from "axios";



const Catalog = () => {
    
    const {loadDetailSection,loadAddSection, section} = useSidebarCatalog();

 
    return(
        <Layout>
            <div className="flex">
                <div className="p-5 w-[15%] mt-[3%] h-28 border-r-2 text-gray-400/90">
                    <ul className="ml-3">
                        <li onClick={loadDetailSection} className="mb-3 hover:cursor-pointer">ADU Details</li>
                        <li onClick={loadAddSection}  className="hover:cursor-pointer">Add Users</li>
                    </ul>
                </div>

                {section.aduDetails && (
                   <AduDetailSection/>
                )}

                {section.addUsers && 
                    <AddUserSection/>
                }
            </div>
        </Layout>
    );
}

export default Catalog;




   
