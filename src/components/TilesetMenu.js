import {useState,useRef, Fragment} from 'react';
import { FaBuffer} from 'react-icons/fa';
import { HiX } from "react-icons/hi";
import tilesets from '@/constants/tilesets';

/*Tilese Menu Container to hide tilesets*/
const TilesetMenu = ({tilesetVisibility }) => {

    //state
    const [tilesetMenu,setTilesetMenu] = useState(true);

    //references
    const containerMenu = useRef();
    const openButton = useRef();

    //functions
    const showMenu = () => {
        setTilesetMenu(!tilesetMenu);

        if(tilesetMenu){
            containerMenu.current.classList.remove('hidden');
            openButton.current.classList.remove('drop-shadow-lg');
            openButton.current.classList.remove('border-[1px]');
            openButton.current.classList.add('hidden');
            
        }else{
            containerMenu.current.classList.add('hidden');
            openButton.current.classList.add('drop-shadow-lg');
            openButton.current.classList.add('border-[1px]');
            openButton.current.classList.remove('hidden');
        }
    }

    return(
        <>
            {/*Div tileset button*/}
            <div  ref={openButton} className="absolute top-2 z-10 ml-3 bg-white text-gray-500 p-2 rounded-lg border-[1px] drop-shadow-lg hover:bg-gray-200">
                <button onClick={showMenu}>
                    {/*{tilesetMenu ? <FaBuffer className="w-6"/> : <HiX className='w-6'/>}*/}
                    {tilesetMenu && <FaBuffer className="w-6 "/>}
                </button>
            </div>

            {/*Div tileset menu*/}
            <div ref={containerMenu} className="absolute top-2 ml-2 p-1 pl-3 pr-3 bg-white text-black rounded-lg border-[1px] drop-shadow-lg h-[30%]  overflow-y-scroll text-[80%]  hidden">
                {!tilesetMenu && <button className="mt-3" onClick={showMenu}><HiX className='w-7 h-4 text-gray-500'/></button>}
                <p className="text-center text-black font-medium mt-[-23px]">Display tilesets</p>

                {tilesets.content.map((tileName,index) => (
                    <Fragment key={index} >
                        <label className=' p-1 hover:rounded-lg hover:bg-gray-100 text-gray-500'>
                            <input className='mr-3 mt-6' defaultChecked='true' type="checkbox" onChange={(e) => tilesetVisibility(tileName, e.target.checked)}/>
                            {tileName}
                        </label>
                        <br/>
                    </Fragment>
                ))}
            </div>
        </>
    );
}


export default TilesetMenu;