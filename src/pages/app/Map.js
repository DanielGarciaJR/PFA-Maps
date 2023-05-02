
import Layout from '@/components/Layout';
import mapboxgl from 'mapbox-gl';
import { useState, useEffect,useRef} from 'react';
import mapbox from '../api/mapbox';


mapboxgl.accessToken = mapbox.token;


const Map = () => {

    const [params, setParams] = useState({ lng: -117.16472, lat: 32.71571, zoom: 15});

    const mapContainer = useRef(null);
    const map = useRef(null);

  

    useEffect(() => {
        if(map.current) return;
    
        mapContainer.current.innerHTML = '';
    
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/outdoors-v12',
            center: [params.lng,params.lat],
            zoom: params.zoom,
            pitch: 40
        });

        map.current.on('load', () => {
            map.current.addControl(new mapboxgl.NavigationControl());
  
            map.current.addLayer({
              'id': '3d-building',
              'source': 'composite',
              'source-layer': 'building',
              'filter': ['==', 'extrude', 'true'],
              'type': 'fill-extrusion',
              'minzoom': 15,
              'paint': {
                'fill-extrusion-color': '#b190db',
                'fill-extrusion-height': {
                  'type': 'identity',
                  'property': 'height'
                },
                'fill-extrusion-base': {
                  'type': 'identity',
                  'property': 'min_height'
                },
                'fill-extrusion-opacity': .6
              }
            });  
      });

    });


    return(
        
            <Layout>
                <div className="h-screen w-screen"  ref={mapContainer}>
                  
                </div>
            </Layout>
       
    );
}

export default Map;