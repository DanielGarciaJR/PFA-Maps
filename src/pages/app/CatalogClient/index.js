import BuildingRequestSection from "@/components/BuldingRequestSection";
import LayoutClient from "@/components/LayoutClient";
import { useSidebarCatalogClient } from "@/hooks/useSidebarCatalogClient";

const CatalogClient = ({data}) => {

    const {loadBuildingSection,section} = useSidebarCatalogClient();
   

    return(
        <LayoutClient>
            <div className="flex">
                <div className="p-5 w-[15%] mt-[3%] h-28 border-r-2 text-gray-400/90">
                    <ul className="ml-6">
                        <li onClick={loadBuildingSection} className="mb-3 hover:cursor-pointer">Available</li>
                    </ul>
                </div>

                {section.buildingRequest && <BuildingRequestSection aduData={data}/>}

            </div>
        </LayoutClient>
    );
}

export default CatalogClient;



export async function getServerSideProps(context){

    const response = await fetch(`${process.env.BASE_URL_API}/adu`,{
        headers: { 'Content-Type': 'multipart/form-data',  'Authorization': `Bearer ${context.tokenContext}`,},
        mode: 'cors',  
    });

    const data = await response.json()

    return {
        props: {
            data
        }
    }
}