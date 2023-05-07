
import {useState,useEffect,useRef} from 'react';
import Layout from '@/components/Layout';
import mapboxgl from 'mapbox-gl';
import mapbox from '../api/mapbox';
import TilesetMenu from '@/components/TilesetMenu';
import SatelliteMenu from '@/components/SatelliteMenu';

//Mapbox token
mapboxgl.accessToken = mapbox.token;


const Map = ({location}) => {

    //state

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


        //Add Popup
        const tilesets = [
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
        ]
       
        map.current.on('dblclick', function (e) {
            
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
        
            //Add poup with filter tilesets
            const coordinates = e.lngLat;
            const description = displayFeatures.map((feat) => feat.layer.id).filter((id) => tilesets.includes(id)).join('<br>');

            new mapboxgl.Popup()
              .setLngLat(coordinates)
              .setHTML(`<strong>Tilesets Affecting:</strong><br>${description}`)
              .addTo(map.current);
          });

        
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
            </Layout>
    );
}

export default Map;