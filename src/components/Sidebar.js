import { FaBuffer } from 'react-icons/fa';
import { useSidebarMenu } from '@/hooks/useSidebarMenu';
import LocationForm from './LocationForm';
import TilesetContainer from './TilesetContainer';
import GeojsonForm from './GeojsonForm';

/*Component to show tileset Information*/
const Sidebar = ({form,formSubmit,tilesets, newLocationInput}) => {
    
    const { loadTileSection, loadUploadSection, section} = useSidebarMenu();

    return (
      <div className="bg-white w-[25%] h-screen  absolute top-0 right-0 drop-shadow-md overflow-y-scroll ">
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
                <li onClick={loadTileSection} className='m-2 hover:underline hover:cursor-pointer'>Tilesets</li>
                <li onClick={loadUploadSection}  className='m-2 hover:underline hover:cursor-pointer'>Upload Files</li>
              </ul>
            </div>

            {/*Tileset content*/}
            {section.tile && 
              <>
                {/*div for description*/}
                <div className="mt-[10%] flex-col flex items-center justify-center">
                  <FaBuffer className="w-[30px] h-[30px] mb-[5%] "/>
                  <p className="text-[20px] text-center">
                    Tilesets Information
                  </p>
                  <p className="text-center text-gray-400/70">
                    Here you can find all tilesets affecting the address you wrote!
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
  

export default Sidebar;