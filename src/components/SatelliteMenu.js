/*Satelital View component*/
const SatelliteMenu = ({satelliteVisibility}) => {
    
    return(
        <div id="satelitalView" className="absolute top-[1.2%]  w-[6%] ml-[65%]  p-1 rounded-lg bg-white text-gray-500 border-[1px] shadow-md">
            <label className="text-sm">
                <input 
                    className='mr-3 bg-white' 
                    type="checkbox" 
                    name="satelitalView" 
                    onChange={(e) => satelliteVisibility('mapbox-satellite',e.target.checked)} 
                />
                Satelite
            </label>
        </div>
    );
}

export default SatelliteMenu;