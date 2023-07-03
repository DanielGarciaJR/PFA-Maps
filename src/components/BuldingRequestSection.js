import { useRequestAdu } from "@/hooks/useRequestAdu";
import AduContainerClient from "./AduContainerClient";
import BuildingForm from "./BuildingForm";
import ModalRequest from "./ModalRequest";

const BuildingRequestSection = ({aduData}) => {

    

    return(
        <div className="p-10 w-[140%]">
            <div>
                <h2 className="text-[30px]">ADU List</h2>
            </div>



            <div className="mt-5 flex flex-wrap overflow-y-scroll h-[580px]">
            {aduData.map((el,index) => (
                 <AduContainerClient key={index} aduDt={el}></AduContainerClient>
            ))}
            </div>
        </div>
    );
}


export default BuildingRequestSection;