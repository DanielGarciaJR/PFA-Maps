
import {useState,useEffect,useRef} from 'react';
import Layout from '@/components/Layout';
import mapboxgl from 'mapbox-gl';
import mapbox from '../constants/mapbox';
import TilesetMenu from '@/components/TilesetMenu';
import SatelliteMenu from '@/components/SatelliteMenu';
import tilesets from '../constants/tilesets';
import Modal from '@/components/Modal';

//Mapbox token
mapboxgl.accessToken = mapbox.token;


const Map = ({location}) => {

    //state
    const [showModal,setShowModal] = useState(false);
    const [tileAffecting,setTileAffecting] = useState(null); 

    //Map's containers
    const mapContainer = useRef(null);
    const map = useRef(null);
    const marker = useRef(null);

    //use effect to diplay map.
    useEffect(() => {
        if(map.current) return;
    
        mapContainer.current.innerHTML = '';
    
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/elgerardo/clh9inqj500c601pod3cg4lh7',
            center: [location.lng,location.lat],
            zoom: 20,
            pitch: 40
        });

        //Add marker
        marker.current = new mapboxgl.Marker().setLngLat([location.lng, location.lat]).addTo(map.current);
        //Add zoom control
        map.current.on('load', () => { map.current.addControl(new mapboxgl.NavigationControl()); });

        //Modal logic 
        map.current.on('dblclick', function (e) {
            setShowModal(true); 
          
            const features = map.current.queryRenderedFeatures(e.point);
            const displayProperties = ['id','layer'];
             
            const displayFeatures = features.map((feat) => {
              const displayFeat = {};
        
              displayProperties.forEach((prop) => {
                displayFeat[prop] = feat[prop];
              });
        
              return displayFeat;
            })
            .filter((feat, index, self) => {
              //Filter duplicated tilesets
              return index === self.findIndex((t) => t.layer.id === feat.layer.id);
            });
        
            //Get affected tilesets
            const description = displayFeatures.map((feat) => feat.layer.id).filter((id) => tilesets.content.includes(id))
            setTileAffecting(description);
        })
    });

    //Display layers.
    function setLayerVisibility(layerName, isVisible) {
      const visibility = isVisible ? 'visible' : 'none';
      if (map.current) {
        map.current.setLayoutProperty(layerName, 'visibility', visibility);
      }
    }


    return(
            <Layout>
                <div className="h-screen w-screen"  ref={mapContainer}></div>
                <TilesetMenu tilesetVisibility={setLayerVisibility}/>
                <SatelliteMenu satelliteVisibility={setLayerVisibility}/>
                
                {showModal && 
                  <Modal closeModal={setShowModal}>
                      <div className="p-32 mt-[-70px] text-center">
                        <p className="font-bold text-xl">Tilesets affecting</p>
                      
                        {tileAffecting.length === 0 ? <p className='text-lg text-gray-500'>No tilesets affecting</p> : tileAffecting.map((el,index) => <h3 className="text-lg text-gray-500" key={index}>{el}</h3>)}
                    </div>
                  </Modal>
                }
            </Layout>
    );
}

export default Map;