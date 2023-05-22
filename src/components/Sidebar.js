import { FaBuffer} from 'react-icons/fa';
import LocationForm from './LocationForm';
import TilesetContainer from './TilesetContainer';

/*Component to show tileset Information*/
const Sidebar = ({form,formSubmit,tilesets}) => {
    
    return (
      <div className="bg-white w-[25%] h-screen  absolute top-0 right-0 drop-shadow-md overflow-y-scroll no-scrollbar">
        <div>
            {/*div for search bar form*/}
            <div>
                <LocationForm 
                  formValue={form} 
                  formSubmitData={formSubmit}
                />
            </div>

            {/*div for description*/}
            <div className="mt-[10%] flex-col flex items-center justify-center">
                <FaBuffer className="w-[30px] h-[30px] mb-[5%] "/>
                <p 
                  className="text-[20px] text-center">
                  Tilesets Information
                </p>
                <p 
                  className="text-center text-gray-400/70">
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
        </div>
      </div>
    );
  }
  

export default Sidebar;