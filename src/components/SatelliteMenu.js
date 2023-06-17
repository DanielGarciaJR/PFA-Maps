/*Satelital View component*/
const SatelliteMenu = ({satelliteVisibility}) => {
    
    return(
        <div id="satelitalView" className="absolute top-[7.5%]  w-[6%] ml-[65%]  p-1 rounded-lg bg-white text-gray-500 border-[1px] drop-shadow-lg hover:bg-gray-200">
            <label className="text-[80%]">
                <input 
                    className='mr-3 bg-white' 
                    type="checkbox" 
                    name="satelitalView" 
                    onChange={(e) => satelliteVisibility('Satellite',e.target.checked)} 
                />
                Satelite
            </label>
        </div>
    );
}

export default SatelliteMenu;