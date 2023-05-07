const SatelliteMenu = ({satelliteVisibility}) => {
    
    return(
        <div id="satelitalView" className="absolute top-2 b ml-60 w-[10%]  p-1 pl-3 rounded-full bg-violet-500 text-white">
            <label >
                <input className='mr-3 bg-white' type="checkbox" name="satelitalView" onChange={(e) => satelliteVisibility('mapbox-satellite',e.target.checked)} />
                Satelital View
            </label>
        </div>
    );
}

export default SatelliteMenu;