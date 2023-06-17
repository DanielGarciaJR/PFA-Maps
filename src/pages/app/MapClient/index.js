import { useTilesetsClient} from '@/hooks/useTilesetsClient';
import { useFetchClient } from '@/hooks/useFetchClient';
import { useHandleForm } from '@/hooks/useHandleForm';
import LayoutClient from '@/components/LayoutClient';
import mapboxgl from 'mapbox-gl';
import TilesetMenuClient from '@/components/TilesetMenuClient';
import SatelliteMenu from '@/components/SatelliteMenu';
import SidebarClient from '@/components/SidebarClient';
import LocationLabel from '@/components/LocationLabel';
import ButtonPitch from '@/components/ButtonPitch';

//Mapbox token
mapboxgl.accessToken = process.env.MAPBOX_TOKEN;

const MapClient = () => {

    const { locationInput, handleChange } = useHandleForm();
    const { coordinates,setCoordinates,locationMap, setLocationMap,handleSubmit } = useFetchClient();
    const { mapContainer, tileAffecting, pitch, setPitch, setLayerVisibility } = useTilesetsClient(coordinates,setCoordinates,setLocationMap);

    return(
        <LayoutClient>
        {/*Map container*/}
        <div 
          className="h-screen w-[75%]"  
          ref={mapContainer}>
        </div>
        
        {/*Tileset Menu*/}
        <TilesetMenuClient tilesetVisibility={setLayerVisibility}/>
        
        {/*Sidebar Information*/}
        <SidebarClient 
          form={handleChange}
          newLocationInput={locationInput}
          formSubmit={handleSubmit} 
          tilesets={tileAffecting}>
        </SidebarClient>
        
        {/*Current Location*/}
        <LocationLabel 
          currentAddress={locationMap}>
        </LocationLabel>

        {/*Changue pitch*/}
        <ButtonPitch pitch={pitch}  setPitch={setPitch}/>

        {/*Change to satelite view*/}
        <SatelliteMenu satelliteVisibility={setLayerVisibility}/>
    </LayoutClient>
    );
}

export default MapClient;