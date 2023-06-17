import { FaLaptopHouse } from 'react-icons/fa';
import { useSidebarMenu } from '@/hooks/useSidebarMenu';
import LocationForm from './LocationForm';
import TilesetContainer from './TilesetContainer';
import GeojsonForm from './GeojsonForm';


/*Component to show tileset Information*/
const SidebarClient = ({form,formSubmit,tilesets, newLocationInput}) => {

    const { loadTileSection, loadUploadSection, section} = useSidebarMenu();
    
    return (
      <div className="bg-white w-[25%] h-screen   absolute top-12 right-0 overflow-y-scroll ">
        <div>
            {/*div for search bar form*/}
            <div>
                <LocationForm 
                  formValue={form} 
                  newLocationInput={newLocationInput}
                  formSubmitData={formSubmit}
                />
            </div>

            {/*div for content menu*/}
            <div className="p-2 mt-4 text-[14px]">
              <ul className="flex text-gray-500">
                <li onClick={loadTileSection} className='m-2 hover:underline hover:cursor-pointer'>Parcels</li>
                <li onClick={loadUploadSection}  className='m-2 hover:underline hover:cursor-pointer'>Upload Files</li>
              </ul>
            </div>
            
            {/*Tileset content*/}
            {section.tile && 
              <>
                {/*div for description*/}
                <div className="mt-[10%] flex-col flex items-center justify-center">
                  <FaLaptopHouse className="w-[30px] h-[30px] mb-[5%] "/>
                  <p className="text-[20px] text-center">
                    Parcels Data
                  </p>
                  <p className="text-center text-gray-400/70">
                    Property information and limits below!
                  </p>
                </div>

                {/*div for tilesets affecting*/}
                <div className=" flex  mt-5 flex-col">
                  {tilesets.length === 0 ? <div className='p-3 text-center mt-5'><p className=' text-gray-400/70'>No tilesets detected</p></div> : tilesets.map((el,index) => (
                    <TilesetContainer 
                      key={index} 
                      tile={el}>
                    </TilesetContainer>
                ))}
                </div>
              </>
            }

            {/*Upload form content*/}
            {section.upload && <GeojsonForm></GeojsonForm>}
        </div>
      </div>
    );
  }
  

export default SidebarClient;