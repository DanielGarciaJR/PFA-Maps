
import {useEffect, useState,useRef} from 'react';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import Layout from '@/components/Layout';
import mapboxgl from 'mapbox-gl';
import mapbox from '../api/mapbox';


mapboxgl.accessToken = mapbox.token;


const Map = ({location}) => {

  const [checkedItems, setCheckedItems] = useState({});


    const mapContainer = useRef(null);
    const map = useRef(null);
    const marker = useRef(null);


    useEffect(() => {
        if(map.current) return;
    
        mapContainer.current.innerHTML = '';
    
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/elgerardo/clgzrw11p006901qz9myq3i0d',
            center: [location.lng,location.lat],
            zoom: 15,
            pitch: 40
        });

        marker.current = new mapboxgl.Marker().setLngLat([location.lng, location.lat]).addTo(map.current);

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

    /*const handleChange = (event) => {
      const { name, checked } = event.target;
      setCheckedItems({ ...checkedItems, [name]: checked });
    };*/


    function setLayerVisibility(layerName, isVisible) {
      const visibility = isVisible ? 'visible' : 'none';
      if (map.current) {
        map.current.setLayoutProperty(layerName, 'visibility', visibility);
      }
    }
    
  
    /*setLayerVisibility('trees-sd', checkedItems.trees_sd);
    setLayerVisibility('fire-hazard-zones', checkedItems.fire_hazard_zones);
    setLayerVisibility('topo-40', checkedItems.topo_40);*/

    return(
        
            <Layout>
                
                <div className="h-screen w-screen"  ref={mapContainer}></div>
                
                <div id="menu" className="absolute top-0 bg-white">
                    <label>
                      <input type="checkbox" name="trees_sd" defaultChecked={true}  onChange={(e) => setLayerVisibility('trees-sd', e.target.checked)}/>
                      trees-sd
                    </label>
                    <br />
                    <label>
                      <input type="checkbox" name="fire_hazard_zones" defaultChecked={true}   onChange={(e) =>setLayerVisibility('fire-hazard-zones', e.target.checked)}/>
                      fire-hazard-zones
                    </label>
                    <br/>
                    <label>
                      <input type="checkbox" name="topo_40" defaultChecked={true}  onChange={(e) =>setLayerVisibility('topo-40', e.target.checked)}/>
                      topo-40
                    </label>
                    
                    <br/>
                    <label>
                      <input type="checkbox" name="sd_county_lamesa_zoning" defaultChecked={true}  onChange={(e) =>setLayerVisibility('sd-county-lamesa-zoning', e.target.checked)}/>
                      sd-county-lamesa-zoning
                    </label>
                    <br/>
                    <label>
                      <input type="checkbox" name="sb9" defaultChecked={true}  onChange={(e) =>setLayerVisibility('sb9', e.target.checked)}/>
                      sb9
                    </label>
                    <br/>
                    <label>
                      <input type="checkbox" name="coastal_limitations" defaultChecked={true}  onChange={(e) =>setLayerVisibility('coastal-limitations', e.target.checked)}/>
                      coastal-limitations
                    </label>
                    <br/>
                    <label>
                      <input type="checkbox" name="fire_protection_districts" defaultChecked={true}  onChange={(e) =>setLayerVisibility('fire-protection-districts', e.target.checked)}/>
                      fire-protection-districts
                    </label>
                    <br/>
                    <label>
                      <input type="checkbox" name="sd_powerlines" defaultChecked={true}  onChange={(e) =>setLayerVisibility('sd-powerlines', e.target.checked)}/>
                      sd-powerlines
                    </label>
                    <br/>
                    <label>
                      <input type="checkbox" name="sdcountyjurisdictions" defaultChecked={true}  onChange={(e) =>setLayerVisibility('sdcountyjurisdictions', e.target.checked)}/>
                      sdcountyjurisdictions
                    </label>
                    <br/>
                    <label>
                      <input type="checkbox" name="city_sandiego_zoning" defaultChecked={true}  onChange={(e) =>setLayerVisibility('city-sandiego-zoning', e.target.checked)}/>
                      city-sandiego-zoning
                    </label>
                    <br/>
                    <label>
                      <input type="checkbox" name="chulavistazoning" defaultChecked={true}  onChange={(e) =>setLayerVisibility('chulavistazoning', e.target.checked)}/>
                      chulavistazoning
                    </label>
                    <br/>
                    <label>
                      <input type="checkbox" name="citysandiego" defaultChecked={true}  onChange={(e) =>setLayerVisibility('citysandiego', e.target.checked)}/>
                      citysandiego
                    </label>
                </div>
            </Layout>
       
    );
}

export default Map;