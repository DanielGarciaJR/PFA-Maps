import Layout from '@/components/Layout';
import mapboxgl from 'mapbox-gl';
import TilesetMenu from '@/components/TilesetMenu';
import SatelliteMenu from '@/components/SatelliteMenu';
import Sidebar from '@/components/Sidebar';
import LocationLabel from '@/components/LocationLabel';
import ButtonPitch from '@/components/ButtonPitch';
import { useTilesets } from '@/hooks/useTilesets';


//Mapbox token
mapboxgl.accessToken = process.env.MAPBOX_TOKEN;

const Map = ({coordinates, address,handleChangue, handleSubmit,setHoverCoordinates,setHoverCurrentLocation,locationInput}) => {

    const { mapContainer, tileAffecting, pitch, setPitch, setLayerVisibility } = useTilesets(coordinates,setHoverCoordinates,setHoverCurrentLocation);
   

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
                  form={handleChangue}
                  newLocationInput={locationInput}
                  formSubmit={handleSubmit} 
                  tilesets={tileAffecting}>
                </Sidebar>
                
                {/*Current Location*/}
                <LocationLabel 
                  currentAddress={address}>
                </LocationLabel>

                {/*Changue pitch*/}
                <ButtonPitch pitch={pitch}  setPitch={setPitch}/>

                {/*Change to satelite view*/}
                <SatelliteMenu satelliteVisibility={setLayerVisibility}/>
            </Layout>
    );
}

export default Map;