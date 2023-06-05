import {useState,useEffect,useRef} from 'react';
import Layout from '@/components/Layout';
import mapboxgl from 'mapbox-gl';
import TilesetMenu from '@/components/TilesetMenu';
import SatelliteMenu from '@/components/SatelliteMenu';
import tilesets from '../../../constants/tilesets';
import Sidebar from '@/components/Sidebar';
import LocationLabel from '@/components/LocationLabel';
import ButtonPitch from '@/components/ButtonPitch';

//Mapbox token
mapboxgl.accessToken = process.env.MAPBOX_TOKEN;


const Map = ({location, address,handleChangue,handleSubmit,setHoverCoordinates,setHoverCurrentLocation}) => {

    //state
    const [tileAffecting,setTileAffecting] = useState([]); 
    const [pitch,setPitch] = useState(false);

    //Map's containers
    const mapContainer = useRef(null);
    const map = useRef(null);
    const marker = useRef(null);

    //Use Effect for Map rendering, It only renders 1 time.
    useEffect(() => {
      mapContainer.current.innerHTML = '';
      var hoveredStateId = null;


      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/multitaskr/cli3pe0e700xd01podw5ufbfd',
        center: [location.lng, location.lat],
        zoom: 20,
        pitch: 0
      });

      marker.current = new mapboxgl.Marker().setLngLat([location.lng, location.lat]).addTo(map.current);

      //load map
      map.current.on('load', () => {
        //load zoom controls
        map.current.addControl(new mapboxgl.NavigationControl());

        //Add citysandiego source to know parcel limits.
        map.current.addSource('city of san diego parcels',{
          type: 'vector',
          url: 'mapbox://multitaskr.citysandiego'
        });

        //Adding tileset layers of the source to hover effect
        map.current.addLayer({
          'id': 'parcels-limit-fill',
          'type': 'fill',
          'source': 'city of san diego parcels','source-layer': 'citysandiego',
          'layout': {},
          'paint': {
            'fill-color': '#DFCAEC',
            'fill-opacity': [ 'case',['boolean', ['feature-state', 'hover'], false],1,0]
          }
        });


        map.current.addLayer({
          id: 'parcels-limit',
          type: 'line',
          source: 'city of san diego parcels', 'source-layer': 'citysandiego',
          'paint': {
            'line-color': '#740595',
            'line-width': 3,
            'line-dasharray': [2, 2]
            }
        });

         // Establecer el orden de apilamiento de las capas
         map.current.moveLayer('parcels-limit-fill', 'building-extrusion');
      });

       //mouse move effect to hover the property
       map.current.on('mousemove', 'parcels-limit-fill', function (e) {
        if (e.features.length > 0) {
          if (hoveredStateId) { 
            map.current.setFeatureState(
              { 
                source: 'city of san diego parcels', 
                sourceLayer: 'citysandiego', 
                id: hoveredStateId 
              },
              { 
                hover: false
              }
            );
          }
          hoveredStateId = e.features[0].id;
          map.current.setFeatureState({ 
            source: 'city of san diego parcels', 
            sourceLayer: 'citysandiego', 
            id: hoveredStateId 
          },
          { 
            hover: true 
          });
        }
      });

      //remove color hover
      map.current.on('mouseleave', 'parcels-limit-fill', function () {
        if (hoveredStateId) {
            map.current.setFeatureState({ 
              source: 'city of san diego parcels', 
              sourceLayer: 'citysandiego', 
              id: hoveredStateId 
              },
              { 
                hover: false 
              }
            );
        }
        hoveredStateId = null;
      });

      //get tilesets affecting the area
      map.current.on('sourcedata', () => {
        getAffectedTilesets(location);   
      });

      //change location by hover & getting tilesets.
      map.current.on('click','parcels-limit-fill', (e) => {
        getLocationHoverClick(e.lngLat.lng,e.lngLat.lat);
        getAffectedTilesets(e.lngLat);
      });

      map.current.on('click','Water Main', (e) => {
        console.log('Water_main');
        getAffectedTilesets(e.lngLat);
      });

      map.current.on('click','Sewer Main', (e) => {
        console.log('Sewer_Main');
        getAffectedTilesets(e.lngLat);
      });

      map.current.on('click','Drain Conveyance', (e) => {
        console.log('Drain_Conveyance');
        getAffectedTilesets(e.lngLat);
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

    //Function to get location by click.
    const getLocationHoverClick = async (longitude,latitude) => {
     
      try{
        const bbox = '-124.409619,32.534156,-114.131211,42.009518';
        const res = await fetch(`${process.env.GEOCODING_URL}mapbox.places/${longitude},${latitude}.json?access_token=${process.env.MAPBOX_TOKEN}&country=us&bbox=${bbox}`);
        const data = await res.json();

        setHoverCoordinates({
          lng: data.features[0].center[0],
          lat: data.features[0].center[1]
        });

        setHoverCurrentLocation(data.features[0].place_name);

      }catch(error){
        console.log(error);
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