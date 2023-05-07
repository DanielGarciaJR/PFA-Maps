import {useState,useRef, Fragment} from 'react';
import { FaBuffer} from 'react-icons/fa';
import { HiX } from "react-icons/hi";

const TilesetMenu = ({tilesetVisibility}) => {

    const [tilesets,setTilesets] = useState([
        'fire-hazard-zones',
        'topo-40',
        'sd-county-lamesa-zoning',
        'sb9',
        'coastal-limitations',
        'fire-protection-districts',
        'sd-powerlines',
        'sdcountyjurisdictions',
        'city-sandiego-zoning',
        'chulavistazoning',
        'citysandiego'
    ]);

    const [tilesetMenu,setTilesetMenu] = useState(true);
    const containerMenu = useRef();
    const openButton = useRef();

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
        <div  ref={openButton} className="absolute top-2 z-10 ml-3 bg-white p-2 rounded-lg border-[1px] shadow-md">
            <button onClick={showMenu}>{tilesetMenu ? <FaBuffer className="w-6"/>:<HiX className='w-6'/>}</button>
        </div>




        <div ref={containerMenu} className="absolute top-2 ml-2 p-1 pl-3 pr-3 bg-white  text-black rounded-lg hidden">

        <p className="text-center text-black font-medium">Display tilesets</p>

        {tilesets.map((tileName,index) => (
            <Fragment key={index}>
                <label className='hover:bg-white hover:text-black hover:rounded-lg '>
                    <input className='mr-3 mt-4' type="checkbox" onChange={(e) =>tilesetVisibility(tileName, e.target.checked)}/>
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