import {useState,useEffect,useRef} from 'react';
import Layout from '@/components/Layout';
import mapboxgl from 'mapbox-gl';
import TilesetMenu from '@/components/TilesetMenu';
import SatelliteMenu from '@/components/SatelliteMenu';
import tilesets from '../../../constants/tilesets';
import Sidebar from '@/components/Sidebar';
import LocationLabel from '@/components/LocationLabel';
import ButtonPitch from '@/components/ButtonPitch';

/*import TilesetTable from '@/components/TilesetContainer';*/

//Mapbox token
mapboxgl.accessToken = process.env.MAPBOX_TOKEN;


const Map = ({location, address,handleChangue,handleSubmit}) => {

    //state
    /*const [showModal,setShowModal] = useState(false);*/
    const [tileAffecting,setTileAffecting] = useState([]); 
    const [pitch,setPitch] = useState(false);

    //Map's containers
    const mapContainer = useRef(null);
    const map = useRef(null);
    const marker = useRef(null);

    //Use Effect for Map rendering, It only renders 1 time.
    useEffect(() => {
      mapContainer.current.innerHTML = '';

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/multitaskr/cli3pe0e700xd01podw5ufbfd',
        center: [location.lng, location.lat],
        zoom: 20,
        pitch: 0
      });

      marker.current = new mapboxgl.Marker().setLngLat([location.lng, location.lat]).addTo(map.current);

      map.current.on('load', () => {
        map.current.addControl(new mapboxgl.NavigationControl());
      });

      map.current.on('sourcedata', () => {
        getAffectedTilesets(location);   
      });

      return () => {
        if (map.current) {
          map.current.remove();
        }
      };
    }, []);

    //UseEffect for location, this useEffect only execute when you search another location in map window.
    useEffect(() => {
      if (map.current) {
        if (location.lng && location.lat) {
          marker.current.setLngLat([location.lng, location.lat]);
          map.current.flyTo({ center: [location.lng, location.lat]});
          
          map.current.on('sourcedata', () => {
            getAffectedTilesets(location);   
          });
        }
      }
    }, [location]);

    //UseEffect for pitch, to changue the pitch.
    useEffect(() => {
      if (pitch) {
        map.current.setPitch(60);
      } else {
        map.current.setPitch(0);
      }
    }, [pitch]);

    //Function to get the tilesets in an array
    const getAffectedTilesets = (location) => {
      let point = map.current.project(location);
      const tilesetsOnMap = map.current.queryRenderedFeatures(point);
      const tilesetProperties = ['id', 'layer', 'properties'];
    
      const displayFeatures = tilesetsOnMap
        .map((feat) => {
          const displayFeat = {};
    
          tilesetProperties.forEach((prop) => {
            displayFeat[prop] = feat[prop];
          });
    
          return displayFeat;
        })
        .filter((feat, index, self) => {
          // Filter duplicate tilesets
          return index === self.findIndex((t) => t.layer.id === feat.layer.id);
        });
    
      // do the object array with tilesets
      const description = displayFeatures
        .map((feat) => {
          const id = feat.id;
          const name = feat.layer.id;
          const properties = Object.entries(feat.properties);
    
          return { id, name, properties };
        })
        .filter((feat) => {
          return tilesets.content.includes(feat.name);
        });
    
      setTileAffecting(description);
    };
    
    //Display layers.
    function setLayerVisibility(layerName, isVisible) {
      const visibility = isVisible ? 'visible' : 'none';
      if (map.current) {
        map.current.setLayoutProperty(layerName, 'visibility', visibility);
      }
    }

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