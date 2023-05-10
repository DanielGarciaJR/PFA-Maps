import {useState,useRef, Fragment} from 'react';
import { FaBuffer} from 'react-icons/fa';
import { HiX } from "react-icons/hi";
import tilesets from '@/constants/tilesets';

const TilesetMenu = ({tilesetVisibility}) => {

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
            openButton.current.classList.remove('shadow-md');
            openButton.current.classList.remove('border-[1px]');
            
        }else{
            containerMenu.current.classList.add('hidden');
            openButton.current.classList.add('shadow-md');
            openButton.current.classList.add('border-[1px]');
        
        }
    }

    return(
        <>
            {/*Div tileset button*/}
            <div  ref={openButton} className="absolute top-2 z-10 ml-3 bg-white p-2 rounded-lg border-[1px] shadow-m">
                <button onClick={showMenu}>
                    {tilesetMenu ? <FaBuffer className="w-6"/> : <HiX className='w-6'/>}
                </button>
            </div>

            {/*Div satelitte button*/}
            <div ref={containerMenu} className="absolute top-2 ml-2 p-1 pl-3 pr-3 bg-white   text-black rounded-lg  hidden">

                <p className="text-center text-black font-medium">Display tilesets</p>

                {tilesets.content.map((tileName,index) => (
                    <Fragment key={index}>
                        <label className=' p-1 hover:rounded-lg hover:bg-gray-100 '>
                            <input className='mr-3 mt-6' type="checkbox" onChange={(e) =>tilesetVisibility(tileName, e.target.checked)}/>
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