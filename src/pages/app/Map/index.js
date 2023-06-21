import Layout from '@/components/Layout';
import mapboxgl from 'mapbox-gl';
import TilesetMenu from '@/components/TilesetMenu';
import SatelliteMenu from '@/components/SatelliteMenu';
import Sidebar from '@/components/Sidebar';
import LocationLabel from '@/components/LocationLabel';
import ButtonPitch from '@/components/ButtonPitch';
import { useTilesets } from '@/hooks/useTilesets';
import { useFetch } from '@/hooks/useFetch';
import { useHandleForm } from '@/hooks/useHandleForm';


//Mapbox token
mapboxgl.accessToken = process.env.MAPBOX_TOKEN;

const Map = () => {

    const { locationInput, handleChange } = useHandleForm();
    const { coordinates,setCoordinates,locationMap, setLocationMap,handleSubmit } = useFetch();
    const { mapContainer, tileAffecting, pitch, setPitch, setLayerVisibility } = useTilesets(coordinates,setCoordinates,setLocationMap);

    return(
            <Layout>
                {/*Map container*/}
                <div 
                  className="h-screen w-[75%]"  
                  ref={mapContainer}>
                </div>
                
                {/*Tileset Menu*/}
                <TilesetMenu tilesetVisibility={setLayerVisibility}/>
                
                {/*Sidebar Information*/}
                <Sidebar 
                  form={handleChange}
                  newLocationInput={locationInput}
                  formSubmit={handleSubmit} 
                  tilesets={tileAffecting}>
                </Sidebar>
                
                {/*Current Location*/}
                <LocationLabel 
                  currentAddress={locationMap}>
                </LocationLabel>

                {/*Changue pitch*/}
                <ButtonPitch pitch={pitch}  setPitch={setPitch}/>

                {/*Change to satelite view*/}
                <SatelliteMenu satelliteVisibility={setLayerVisibility}/>
            </Layout>
    );
}

export default Map;